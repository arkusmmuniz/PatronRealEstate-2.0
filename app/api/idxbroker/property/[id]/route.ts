import { NextRequest, NextResponse } from 'next/server';
import { getApiKey } from '@/lib/config';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('apiKey') || getApiKey();
  const resolvedParams = await params;
  const propertyId = resolvedParams.id;

  if (!propertyId) {
    return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 400 });
  }

  try {
    // Normalize the property ID - remove any special characters and ensure it's clean
    const normalizedPropertyId = decodeURIComponent(propertyId).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    // Try multiple IDXBroker API endpoints for property lookup
    // Based on IDX Broker documentation, try different endpoint formats
    const endpoints = [
      `https://api.idxbroker.com/mls/listings/${normalizedPropertyId}`,
      `https://api.idxbroker.com/clients/listings/${normalizedPropertyId}`,
      `https://api.idxbroker.com/mls/property/${normalizedPropertyId}`,
      `https://api.idxbroker.com/mls/listing/${normalizedPropertyId}`,
      // Try search endpoint with MLS filter
      `https://api.idxbroker.com/mls/search?mlsID=${normalizedPropertyId}`,
      `https://api.idxbroker.com/clients/search?mlsID=${normalizedPropertyId}`,
    ];
    
    console.log('Fetching property details from IDXBroker for MLS:', normalizedPropertyId);
    
    // Try each endpoint until one works
    let response: Response | null = null;
    let lastError: string = '';
    
    for (const endpoint of endpoints) {
      try {
        console.log('Trying endpoint:', endpoint);
        response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accesskey': apiKey,
            'outputtype': 'json'
          },
        });
        
        if (response.ok) {
          console.log('Success with endpoint:', endpoint);
          break;
        } else {
          // Try to get error details from response
          let errorDetails = '';
          try {
            const errorText = await response.text();
            errorDetails = errorText.substring(0, 200);
            console.log(`Endpoint ${endpoint} returned status:`, response.status, 'Error:', errorDetails);
          } catch (e) {
            console.log(`Endpoint ${endpoint} returned status:`, response.status);
          }
          lastError = `Status ${response.status}: ${response.statusText}${errorDetails ? ` - ${errorDetails}` : ''}`;
        }
      } catch (err) {
        console.log(`Error with endpoint ${endpoint}:`, err);
        lastError = err instanceof Error ? err.message : 'Unknown error';
        continue;
      }
    }
    
    if (!response || !response.ok) {
      // Check if it's an authentication error
      if (response && response.status === 401) {
        console.error('❌ IDX Broker API Authentication Failed (401 Unauthorized)');
        console.error('This usually means:');
        console.error('1. The API key is invalid or expired');
        console.error('2. The API key does not have the required permissions');
        console.error('3. The API key format is incorrect');
        console.error('Please verify your API key in the IDX Broker dashboard: Home > Access Control');
        
        return NextResponse.json({
          success: false,
          error: `Authentication failed (401 Unauthorized). Please verify your IDX Broker API key is valid and has the required permissions.`,
          details: `The API key may be invalid, expired, or missing required permissions. Please check your IDX Broker account settings.`,
          troubleshooting: {
            step1: 'Verify your API key in IDX Broker dashboard: Home > Access Control',
            step2: 'Ensure the API key has permissions for MLS listings',
            step3: 'Check if the API key has expired or been revoked',
            step4: 'Contact IDX Broker support if the issue persists: help@idxbroker.com'
          }
        }, { status: 401 });
      }
      
      throw new Error(`All endpoints failed. Last error: ${lastError}`);
    }

    // Response is guaranteed to be ok here
    const rawText = await response.text();
    
    console.log('IDXBroker API response status:', response.status);
    console.log('IDXBroker API response length:', rawText.length);
    console.log('IDXBroker API response preview:', rawText.substring(0, 500));
      
    if (rawText && rawText.trim() !== '') {
      try {
        let propertyData = JSON.parse(rawText);
        
        // IDX Broker can return an array or a single object
        let finalData = propertyData;
        if (Array.isArray(propertyData)) {
          if (propertyData.length > 0) {
            finalData = propertyData[0];
            console.log('IDXBroker returned array, using first item');
          } else {
            console.log('IDXBroker returned empty array');
            throw new Error('Empty array returned from IDX Broker');
          }
        }
        
        // Check if we have valid property data
        if (finalData && typeof finalData === 'object' && Object.keys(finalData).length > 0) {
          // Verify it's not an error message
          if (finalData.error || finalData.message) {
            console.log('IDXBroker returned error:', finalData.error || finalData.message);
            throw new Error(finalData.error || finalData.message || 'Error from IDX Broker');
          }
          
          const listingId = finalData.listingID || finalData.idxID || finalData.id || finalData.listingId;
          console.log('✅ Successfully fetched property details from IDXBroker:', {
            listingID: listingId,
            address: finalData.address || finalData.streetName,
            price: finalData.price || finalData.listingPrice,
            hasData: true
          });
          
          return NextResponse.json({
            success: true,
            data: finalData,
            isRealData: true
          });
        } else {
          console.log('IDXBroker returned empty or invalid object');
        }
      } catch (parseError) {
        console.error('❌ Failed to parse IDXBroker response:', parseError);
        console.log('Raw response (first 1000 chars):', rawText.substring(0, 1000));
        // Don't throw here, continue to check if it's a real MLS number
      }
    } else {
      console.log('IDXBroker API returned empty response');
    }

    // Only use mock data if API truly fails - don't use it for real MLS numbers
    // For real MLS searches, we should return an error instead of mock data
    console.log('IDXBroker API failed for MLS:', normalizedPropertyId);
    console.log('Last error:', lastError);
    
    // Check if this looks like a real MLS number (numeric or alphanumeric)
    const isRealMLS = /^[A-Z0-9]{6,}$/i.test(normalizedPropertyId);
    
    if (isRealMLS) {
      // For real MLS numbers, don't fall back to mock data - return error
      // Check if the error was 400 (Bad Request) which might mean the MLS format is wrong
      // or 404 which means it doesn't exist
      const statusCode = lastError.includes('400') ? 400 : 404;
      const errorMessage = lastError.includes('400') 
        ? `The MLS number "${normalizedPropertyId}" could not be found. This may mean the MLS number format is incorrect or the property is not available in the IDX Broker database.`
        : `Property with MLS number "${normalizedPropertyId}" not found in IDX Broker database. Please verify the MLS number is correct and that the property is active.`;
      
      return NextResponse.json({
        success: false,
        error: errorMessage,
        details: `Tried multiple API endpoints. Last error: ${lastError}`,
        mlsNumber: normalizedPropertyId,
        troubleshooting: {
          step1: 'Verify the MLS number is correct and matches the format used by your MLS',
          step2: 'Check if the property is active and available in IDX Broker',
          step3: 'Try searching for the property using the standard search with address or other criteria',
          step4: 'Contact IDX Broker support if you believe the property should be available'
        }
      }, { status: statusCode });
    }
    
    // Only use mock data for development/testing with known mock IDs
    console.log('Using mock data fallback for development/testing');
    const { generateRealisticProperties, convertToIDXBrokerFormat } = await import('@/lib/realistic-property-data');
    
    const realisticProperties = generateRealisticProperties();
    const mockData = convertToIDXBrokerFormat(realisticProperties);

    // Search for the property in our realistic mock data (try both original and normalized ID)
    const mockProperty = mockData.find(p => 
      p.listingID === propertyId || 
      p.listingID === normalizedPropertyId ||
      (p.listingID && p.listingID.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() === normalizedPropertyId)
    );

    if (mockProperty) {
      console.log('Found realistic mock property:', mockProperty.listingID);

      return NextResponse.json({
        success: true,
        data: mockProperty,
        note: 'Using realistic mock data - IDXBroker API did not return data',
        isMockData: true
      });
    }

    return NextResponse.json({
      success: false,
      error: `Property with ID "${normalizedPropertyId}" not found`
    }, { status: 404 });

  } catch (error) {
    console.error('Error fetching property details:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch property details'
    }, { status: 500 });
  }
}