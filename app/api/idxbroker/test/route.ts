import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('apiKey');

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 400 });
  }

  console.log('🧪 Testing IDXBroker API endpoints...');

  const results = {
    timestamp: new Date().toISOString(),
    apiKey: apiKey.substring(0, 8) + '...',
    tests: [] as any[]
  };

  // Test different endpoints
  const endpoints = [
    { name: 'clients/featured', url: 'https://api.idxbroker.com/clients/featured' },
    { name: 'mls/featured', url: 'https://api.idxbroker.com/mls/featured' },
    { name: 'clients/listings', url: 'https://api.idxbroker.com/clients/listings' },
    { name: 'mls/listings', url: 'https://api.idxbroker.com/mls/listings' }
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint.name}...`);
      
      const response = await fetch(endpoint.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accesskey': apiKey,
          'outputtype': 'json'
        },
      });

      const testResult = {
        endpoint: endpoint.name,
        url: endpoint.url,
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        data: null as any,
        error: null as any
      };

      if (response.ok) {
        try {
          const data = await response.json();
          testResult.data = {
            type: typeof data,
            isArray: Array.isArray(data),
            length: Array.isArray(data) ? data.length : 'not array',
            keys: typeof data === 'object' && data !== null ? Object.keys(data) : 'not object',
            firstItem: Array.isArray(data) && data.length > 0 ? {
              keys: Object.keys(data[0]),
              id: data[0].listingID || data[0].idxID || data[0].id,
              hasImage: !!data[0].image,
              hasImages: !!data[0].images,
              hasPhoto: !!data[0].photo,
              imageData: data[0].image,
              sampleFields: {
                address: data[0].address,
                city: data[0].city,
                price: data[0].price || data[0].listPrice
              }
            } : null
          };
          console.log(`✅ ${endpoint.name} success:`, testResult.data);
        } catch (parseError) {
          testResult.error = 'Failed to parse JSON response';
          const textData = await response.text();
          testResult.data = { rawResponse: textData.substring(0, 500) };
          console.log(`⚠️ ${endpoint.name} parse error:`, parseError);
        }
      } else {
        try {
          const errorText = await response.text();
          testResult.error = errorText.substring(0, 500);
          console.log(`❌ ${endpoint.name} failed:`, response.status, errorText.substring(0, 200));
        } catch (e) {
          testResult.error = `HTTP ${response.status} ${response.statusText}`;
          console.log(`❌ ${endpoint.name} failed:`, response.status, response.statusText);
        }
      }

      results.tests.push(testResult);
    } catch (error) {
      const testResult = {
        endpoint: endpoint.name,
        url: endpoint.url,
        status: 0,
        statusText: 'Network Error',
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      results.tests.push(testResult);
      console.log(`❌ ${endpoint.name} network error:`, error);
    }
  }

  // Test API key validation
  try {
    console.log('Testing API key validation...');
    const validationResponse = await fetch('https://api.idxbroker.com/clients/listcomponents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accesskey': apiKey,
        'outputtype': 'json'
      },
    });

    results.tests.push({
      endpoint: 'API Key Validation',
      url: 'https://api.idxbroker.com/clients/listcomponents',
      status: validationResponse.status,
      statusText: validationResponse.statusText,
      success: validationResponse.ok,
      data: validationResponse.ok ? await validationResponse.json() : null,
      error: validationResponse.ok ? null : await validationResponse.text()
    });
  } catch (error) {
    results.tests.push({
      endpoint: 'API Key Validation',
      url: 'https://api.idxbroker.com/clients/listcomponents',
      status: 0,
      statusText: 'Network Error',
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }

  console.log('🏁 IDXBroker API test completed');
  
  return NextResponse.json(results);
}
