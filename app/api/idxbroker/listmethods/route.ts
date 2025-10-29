import { NextRequest, NextResponse } from 'next/server';
import { getApiKey } from '@/lib/config';

export async function GET(request: NextRequest) {
  const apiKey = getApiKey();

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 400 });
  }

  try {
    console.log('🔍 Investigating IDXBroker API methods...');
    
    // First, let's try the listmethods endpoint
    const listMethodsUrl = 'https://api.idxbroker.com/clients/listmethods';
    
    console.log('Making request to:', listMethodsUrl);
    console.log('Using API key:', apiKey.substring(0, 8) + '...');
    
    const response = await fetch(listMethodsUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accesskey': apiKey,
        'outputtype': 'json'
      },
    });
    
    console.log('Response status:', response.status, response.statusText);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const rawText = await response.text();
      console.log('Raw response length:', rawText.length);
      console.log('Raw response preview:', rawText.substring(0, 500));
      
      if (rawText && rawText.trim() !== '') {
        try {
          const data = JSON.parse(rawText);
          console.log('✅ Successfully parsed listmethods response');
          console.log('Available methods:', Object.keys(data).length);
          
          return NextResponse.json({
            success: true,
            data: data,
            note: 'Available IDXBroker API methods'
          });
        } catch (parseError) {
          console.log('❌ Failed to parse JSON:', parseError);
          return NextResponse.json({
            success: false,
            error: 'Failed to parse API response',
            rawResponse: rawText.substring(0, 1000)
          });
        }
      } else {
        console.log('❌ Empty response from listmethods');
        return NextResponse.json({
          success: false,
          error: 'Empty response from IDXBroker API'
        });
      }
    } else {
      console.log('❌ HTTP error:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('Error response:', errorText);
      
      return NextResponse.json({
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
        details: errorText
      });
    }

  } catch (error) {
    console.error('❌ Request failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}
