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
   * Get featured listings
   */
  async getFeaturedListings(params: IDXBrokerSearchParams = {}): Promise<IDXBrokerResponse> {
    try {
      const response = await this.makeRequest('featured', {
        limit: params.limit || 20,
        offset: params.offset || 0,
        ...params
      });

      if (response.success) {
        return {
          success: true,
          data: this.transformProperties(response.data),
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
   * Search properties with filters
   */
  async searchProperties(params: IDXBrokerSearchParams = {}): Promise<IDXBrokerResponse> {
    try {
      const response = await this.makeRequest('search', {
        limit: params.limit || 50,
        offset: params.offset || 0,
        ...params
      });

      if (response.success) {
        return {
          success: true,
          data: this.transformProperties(response.data),
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
   * Get property details by ID
   */
  async getPropertyDetails(listingID: string): Promise<IDXBrokerResponse> {
    try {
      const response = await this.makeRequest(`property/${listingID}`);
      
      if (response.success) {
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
   * Transform raw API data to our property format
   */
  private transformProperties(rawData: any[]): IDXBrokerProperty[] {
    return rawData.map((item: any) => ({
      listingID: item.listingID || item.id || '',
      address: item.address || item.streetAddress || '',
      city: item.city || '',
      state: item.state || '',
      zipCode: item.zipCode || item.postalCode || '',
      price: parseFloat(item.price || item.listPrice || 0),
      bedrooms: parseInt(item.bedrooms || item.beds || 0),
      bathrooms: parseFloat(item.bathrooms || item.baths || 0),
      squareFeet: parseInt(item.squareFeet || item.sqft || 0),
      listingDate: item.listingDate || item.dateListed || '',
      propertyType: item.propertyType || item.type || '',
      status: item.status || item.listingStatus || 'Active',
      imageUrl: item.imageUrl || item.primaryPhoto || item.photo || '',
      description: item.description || item.remarks || '',
      yearBuilt: parseInt(item.yearBuilt || 0),
      lotSize: parseFloat(item.lotSize || 0),
      garage: parseInt(item.garage || 0),
      pool: Boolean(item.pool),
      waterfront: Boolean(item.waterfront)
    }));
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
