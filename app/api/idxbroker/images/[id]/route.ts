import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('apiKey');
  const resolvedParams = await params;
  const propertyId = resolvedParams.id;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 400 });
  }

  if (!propertyId) {
    return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
  }

  try {
    // Try to get images from IDXBroker API
    const idxBrokerApiUrl = `https://middleware.idxbroker.com/mls/property/${propertyId}/images`;
    
    const response = await fetch(idxBrokerApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'PatronRealEstate/1.0',
      },
    });

    if (response.ok) {
      const imageData = await response.json();
      
      if (imageData && Array.isArray(imageData) && imageData.length > 0) {
        return NextResponse.json({
          success: true,
          data: imageData,
          count: imageData.length
        });
      }
    }

    // If no images found from API, return fallback images
    const fallbackImages = [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ];

    return NextResponse.json({
      success: true,
      data: fallbackImages,
      count: fallbackImages.length,
      note: 'Using fallback images - IDXBroker API did not return images'
    });

  } catch (error) {
    console.error('IDXBroker Images API Error:', error);
    
    // Return fallback images on error
    const fallbackImages = [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ];

    return NextResponse.json({
      success: true,
      data: fallbackImages,
      count: fallbackImages.length,
      error: error instanceof Error ? error.message : 'Failed to fetch images from IDXBroker API'
    });
  }
}
