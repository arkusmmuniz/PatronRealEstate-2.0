import { NextRequest, NextResponse } from 'next/server';
import { getApiKey } from '@/lib/config';

export async function GET(request: NextRequest) {
  const apiKey = getApiKey();

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 400 });
  }

  const results: any = {};

  // Helper function to make API calls
  const testEndpoint = async (name: string, url: string) => {
    try {
      console.log(`🔍 Testing ${name}: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accesskey': apiKey,
          'outputtype': 'json'
        },
      });
      
      console.log(`${name} - Status:`, response.status, response.statusText);
      
      if (response.ok) {
        const rawText = await response.text();
        console.log(`${name} - Response length:`, rawText.length);
        
        if (rawText && rawText.trim() !== '') {
          try {
            const data = JSON.parse(rawText);
            console.log(`✅ ${name} - Success! Data type:`, typeof data, Array.isArray(data) ? `Array[${data.length}]` : 'Object');
            
            // Log sample data structure
            if (Array.isArray(data) && data.length > 0) {
              console.log(`${name} - First item keys:`, Object.keys(data[0]));
              
              // Look for image fields in the first item
              const firstItem = data[0];
              const imageFields = Object.keys(firstItem).filter(key => 
                key.toLowerCase().includes('image') || 
                key.toLowerCase().includes('photo') || 
                key.toLowerCase().includes('picture')
              );
              console.log(`${name} - Image fields found:`, imageFields);
              
              if (imageFields.length > 0) {
                imageFields.forEach(field => {
                  console.log(`${name} - ${field}:`, firstItem[field]);
                });
              }
            } else if (typeof data === 'object' && data !== null) {
              console.log(`${name} - Object keys:`, Object.keys(data));
            }
            
            return {
              success: true,
              status: response.status,
              dataType: Array.isArray(data) ? `Array[${data.length}]` : typeof data,
              sampleData: Array.isArray(data) ? data.slice(0, 2) : data,
              imageFields: Array.isArray(data) && data.length > 0 ? 
                Object.keys(data[0]).filter(key => 
                  key.toLowerCase().includes('image') || 
                  key.toLowerCase().includes('photo') || 
                  key.toLowerCase().includes('picture')
                ) : []
            };
          } catch (parseError) {
            console.log(`❌ ${name} - JSON parse error:`, parseError);
            return {
              success: false,
              status: response.status,
              error: 'JSON parse error',
              rawPreview: rawText.substring(0, 200)
            };
          }
        } else {
          console.log(`❌ ${name} - Empty response`);
          return {
            success: false,
            status: response.status,
            error: 'Empty response'
          };
        }
      } else {
        const errorText = await response.text();
        console.log(`❌ ${name} - HTTP error:`, response.status, errorText);
        return {
          success: false,
          status: response.status,
          error: `HTTP ${response.status}: ${response.statusText}`,
          details: errorText.substring(0, 200)
        };
      }
    } catch (error) {
      console.error(`❌ ${name} - Request failed:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  try {
    console.log('🚀 Starting IDXBroker API investigation...');
    console.log('Using API key:', apiKey.substring(0, 8) + '...');

    // Test various endpoints
    const endpoints = [
      { name: 'listmethods', url: 'https://api.idxbroker.com/clients/listmethods' },
      { name: 'clients_featured', url: 'https://api.idxbroker.com/clients/featured' },
      { name: 'clients_listings', url: 'https://api.idxbroker.com/clients/listings' },
      { name: 'mls_featured', url: 'https://api.idxbroker.com/mls/featured' },
      { name: 'mls_listings', url: 'https://api.idxbroker.com/mls/listings' },
      { name: 'clients_properties', url: 'https://api.idxbroker.com/clients/properties' },
      { name: 'mls_properties', url: 'https://api.idxbroker.com/mls/properties' }
    ];

    for (const endpoint of endpoints) {
      results[endpoint.name] = await testEndpoint(endpoint.name, endpoint.url);
      
      // Add a small delay between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('🏁 Investigation complete!');

    return NextResponse.json({
      success: true,
      apiKey: apiKey.substring(0, 8) + '...',
      results: results,
      summary: {
        successfulEndpoints: Object.keys(results).filter(key => results[key].success),
        endpointsWithData: Object.keys(results).filter(key => 
          results[key].success && results[key].dataType && results[key].dataType !== 'undefined'
        ),
        endpointsWithImages: Object.keys(results).filter(key => 
          results[key].success && results[key].imageFields && results[key].imageFields.length > 0
        )
      }
    });

  } catch (error) {
    console.error('❌ Investigation failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Investigation failed',
      partialResults: results
    }, { status: 500 });
  }
}
