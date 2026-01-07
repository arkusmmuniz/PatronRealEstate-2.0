"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Home, 
  Bed, 
  Bath, 
  Square, 
  Car,
  Waves,
  Phone,
  Mail,
  Share2,
  Heart,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import IDXBrokerAPI, { IDXBrokerProperty, IDXBrokerResponse } from "@/lib/idxbroker-api";
import { idxbrokerUtils } from "@/lib/idxbroker-api";
import { getApiKey } from "@/lib/config";
// Removed Unsplash image generation - only use IDXBroker images

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const [property, setProperty] = useState<IDXBrokerProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [propertyImages, setPropertyImages] = useState<string[]>([]);

  // Get property images from IDXBroker API only
  const getPropertyImages = (property: IDXBrokerProperty): string[] => {
    // If property has images from IDXBroker API, use them
    if (property.images && Array.isArray(property.images) && property.images.length > 0) {
      const validImages = property.images
        .filter(img => typeof img === 'string' && img.trim() !== '' && img !== '/placeholder.jpg');
      if (validImages.length > 0) {
        return validImages;
      }
    }
    
    // If property has a single imageUrl, use it
    if (property.imageUrl && typeof property.imageUrl === 'string' && property.imageUrl.trim() !== '' && property.imageUrl !== '/placeholder.jpg') {
      return [property.imageUrl];
    }
    
    // Return placeholder only - no Unsplash images
    return ['/placeholder.jpg'];
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [propertyId]);

  useEffect(() => {
    if (property) {
      const images = getPropertyImages(property);
      // Ensure all images are valid strings
      const validImages = images.filter(img => typeof img === 'string' && img.trim() !== '');
      
      // Debug logging
      console.log(`Property ${property.listingID} images:`, {
        original: images,
        valid: validImages,
        property: {
          id: property.listingID,
          type: property.propertyType,
          city: property.city,
          state: property.state
        }
      });
      
      setPropertyImages(validImages);
      setCurrentImageIndex(0); // Reset to first image
      
      // Try to fetch additional images from IDXBroker API
      fetchPropertyImages();
    }
  }, [property]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const apiKey:any = getApiKey();
      
      // Use the new specific property endpoint
      const url = new URL('/api/idxbroker/property/' + propertyId, window.location.origin);
      url.searchParams.append('apiKey', apiKey);
      
      console.log('Fetching property details for ID:', propertyId);
      
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.data) {
          console.log('Property details received:', result.data);
          
          // Transform the data to match our interface
          const propertyData: IDXBrokerProperty = {
            listingID: result.data.listingID || propertyId,
            address: result.data.address || '',
            city: result.data.city || '',
            state: result.data.state || '',
            zipCode: result.data.zipCode || '',
            price: result.data.price || 0,
            bedrooms: result.data.bedrooms || 0,
            bathrooms: result.data.bathrooms || 0,
            squareFeet: result.data.squareFeet || 0,
            listingDate: result.data.listingDate || '',
            propertyType: result.data.propertyType || '',
            status: result.data.status || 'Active',
            imageUrl: result.data.imageUrl || '',
            images: result.data.images || [],
            description: result.data.description || '',
            yearBuilt: result.data.yearBuilt || 0,
            lotSize: result.data.lotSize || 0,
            garage: result.data.garage || 0,
            pool: result.data.pool || false,
            waterfront: result.data.waterfront || false
          };
          
          setProperty(propertyData);
        } else {
          setError(result.error || "Property not found");
        }
      } else {
        const errorResult = await response.json();
        setError(errorResult.error || "Failed to load property details");
      }
    } catch (err) {
      setError("Failed to load property details");
      console.error("Error fetching property details:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertyImages = async () => {
    try {
      const apiKey:any = getApiKey();
      const api = new IDXBrokerAPI(apiKey);
      
      const response = await api.getPropertyImages(propertyId);
      
      if (response.success && response.data && Array.isArray(response.data) && response.data.length > 0) {
        // Validate that all items are strings
        const validImages = response.data.filter(img => typeof img === 'string' && img.trim() !== '');
        if (validImages.length > 0) {
          setPropertyImages(validImages);
          setCurrentImageIndex(0);
        }
      }
    } catch (err) {
      console.error("Error fetching property images:", err);
      // Keep existing images if API call fails
    }
  };

  const nextImage = () => {
    if (propertyImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
    }
  };

  const prevImage = () => {
    if (propertyImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading property details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/idxbroker-integration">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Properties
              </Button>
            </Link>
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link href="/idxbroker-integration">
                <Button>View All Properties</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link href="/idxbroker-integration">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  {propertyImages.length > 0 ? (
                    <img
                      src={propertyImages[currentImageIndex] || "/placeholder.jpg"}
                      alt={property.address}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Home className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Image Navigation */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>

                  {/* Image Counter */}
                  {propertyImages.length > 0 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {propertyImages.length}
                    </div>
                  )}

                  {/* Status Badge */}
                  <Badge 
                    className={`absolute top-4 right-4 ${idxbrokerUtils.getStatusColor(property.status)} shadow-lg`}
                  >
                    {property.status}
                  </Badge>

                  {/* New listing indicator */}
                  {new Date(property.listingDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white shadow-lg">
                      New Listing
                    </Badge>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {propertyImages.length > 1 && (
                  <div className="p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {propertyImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex ? 'border-lime-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* Property Details */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Home className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Property Type</p>
                          <p className="font-semibold">{property.propertyType}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Square className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Square Feet</p>
                          <p className="font-semibold">{property.squareFeet.toLocaleString()} sq ft</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Listed Date</p>
                          <p className="font-semibold">{idxbrokerUtils.formatDate(property.listingDate)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {property.yearBuilt && (
                        <div className="flex items-center gap-3">
                          <Home className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Year Built</p>
                            <p className="font-semibold">{property.yearBuilt}</p>
                          </div>
                        </div>
                      )}

                      {property.lotSize && (
                        <div className="flex items-center gap-3">
                          <Square className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Lot Size</p>
                            <p className="font-semibold">{property.lotSize.toLocaleString()} sq ft</p>
                          </div>
                        </div>
                      )}

                      {property.garage && (
                        <div className="flex items-center gap-3">
                          <Car className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500">Garage</p>
                            <p className="font-semibold">{property.garage} car garage</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.pool && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Waves className="w-3 h-3" />
                          Pool
                        </Badge>
                      )}
                      {property.waterfront && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Waves className="w-3 h-3" />
                          Waterfront
                        </Badge>
                      )}
                      <Badge variant="secondary">
                        {property.bedrooms} Bedrooms
                      </Badge>
                      <Badge variant="secondary">
                        {property.bathrooms} Bathrooms
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  {property.description && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold mb-4">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{property.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Agent Information */}
            <div className="space-y-6">
              {/* Agent Information Card - Similar to Home Page */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center">
                    <Button 
                      className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-2 transition-all duration-200 shadow-sm hover:shadow-md mb-4"
                      onClick={() => {
                        // Navigate to contact page
                        window.location.href = `/contact`;
                      }}
                    >
                      Schedule a showing
                    </Button>
                    <img
                      src="/fabiola-patron-updated.jpg"
                      alt="Fabiola Patron"
                      className="w-full max-w-[200px] object-cover mt-3"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <h1 className="font-medium mt-3">Broker</h1>
                    <p className="font-medium mt-3">Phone Number: (323) 350-3137</p>
                  </div>
                </CardContent>
              </Card>

              {/* Property Summary - Moved from top */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {property.address}
                      </h1>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {property.city}, {property.state} {property.zipCode}
                      </p>
                    </div>

                    <div className="text-3xl font-bold text-green-600">
                      {idxbrokerUtils.formatPrice(property.price)}
                    </div>

                    <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Bed className="w-5 h-5 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-500">Bedrooms</p>
                        <p className="font-semibold">{property.bedrooms}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Bath className="w-5 h-5 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-500">Bathrooms</p>
                        <p className="font-semibold">{property.bathrooms}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Square className="w-5 h-5 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-500">Sq Ft</p>
                        <p className="font-semibold">{property.squareFeet.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full">
                        <Mail className="w-4 h-4 mr-2" />
                        Request Information
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Heart className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property ID */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Property Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listing ID:</span>
                      <span className="font-mono">{property.listingID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge variant="secondary">{property.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
