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

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const [property, setProperty] = useState<IDXBrokerProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock additional images for the gallery
  const mockImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];

  useEffect(() => {
    fetchPropertyDetails();
  }, [propertyId]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    setError("");

    try {
      const apiKey = getApiKey();
      const api = new IDXBrokerAPI(apiKey);
      
      // First try to get the specific property
      const response: IDXBrokerResponse = await api.getPropertyDetails(propertyId);
      
      if (response.success && response.data && response.data.length > 0) {
        setProperty(response.data[0]);
      } else {
        // If not found, search all properties to find the one with matching ID
        const searchResponse: IDXBrokerResponse = await api.searchProperties({ limit: 50 });
        
        if (searchResponse.success && searchResponse.data) {
          const foundProperty = searchResponse.data.find(p => p.listingID === propertyId);
          if (foundProperty) {
            setProperty(foundProperty);
          } else {
            setError("Property not found");
          }
        } else {
          setError("Failed to load property details");
        }
      }
    } catch (err) {
      setError("Failed to load property details");
      console.error("Error fetching property details:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mockImages.length) % mockImages.length);
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
                  <img
                    src={mockImages[currentImageIndex]}
                    alt={property.address}
                    className="w-full h-full object-cover"
                  />
                  
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
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {mockImages.length}
                  </div>

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
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {mockImages.map((image, index) => (
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

            {/* Right Column - Property Info and Contact */}
            <div className="space-y-6">
              {/* Property Summary */}
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
                      <Button className="w-full bg-lime-600 hover:bg-lime-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Schedule Viewing
                      </Button>
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

              {/* Agent Contact */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="/fabiola-patron.jpg"
                      alt="Fabiola Patron"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">Fabiola Patron</h4>
                      <p className="text-sm text-gray-600">Real Estate Agent</p>
                      <p className="text-sm text-gray-600">Patron Real Estate</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Agent
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Agent
                    </Button>
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
