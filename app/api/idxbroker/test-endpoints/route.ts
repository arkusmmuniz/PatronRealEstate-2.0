import { NextRequest, NextResponse } from 'next/server';
import { getApiKey } from '@/lib/config';

export async function GET(request: NextRequest) {
  const apiKey = getApiKey();

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 400 });
  }

  const results: any = {};

  // Helper function to make API calls with different parameters
  const testEndpoint = async (name: string, url: string, params: Record<string, string> = {}) => {
    try {
      const urlWithParams = new URL(url);
      Object.entries(params).forEach(([key, value]) => {
        urlWithParams.searchParams.append(key, value);
      });
      
      console.log(`🔍 Testing ${name}: ${urlWithParams.toString()}`);
      
      const response = await fetch(urlWithParams.toString(), {
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
            
            // Look for image fields in the data
            let imageFields: string[] = [];
            let sampleImages: any[] = [];
            
            if (Array.isArray(data) && data.length > 0) {
              console.log(`${name} - First item keys:`, Object.keys(data[0]));
              
              // Look for image fields in the first item
              const firstItem = data[0];
              imageFields = Object.keys(firstItem).filter(key => 
                key.toLowerCase().includes('image') || 
                key.toLowerCase().includes('photo') || 
                key.toLowerCase().includes('picture') ||
                key.toLowerCase().includes('media')
              );
              console.log(`${name} - Image fields found:`, imageFields);
              
              if (imageFields.length > 0) {
                imageFields.forEach(field => {
                  console.log(`${name} - ${field}:`, firstItem[field]);
                  if (firstItem[field]) {
                    sampleImages.push({
                      field: field,
                      value: firstItem[field],
                      type: typeof firstItem[field]
                    });
                  }
                });
              }
              
              // Also check for nested image data
              if (firstItem.mediaData) {
                console.log(`${name} - mediaData:`, firstItem.mediaData);
                sampleImages.push({
                  field: 'mediaData',
                  value: firstItem.mediaData,
                  type: typeof firstItem.mediaData
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
              imageFields: imageFields,
              sampleImages: sampleImages,
              totalItems: Array.isArray(data) ? data.length : 1
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
    console.log('🚀 Testing IDXBroker endpoints with different parameters...');
    console.log('Using API key:', apiKey.substring(0, 8) + '...');

    // Test different endpoint variations
    const tests = [
      { name: 'featured_basic', url: 'https://api.idxbroker.com/clients/featured' },
      { name: 'featured_with_limit', url: 'https://api.idxbroker.com/clients/featured', params: { limit: '10' } },
      { name: 'featured_with_offset', url: 'https://api.idxbroker.com/clients/featured', params: { limit: '10', offset: '0' } },
      { name: 'properties_basic', url: 'https://api.idxbroker.com/clients/properties' },
      { name: 'properties_with_limit', url: 'https://api.idxbroker.com/clients/properties', params: { limit: '10' } },
      { name: 'searchquery_basic', url: 'https://api.idxbroker.com/clients/searchquery' },
      { name: 'searchquery_with_params', url: 'https://api.idxbroker.com/clients/searchquery', params: { query: 'bedrooms=3' } },
      { name: 'listing_sample', url: 'https://api.idxbroker.com/clients/listing', params: { listingID: '12345' } }
    ];

    for (const test of tests) {
      results[test.name] = await testEndpoint(test.name, test.url, test.params);
      
      // Add a small delay between requests
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log('🏁 Testing complete!');

    // Find successful endpoints with images
    const successfulEndpoints = Object.keys(results).filter(key => results[key].success);
    const endpointsWithImages = Object.keys(results).filter(key => 
      results[key].success && results[key].imageFields && results[key].imageFields.length > 0
    );

    return NextResponse.json({
      success: true,
      apiKey: apiKey.substring(0, 8) + '...',
      results: results,
      summary: {
        successfulEndpoints: successfulEndpoints,
        endpointsWithImages: endpointsWithImages,
        totalTests: tests.length
      },
      recommendations: {
        bestEndpoint: endpointsWithImages.length > 0 ? endpointsWithImages[0] : 'No endpoints with images found',
        nextSteps: endpointsWithImages.length > 0 ? 
          'Use the endpoint with images and update the carousel to use real IDXBroker data' : 
          'Investigate why no images are returned - may need different parameters or account setup'
      }
    });

  } catch (error) {
    console.error('❌ Testing failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Testing failed',
      partialResults: results
    }, { status: 500 });
  }
}
