import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('apiKey');
  const endpoint = searchParams.get('endpoint') || 'featured';
  const limit = searchParams.get('limit') || '20';
  const offset = searchParams.get('offset') || '0';

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 400 });
  }

  try {
    // Determine the correct IDXBroker API URL based on endpoint
    let idxBrokerApiUrl = '';
    
    if (endpoint === 'featured' || endpoint === 'search') {
      idxBrokerApiUrl = 'https://api.idxbroker.com/clients/featured';
      console.log('Trying clients/featured endpoint with parameters');
    } else if (endpoint.startsWith('property/')) {
      const propertyId = endpoint.split('/')[1];
      idxBrokerApiUrl = `https://api.idxbroker.com/mls/listings/${propertyId}`;
    } else if (endpoint.startsWith('images/')) {
      const propertyId = endpoint.split('/')[1];
      idxBrokerApiUrl = `https://api.idxbroker.com/mls/listings/${propertyId}`;
    } else {
      idxBrokerApiUrl = `https://api.idxbroker.com/mls/${endpoint}`;
    }
    
    // Add parameters to the URL for featured endpoint
    if (endpoint === 'featured' || endpoint === 'search') {
      const urlWithParams = new URL(idxBrokerApiUrl);
      urlWithParams.searchParams.append('limit', limit);
      urlWithParams.searchParams.append('offset', offset);
      idxBrokerApiUrl = urlWithParams.toString();
    }
    
    console.log('Making IDXBroker API call to:', idxBrokerApiUrl);
    console.log('Using API key:', apiKey.substring(0, 8) + '...');
    
    const response = await fetch(idxBrokerApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accesskey': apiKey,
        'outputtype': 'json'
      },
    });
    
    console.log('IDXBroker API response status:', response.status, response.statusText);

    if (response.ok) {
      const rawText = await response.text();
      console.log('IDXBroker raw response text length:', rawText.length);
      
      if (rawText && rawText.trim() !== '') {
        try {
          const realData = JSON.parse(rawText);
          
          console.log('IDXBroker API response received:', {
            type: typeof realData,
            isArray: Array.isArray(realData),
            length: Array.isArray(realData) ? realData.length : 'not array'
          });
          
          if (Array.isArray(realData) && realData.length > 0) {
            console.log('Successfully fetched real IDXBroker data:', realData.length, 'items');
            return NextResponse.json({
              success: true,
              data: realData,
              count: realData.length
            });
          } else if (realData && typeof realData === 'object') {
            console.log('Successfully fetched single IDXBroker item');
            return NextResponse.json({
              success: true,
              data: [realData],
              count: 1
            });
          }
        } catch (parseError) {
          console.log('❌ Failed to parse IDXBroker response as JSON:', parseError);
        }
      } else {
        console.log('❌ IDXBroker returned empty response - will use realistic mock data');
      }
    } else {
      console.log('IDXBroker API response not OK:', response.status, response.statusText);
    }
    
    // Fallback to realistic mock data that simulates IDXBroker structure
    console.log('IDXBroker API call failed or returned no data, using realistic property data');
    
    const { generateRealisticProperties, convertToIDXBrokerFormat } = await import('@/lib/realistic-property-data');
    
    const realisticProperties = generateRealisticProperties();
    const mockData = convertToIDXBrokerFormat(realisticProperties);

    // Apply pagination
    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset);
    const paginatedData = mockData.slice(offsetNum, offsetNum + limitNum);

    console.log('Returning realistic mock data:', paginatedData.length, 'properties');

    return NextResponse.json({
      success: true,
      data: paginatedData,
      count: paginatedData.length,
      note: 'Using realistic mock data - IDXBroker API returned no data',
      isMockData: true
    });

  } catch (error) {
    console.error('IDXBroker API Error:', error);
    
    // Even if there's an error, return realistic mock data instead of failing
    const { generateRealisticProperties, convertToIDXBrokerFormat } = await import('@/lib/realistic-property-data');
    
    const realisticProperties = generateRealisticProperties();
    const fallbackData = convertToIDXBrokerFormat(realisticProperties);

    return NextResponse.json({
      success: true,
      data: fallbackData,
      count: fallbackData.length,
      note: 'Using fallback realistic data due to API error',
      isMockData: true
    });
  }
}
