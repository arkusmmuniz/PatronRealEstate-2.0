"use client";

import { useState, useEffect } from 'react';
import { getApiKey } from '@/lib/config';
import IDXBrokerAPI from '@/lib/idxbroker-api';

interface ImageTestProps {
  propertyId?: string;
}

export function IDXBrokerImageTest({ propertyId = "12345" }: ImageTestProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiResponse, setApiResponse] = useState<any>(null);

  useEffect(() => {
    testIDXBrokerImages();
  }, [propertyId]);

  const testIDXBrokerImages = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('🧪 Testing IDXBroker images for property:', propertyId);
      
      const apiKey = getApiKey();
      const api = new IDXBrokerAPI(apiKey);
      
      // Test featured listings first
      console.log('📋 Testing featured listings...');
      const featuredResponse = await api.getFeaturedListings({ limit: 5 });
      
      if (featuredResponse.success && featuredResponse.data) {
        console.log('✅ Featured listings response:', featuredResponse);
        setApiResponse(featuredResponse);
        
        // Log detailed property structure
        console.log('🔍 Detailed property analysis:');
        featuredResponse.data.forEach((property, index) => {
          console.log(`Property ${index + 1}:`, {
            id: property.listingID,
            address: property.address,
            city: property.city,
            price: property.price,
            imageUrl: property.imageUrl,
            images: property.images,
            hasImageUrl: !!property.imageUrl,
            hasImages: !!property.images,
            imageUrlType: typeof property.imageUrl,
            imagesType: typeof property.images,
            allKeys: Object.keys(property)
          });
        });
        
        // Extract images from featured listings
        const allImages: string[] = [];
        const imageAnalysis: any[] = [];
        
        featuredResponse.data.forEach((property, index) => {
          const propertyAnalysis = {
            propertyIndex: index,
            listingID: property.listingID,
            imageUrl: property.imageUrl,
            images: property.images,
            extractedImages: [] as string[]
          };
          
          if (property.imageUrl && property.imageUrl !== '/placeholder.jpg') {
            allImages.push(property.imageUrl);
            propertyAnalysis.extractedImages.push(property.imageUrl);
          }
          if (property.images && Array.isArray(property.images)) {
            property.images.forEach((img: string) => {
              if (img && img !== '/placeholder.jpg' && !allImages.includes(img)) {
                allImages.push(img);
                propertyAnalysis.extractedImages.push(img);
              }
            });
          }
          
          imageAnalysis.push(propertyAnalysis);
        });
        
        console.log('🖼️ Image extraction analysis:', imageAnalysis);
        console.log('🖼️ All extracted images:', allImages);
        setImages(allImages);
        
        if (allImages.length === 0) {
          setError(`No images found in IDXBroker response. Got ${featuredResponse.data.length} properties but none had valid images.`);
        }
      } else {
        console.log('❌ Featured listings failed:', featuredResponse);
        setError(featuredResponse.error || 'Failed to fetch featured listings');
      }
      
    } catch (err) {
      console.error('❌ IDXBroker image test error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 border rounded-lg bg-blue-50">
        <h3 className="font-bold text-blue-800">🧪 Testing IDXBroker Images...</h3>
        <p className="text-blue-600">Loading images from IDXBroker API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50">
        <h3 className="font-bold text-red-800">❌ IDXBroker Image Test Failed</h3>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={testIDXBrokerImages}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry Test
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <h3 className="font-bold text-green-800">✅ IDXBroker Images Test Results</h3>
      
      {/* API Response Summary */}
      <div className="mt-4 p-3 bg-white rounded border">
        <h4 className="font-semibold">API Response Summary:</h4>
        <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto max-h-32">
          {JSON.stringify({
            success: apiResponse?.success,
            count: apiResponse?.count,
            propertiesWithImages: apiResponse?.data?.filter((p: any) => 
              p.imageUrl && p.imageUrl !== '/placeholder.jpg'
            ).length,
            totalProperties: apiResponse?.data?.length
          }, null, 2)}
        </pre>
      </div>

      {/* Images Display */}
      <div className="mt-4">
        <h4 className="font-semibold">Found Images ({images.length}):</h4>
        
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {images.slice(0, 6).map((imageUrl, index) => (
              <div key={index} className="border rounded overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={`IDXBroker Image ${index + 1}`}
                  className="w-full h-32 object-cover"
                  onLoad={() => console.log('✅ Image loaded:', imageUrl)}
                  onError={(e) => {
                    console.log('❌ Image failed to load:', imageUrl);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="p-2 text-xs bg-gray-100">
                  <p className="truncate" title={imageUrl}>
                    {imageUrl}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-2">No images found from IDXBroker API</p>
        )}
      </div>

      {/* Retry Button */}
      <button 
        onClick={testIDXBrokerImages}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Refresh Test
      </button>
    </div>
  );
}
