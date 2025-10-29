import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  try {
    // Validate that it's a CoreLogic or IDXBroker image
    const allowedDomains = [
      'api-trestle.corelogic.com',
      'trestle.corelogic.com',
      'patronrealestateservices.idxbroker.com',
      'images.idxbroker.com',
      'photos.idxbroker.com',
      'media.idxbroker.com',
      'cdn.idxbroker.com'
    ];

    const url = new URL(imageUrl);
    if (!allowedDomains.some(domain => url.hostname.includes(domain))) {
      return NextResponse.json({ error: 'Domain not allowed' }, { status: 403 });
    }

    // Fetch the image with proper headers
    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PatronRealEstate/1.0)',
        'Accept': 'image/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Referer': 'https://patronrealestateservices.idxbroker.com/'
      },
      // Add timeout
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      console.warn(`Image proxy failed for ${imageUrl}: ${response.status} ${response.statusText}`);
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('Image proxy error:', error);
    
    // Return a placeholder image instead of error
    const placeholderResponse = await fetch('/placeholder.jpg');
    if (placeholderResponse.ok) {
      const placeholderBuffer = await placeholderResponse.arrayBuffer();
      return new NextResponse(placeholderBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=300', // Cache placeholder for 5 minutes
        },
      });
    }

    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}
