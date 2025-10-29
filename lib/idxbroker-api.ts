// IDXBroker API Integration
// Documentation: https://middleware.idxbroker.com/docs/api/overview.php

export interface IDXBrokerProperty {
  listingID: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  listingDate: string;
  propertyType: string;
  status: string;
  imageUrl?: string;
  images?: string[];
  description?: string;
  yearBuilt?: number;
  lotSize?: number;
  garage?: number;
  pool?: boolean;
  waterfront?: boolean;
}

export interface IDXBrokerResponse {
  success: boolean;
  data?: IDXBrokerProperty[];
  error?: string;
  count?: number;
  isMockData?: boolean; // indicates if the data is mock data (already formatted)
}

export interface IDXBrokerSearchParams {
  limit?: number;
  offset?: number;
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  status?: string;
}

class IDXBrokerAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    // Use our backend API to avoid CORS issues
    const url = new URL('/api/idxbroker', window.location.origin);
    
    // Add API key and endpoint as query parameters
    url.searchParams.append('apiKey', this.apiKey);
    url.searchParams.append('endpoint', endpoint);
    
    // Add other parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('IDXBroker API Error:', error);
      throw new Error(`Failed to fetch data from IDXBroker API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get featured listings using correct IDXBroker API endpoint
   */
  async getFeaturedListings(params: IDXBrokerSearchParams = {}): Promise<IDXBrokerResponse> {
    try {
      const response = await this.makeRequest('featured', {
        limit: params.limit || 20,
        offset: params.offset || 0,
        ...params
      });

      if (response.success && response.data) {
        return {
          success: true,
          data: response.isMockData ? response.data : this.transformProperties(response.data),
          count: response.count
        };
      } else {
        return {
          success: false,
          error: response.error || 'Failed to fetch featured listings'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch featured listings'
      };
    }
  }

  /**
   * Search properties with filters using correct IDXBroker API endpoint
   */
  async searchProperties(params: IDXBrokerSearchParams = {}): Promise<IDXBrokerResponse> {
    try {
      const response = await this.makeRequest('search', {
        limit: params.limit || 50,
        offset: params.offset || 0,
        ...params
      });

      if (response.success && response.data) {
        return {
          success: true,
          data: response.isMockData ? response.data : this.transformProperties(response.data),
          count: response.count
        };
      } else {
        return {
          success: false,
          error: response.error || 'Failed to search properties'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to search properties'
      };
    }
  }

  /**
   * Get property details by ID using correct IDXBroker API endpoint
   */
  async getPropertyDetails(listingID: string): Promise<IDXBrokerResponse> {
    try {
      const response = await this.makeRequest(`property/${listingID}`);
      
      if (response.success && response.data) {
        return {
          success: true,
          data: this.transformProperties(response.data)
        };
      } else {
        return {
          success: false,
          error: response.error || 'Failed to fetch property details'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch property details'
      };
    }
  }

  /**
   * Get property images by ID - try multiple IDXBroker endpoints for images
   */
  async getPropertyImages(listingID: string): Promise<IDXBrokerResponse> {
    try {
      console.log('Fetching images for property:', listingID);
      
      // First try to get images from the property details
      const response = await this.getPropertyDetails(listingID);
      
      if (response.success && response.data && response.data.length > 0) {
        const property = response.data[0];
        
        console.log('Property details response for images:', {
          listingID: property.listingID,
          hasImageUrl: !!property.imageUrl,
          hasImages: !!property.images,
          imagesCount: property.images ? property.images.length : 0,
          imageUrl: property.imageUrl,
          images: property.images
        });
        
        // Collect all available images
        let allImages: string[] = [];
        
        if (property.images && Array.isArray(property.images)) {
          allImages = [...property.images];
        }
        
        if (property.imageUrl && !allImages.includes(property.imageUrl)) {
          allImages.unshift(property.imageUrl);
        }
        
        // Filter valid image URLs
        const validImages = allImages.filter(img => 
          typeof img === 'string' && 
          img.trim() !== '' && 
          img !== '/placeholder.jpg' &&
          (img.startsWith('http') || img.startsWith('/'))
        );
        
        if (validImages.length > 0) {
          return {
            success: true,
            data: validImages as any // Images array for this specific method
          };
        }
      }
      
      // If no images found, try alternative endpoint (if exists)
      try {
        const alternativeResponse = await this.makeRequest(`images/${listingID}`);
        if (alternativeResponse.success && alternativeResponse.data) {
          return {
            success: true,
            data: Array.isArray(alternativeResponse.data) ? alternativeResponse.data : [alternativeResponse.data]
          };
        }
      } catch (altError) {
        console.log('Alternative image endpoint failed:', altError);
      }
      
      return {
        success: false,
        error: 'No images found for this property'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch property images'
      };
    }
  }

  /**
   * Get agent information
   */
  async getAgentInfo(): Promise<IDXBrokerResponse> {
    try {
      const response = await this.makeRequest('agent');
      
      if (response.success) {
        return {
          success: true,
          data: response.data
        };
      } else {
        return {
          success: false,
          error: response.error || 'Failed to fetch agent information'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch agent information'
      };
    }
  }

  /**
   * Transform raw IDXBroker API data to our property format
   * Based on actual IDXBroker field names from their documentation
   */
  private transformProperties(rawData: any[]): IDXBrokerProperty[] {
    return rawData.map((item: any) => {
      console.log('Transforming IDXBroker property:', item.listingID || item.idxID, 'Raw data keys:', Object.keys(item));
      
      // Handle images from IDXBroker API - comprehensive image extraction
      let imageUrl = '';
      let images: string[] = [];
      
      console.log('Raw image data for property:', item.listingID || item.idxID, {
        hasImage: !!item.image,
        hasImages: !!item.images,
        hasPhoto: !!item.photo,
        hasPrimaryPhoto: !!item.primaryPhoto,
        hasMediaData: !!item.mediaData,
        mlsPhotoCount: item.mlsPhotoCount,
        imageType: typeof item.image,
        imageData: item.image
      });
      
      // IDXBroker can provide images in multiple formats - check all possibilities
      if (item.image) {
        if (typeof item.image === 'string') {
          // Simple string URL
          imageUrl = item.image;
          images = [item.image];
        } else if (typeof item.image === 'object') {
          // Object with full/thumb or other properties
          if (item.image.full) {
            imageUrl = item.image.full;
            images = [item.image.full];
            if (item.image.thumb) images.push(item.image.thumb);
          } else if (item.image.url) {
            imageUrl = item.image.url;
            images = [item.image.url];
          } else if (item.image.large) {
            imageUrl = item.image.large;
            images = [item.image.large];
            if (item.image.medium) images.push(item.image.medium);
            if (item.image.small) images.push(item.image.small);
          }
        }
      }

      // Handle IDXBroker mediaData field (additional media)
      if (item.mediaData) {
        console.log('Processing mediaData:', item.mediaData);
        if (Array.isArray(item.mediaData)) {
          const mediaImages = item.mediaData
            .filter(media => media && typeof media === 'string' && media.trim() !== '')
            .map(media => media.trim());
          images = [...images, ...mediaImages];
          if (!imageUrl && mediaImages.length > 0) {
            imageUrl = mediaImages[0];
          }
        } else if (typeof item.mediaData === 'string') {
          const mediaImages = item.mediaData.split(',').map(img => img.trim()).filter(img => img !== '');
          images = [...images, ...mediaImages];
          if (!imageUrl && mediaImages.length > 0) {
            imageUrl = mediaImages[0];
          }
        }
      }
      
      // Check for images array
      if (item.images && Array.isArray(item.images) && item.images.length > 0) {
        const validImages = item.images.filter((img: any) => 
          typeof img === 'string' && img.trim() !== ''
        );
        if (validImages.length > 0) {
          images = [...images, ...validImages];
          if (!imageUrl) imageUrl = validImages[0];
        }
      }
      
      // Check for other common image fields
      if (!imageUrl && item.photo) {
        imageUrl = item.photo;
        images = [item.photo, ...images];
      }
      
      if (!imageUrl && item.primaryPhoto) {
        imageUrl = item.primaryPhoto;
        images = [item.primaryPhoto, ...images];
      }
      
      // Remove duplicates and filter valid URLs
      images = [...new Set(images)].filter((img: string) => 
        typeof img === 'string' && 
        img.trim() !== '' && 
        (img.startsWith('http') || img.startsWith('/'))
      );
      
      console.log('Processed images for property:', item.listingID || item.idxID, 'imageUrl:', imageUrl, 'images count:', images.length);
      
      return {
        // IDXBroker standard fields
        listingID: item.listingID || item.idxID || item.mlsID || '',
        address: item.address || item.streetAddress || item.fullAddress || '',
        city: item.cityName || item.city || '',
        state: item.state || item.stateAbbr || '',
        zipCode: item.zipcode || item.zipCode || item.postalCode || '',
        price: parseFloat(item.listPrice || item.price || 0),
        bedrooms: parseInt(item.bedrooms || item.totalBedrooms || 0),
        bathrooms: parseFloat(item.totalBaths || item.bathrooms || 0),
        squareFeet: parseInt(item.sqFt || item.squareFeet || item.totalSqFt || 0),
        listingDate: item.listingDate || item.dateAdded || item.listDate || '',
        propertyType: item.propType || item.propertyType || item.propSubType || '',
        status: item.propStatus || item.status || 'Active',
        
        // Images processed above
        imageUrl: imageUrl || '/placeholder.jpg',
        images: images.length > 0 ? images : ['/placeholder.jpg'],
        
        // Additional details
        description: item.remarksConcat || item.remarks || item.description || '',
        yearBuilt: parseInt(item.yearBuilt || item.yearBlt || 0),
        lotSize: parseFloat(item.acres || item.lotSize || 0),
        garage: parseInt(item.garage || item.parkingSpaces || 0),
        pool: Boolean(item.pool || item.poolPrivate),
        waterfront: Boolean(item.waterfront || item.waterfrontYN)
      };
    });
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.makeRequest('featured', { limit: 1 });
      return response.success;
    } catch (error) {
      return false;
    }
  }
}

export default IDXBrokerAPI;

// Utility functions for common operations
export const idxbrokerUtils = {
  formatPrice: (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  },

  formatDate: (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },

  getStatusColor: (status: string): string => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'sold':
        return 'bg-blue-500';
      case 'withdrawn':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  }
};
