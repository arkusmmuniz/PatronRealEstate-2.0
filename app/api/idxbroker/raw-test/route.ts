import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('apiKey') || 'gR0ugo0diM8tTC3cFpSPgZ';

  console.log('🧪 Raw IDXBroker API Test - No Processing');

  const results = {
    timestamp: new Date().toISOString(),
    apiKey: apiKey.substring(0, 8) + '...',
    tests: [] as any[]
  };

  // Test different endpoints with raw responses
  const endpoints = [
    { name: 'clients/featured', url: 'https://api.idxbroker.com/clients/featured' },
    { name: 'mls/featured', url: 'https://api.idxbroker.com/mls/featured' },
    { name: 'clients/listings', url: 'https://api.idxbroker.com/clients/listings' }
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`🔍 Testing ${endpoint.name}...`);
      
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
        headers: Object.fromEntries(response.headers.entries()),
        rawData: null as any,
        error: null as any
      };

      if (response.ok) {
        try {
          const rawData = await response.json();
          
          // Log the complete raw response structure
          console.log(`✅ ${endpoint.name} raw response:`, {
            type: typeof rawData,
            isArray: Array.isArray(rawData),
            length: Array.isArray(rawData) ? rawData.length : 'not array',
            keys: typeof rawData === 'object' && rawData !== null ? Object.keys(rawData) : 'not object'
          });

          if (Array.isArray(rawData) && rawData.length > 0) {
            console.log(`📋 First item from ${endpoint.name}:`, rawData[0]);
            console.log(`🔑 All keys in first item:`, Object.keys(rawData[0]));
            
            // Look for any image-related fields
            const imageFields = Object.keys(rawData[0]).filter(key => 
              key.toLowerCase().includes('image') || 
              key.toLowerCase().includes('photo') || 
              key.toLowerCase().includes('pic')
            );
            console.log(`🖼️ Image-related fields found:`, imageFields);
            
            imageFields.forEach(field => {
              console.log(`🖼️ ${field}:`, rawData[0][field]);
            });
          }
          
          testResult.rawData = rawData;
        } catch (parseError) {
          testResult.error = 'Failed to parse JSON response';
          const textData = await response.text();
          testResult.rawData = textData.substring(0, 1000);
          console.log(`⚠️ ${endpoint.name} parse error:`, parseError);
        }
      } else {
        try {
          const errorText = await response.text();
          testResult.error = errorText;
          console.log(`❌ ${endpoint.name} failed:`, response.status, errorText);
        } catch (e) {
          testResult.error = `HTTP ${response.status} ${response.statusText}`;
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
        headers: {},
        rawData: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      results.tests.push(testResult);
      console.log(`❌ ${endpoint.name} network error:`, error);
    }
  }

  console.log('🏁 Raw IDXBroker API test completed');
  
  return NextResponse.json(results, { 
    headers: { 
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    } 
  });
}
