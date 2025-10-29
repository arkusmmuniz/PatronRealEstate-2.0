// Test file to verify IDXBroker API endpoints
// This file can be used to test the API integration

export const testIDXBrokerEndpoints = async (apiKey: string) => {
  console.log('🧪 Testing IDXBroker API endpoints...');
  
  const baseUrl = 'https://api.idxbroker.com';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'accesskey': apiKey,
    'outputtype': 'json'
  };

  // Test 1: Featured listings
  try {
    console.log('📋 Testing /mls/featured endpoint...');
    const featuredResponse = await fetch(`${baseUrl}/mls/featured`, {
      method: 'GET',
      headers
    });
    
    if (featuredResponse.ok) {
      const featuredData = await featuredResponse.json();
      console.log('✅ Featured listings success:', {
        status: featuredResponse.status,
        dataType: typeof featuredData,
        isArray: Array.isArray(featuredData),
        count: Array.isArray(featuredData) ? featuredData.length : 'not array',
        firstItemKeys: Array.isArray(featuredData) && featuredData.length > 0 ? Object.keys(featuredData[0]) : 'no data'
      });
      
      // Check for images in first property
      if (Array.isArray(featuredData) && featuredData.length > 0) {
        const firstProperty = featuredData[0];
        console.log('🖼️ First property image data:', {
          listingID: firstProperty.listingID || firstProperty.idxID,
          hasImage: !!firstProperty.image,
          hasImages: !!firstProperty.images,
          hasPhoto: !!firstProperty.photo,
          imageType: typeof firstProperty.image,
          imageKeys: firstProperty.image ? Object.keys(firstProperty.image) : 'no image object'
        });
      }
    } else {
      console.log('❌ Featured listings failed:', featuredResponse.status, featuredResponse.statusText);
    }
  } catch (error) {
    console.log('❌ Featured listings error:', error);
  }

  // Test 2: Specific listing (if we have data from test 1)
  try {
    console.log('🏠 Testing /mls/listings/{id} endpoint...');
    // Use a common test listing ID or the first one from featured
    const testListingId = '12345'; // This should be replaced with a real ID from your MLS
    
    const listingResponse = await fetch(`${baseUrl}/mls/listings/${testListingId}`, {
      method: 'GET',
      headers
    });
    
    if (listingResponse.ok) {
      const listingData = await listingResponse.json();
      console.log('✅ Specific listing success:', {
        status: listingResponse.status,
        dataType: typeof listingData,
        keys: typeof listingData === 'object' ? Object.keys(listingData) : 'not object'
      });
    } else {
      console.log('❌ Specific listing failed:', listingResponse.status, listingResponse.statusText);
      const errorText = await listingResponse.text();
      console.log('Error details:', errorText);
    }
  } catch (error) {
    console.log('❌ Specific listing error:', error);
  }

  console.log('🏁 IDXBroker API test completed');
};

// Helper function to log API response structure
export const logAPIStructure = (data: any, label: string) => {
  console.log(`📊 ${label} structure:`, {
    type: typeof data,
    isArray: Array.isArray(data),
    keys: typeof data === 'object' && data !== null ? Object.keys(data) : 'not object',
    length: Array.isArray(data) ? data.length : 'not array',
    sample: Array.isArray(data) && data.length > 0 ? data[0] : data
  });
};
