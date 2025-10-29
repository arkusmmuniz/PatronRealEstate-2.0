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
    // Try to fetch from IDXBroker API first
    const idxBrokerApiUrl = `https://api.idxbroker.com/mls/listings/${propertyId}`;
    
    console.log('Fetching property details from IDXBroker:', idxBrokerApiUrl);
    
    const response = await fetch(idxBrokerApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accesskey': apiKey,
        'outputtype': 'json'
      },
    });

    if (response.ok) {
      const rawText = await response.text();
      
      if (rawText && rawText.trim() !== '') {
        try {
          const propertyData = JSON.parse(rawText);
          
          if (propertyData && typeof propertyData === 'object') {
            console.log('Successfully fetched property details from IDXBroker:', propertyData);
            return NextResponse.json({
              success: true,
              data: propertyData
            });
          }
        } catch (parseError) {
          console.log('Failed to parse IDXBroker response:', parseError);
        }
      }
    } else {
      console.log('IDXBroker API response not OK:', response.status, response.statusText);
      
      try {
        const errorData = await response.text();
        console.log('IDXBroker error response:', errorData.substring(0, 200));
      } catch (e) {
        console.log('Could not parse error response');
      }
    }

    // If real API fails, use realistic mock data
    console.log('IDXBroker API failed, searching in realistic mock data for property:', propertyId);
    
    // Import the same realistic property data used in the main endpoint
    const { generateRealisticProperties, convertToIDXBrokerFormat } = await import('@/lib/realistic-property-data');
    
    const realisticProperties = generateRealisticProperties();
    const mockData = convertToIDXBrokerFormat(realisticProperties);

    // Search for the property in our realistic mock data
    const mockProperty = mockData.find(p => p.listingID === propertyId);

    if (mockProperty) {
      console.log('Found realistic mock property:', mockProperty.listingID);

      return NextResponse.json({
        success: true,
        data: mockProperty,
        note: 'Using realistic mock data - IDXBroker API did not return data'
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Property not found'
    }, { status: 404 });

  } catch (error) {
    console.error('Error fetching property details:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch property details'
    }, { status: 500 });
  }
}