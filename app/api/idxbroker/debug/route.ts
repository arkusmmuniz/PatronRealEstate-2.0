import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiKey:any = searchParams.get('apiKey') || process.env.NEXT_PUBLIC_API;

  console.log('🔍 Debug IDXBroker API call - Testing multiple endpoints');
  console.log('Using API key:', apiKey.substring(0, 8) + '...');

  const results = [];

  // Test multiple endpoints to find data
  const endpoints = [
    'https://api.idxbroker.com/clients/featured',
    'https://api.idxbroker.com/mls/featured', 
    'https://api.idxbroker.com/clients/listings',
    'https://api.idxbroker.com/mls/listings',
    'https://api.idxbroker.com/clients/properties',
    'https://api.idxbroker.com/mls/properties'
  ];

  for (const idxBrokerApiUrl of endpoints) {
    try {
      console.log('Making request to:', idxBrokerApiUrl);
    
      const response = await fetch(idxBrokerApiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accesskey': apiKey,
          'outputtype': 'json'
        },
      });

      console.log(`${idxBrokerApiUrl} - Status:`, response.status, response.statusText);

      // Get raw text first
      const rawText = await response.text();
      
      const endpointResult = {
        endpoint: idxBrokerApiUrl,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        rawTextLength: rawText.length,
        rawTextPreview: rawText.substring(0, 200),
        hasData: false,
        data: null as any,
        error: null as any
      };

      if (rawText && rawText.trim() !== '') {
        // Try to parse as JSON
        try {
          const parsedData = JSON.parse(rawText);
          endpointResult.hasData = true;
          endpointResult.data = {
            type: typeof parsedData,
            isArray: Array.isArray(parsedData),
            length: Array.isArray(parsedData) ? parsedData.length : 'not array',
            keys: typeof parsedData === 'object' && parsedData !== null ? Object.keys(parsedData) : 'not object',
            sample: Array.isArray(parsedData) && parsedData.length > 0 ? parsedData[0] : parsedData
          };
          
          // If we found data, log it
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            console.log(`✅ Found data in ${idxBrokerApiUrl}:`, parsedData.length, 'items');
          }
        } catch (parseError) {
          endpointResult.error = parseError instanceof Error ? parseError.message : 'Parse error';
        }
      } else {
        endpointResult.error = 'Empty response';
      }

      results.push(endpointResult);

    } catch (error) {
      console.error(`Network error for ${idxBrokerApiUrl}:`, error);
      results.push({
        endpoint: idxBrokerApiUrl,
        status: 0,
        statusText: 'Network Error',
        headers: {},
        rawTextLength: 0,
        rawTextPreview: '',
        hasData: false,
        data: null,
        error: error instanceof Error ? error.message : 'Network error'
      });
    }
  }

  return NextResponse.json({
    success: true,
    results: results,
    summary: {
      totalEndpoints: endpoints.length,
      endpointsWithData: results.filter(r => r.hasData).length,
      endpointsWithErrors: results.filter(r => r.error).length
    }
  });
}
