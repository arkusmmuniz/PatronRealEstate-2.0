"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Home, MapPin, Calendar, Loader2, ExternalLink } from "lucide-react";
import IDXBrokerAPI, { IDXBrokerProperty, IDXBrokerResponse } from "@/lib/idxbroker-api";
import { idxbrokerUtils } from "@/lib/idxbroker-api";
import { getApiKey, IDXBROKER_CONFIG } from "@/lib/config";

interface PropertyCarouselProps {}

// Component for property image with loading state
function PropertyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      )}
      {imageError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <Home className="w-12 h-12 text-gray-400" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
          }}
        />
      )}
    </div>
  );
}

export function PropertyCarousel({}: PropertyCarouselProps) {
  const [properties, setProperties] = useState<IDXBrokerProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLatestProperties();
  }, []);

  const fetchLatestProperties = async () => {
    setLoading(true);
    setError("");

    try {
      const apiKey = getApiKey();
      const api = new IDXBrokerAPI(apiKey);
      const response: IDXBrokerResponse = await api.searchProperties({
        limit: 20
      });

      if (response.success && response.data) {
        // Sort by listing date (newest first) and take the first 20
        const sortedProperties = response.data
          .sort((a, b) => new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime())
          .slice(0, 20);
        setProperties(sortedProperties);
      } else {
        setError(response.error || "Failed to fetch latest properties");
      }
    } catch (err) {
      setError("Failed to fetch latest properties");
      console.error("Error fetching latest properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    const maxIndex = Math.max(0, properties.length - 4);
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, properties.length - 4);
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Function to generate internal property details URL
  const getPropertyDetailsURL = (property: IDXBrokerProperty) => {
    return `/idxbroker-integration/property/${property.listingID}`;
  };

  const handlePropertyClick = (property: IDXBrokerProperty) => {
    const detailsURL = getPropertyDetailsURL(property);
    window.open(detailsURL, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading latest properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchLatestProperties} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No properties found</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Latest Properties</h3>
          <p className="text-gray-600">Discover the newest properties available nationwide</p>
          <p className="text-sm text-gray-500 mt-1">Click on any property to view detailed information</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / Math.min(4, properties.length))}%)` }}
        >
          {properties.map((property, index) => (
            <div key={property.listingID} className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-2">
              <Card 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => handlePropertyClick(property)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <PropertyImage
                    src={property.imageUrl || "/placeholder.jpg"}
                    alt={property.address}
                    className="w-full h-full"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${idxbrokerUtils.getStatusColor(property.status)} shadow-lg`}
                  >
                    {property.status}
                  </Badge>
                  
                  {/* New listing indicator */}
                  {new Date(property.listingDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white shadow-lg">
                      New
                    </Badge>
                  )}
                  
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* External link indicator */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <ExternalLink className="w-4 h-4 text-gray-700" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 line-clamp-1">
                        {property.address}
                      </h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {property.city}, {property.state} {property.zipCode}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        {idxbrokerUtils.formatPrice(property.price)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {property.squareFeet.toLocaleString()} sq ft
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      <span>{property.propertyType}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      Listed: {idxbrokerUtils.formatDate(property.listingDate)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.max(1, properties.length - 3) }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-lime-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Property Counter */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Showing {Math.min(4, properties.length)} of {properties.length} latest properties
        </p>
      </div>
    </div>
  );
}
