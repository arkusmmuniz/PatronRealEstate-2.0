"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { X, Star, Home, Clock, MapPin, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, Suspense } from "react";

// Datos de propiedades simuladas más detallados
const generateDetailedProperties = (collectionId: string, count: number) => {
  const baseImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  const locations = [
    "Beverly Hills, CA", "Malibu, CA", "Santa Monica, CA", "Manhattan Beach, CA",
    "Pasadena, CA", "Glendale, CA", "Burbank, CA", "West Hollywood, CA",
    "Hermosa Beach, CA", "Redondo Beach, CA", "Torrance, CA", "Culver City, CA"
  ];

  const prices = {
    "new-this-week": ["$850,000", "$1,200,000", "$950,000", "$1,100,000", "$780,000", "$1,350,000", "$920,000", "$1,080,000"],
    "reduced-prices": ["$650,000", "$890,000", "$720,000", "$1,050,000", "$680,000", "$980,000", "$750,000", "$920,000"],
    "coastal-living": ["$1,800,000", "$2,300,000", "$1,500,000", "$2,800,000", "$1,600,000", "$2,100,000", "$1,750,000", "$2,500,000"]
  };

  const bedCounts = [3, 4, 2, 5, 3, 4, 2, 3, 4, 5, 3, 4];
  const bathCounts = [2, 3, 2, 3, 2, 3, 2, 2, 3, 4, 2, 3];
  const sqftValues = [1850, 2200, 1650, 2800, 1950, 2400, 1750, 2100, 2300, 3200, 1800, 2500];
  const daysOnMarket = [5, 12, 8, 15, 3, 20, 7, 10, 18, 25, 6, 14];
  const views = [120, 340, 89, 567, 45, 234, 78, 156, 289, 445, 67, 198];

  return Array.from({ length: count }, (_, i) => ({
    id: `${collectionId}-${i}`,
    image: baseImages[i % baseImages.length] || baseImages[0],
    price: prices[collectionId as keyof typeof prices]?.[i % 8] || "$800,000",
    location: locations[i % locations.length],
    beds: bedCounts[i % bedCounts.length],
    baths: bathCounts[i % bathCounts.length],
    sqft: sqftValues[i % sqftValues.length],
    daysOnMarket: daysOnMarket[i % daysOnMarket.length],
    views: views[i % views.length],
    mlsId: `MLS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    yearBuilt: Math.floor(Math.random() * 40) + 1980,
    lotSize: Math.floor(Math.random() * 8000) + 5000
  }));
};

const collections = [
  {
    id: "new-this-week",
    title: "New This Week",
    subtitle: "Fresh listings hitting the market this week.",
    description: "Discover the latest properties that have just entered the market. These homes represent the newest opportunities in the current real estate landscape.",
    properties: generateDetailedProperties("new-this-week", 12)
  },
  {
    id: "reduced-prices",
    title: "Reduced Prices",
    subtitle: "Smart deals and new chances to save big.",
    description: "Properties with recently reduced prices offer excellent value opportunities. These homes present smart investment choices and potential savings.",
    properties: generateDetailedProperties("reduced-prices", 12)
  },
  {
    id: "coastal-living",
    title: "Coastal Living",
    subtitle: "Wake up to ocean views — explore coastal properties.",
    description: "Experience the ultimate California lifestyle with these stunning coastal properties. From beachfront homes to ocean-view estates.",
    properties: generateDetailedProperties("coastal-living", 12)
  }
];

function CollectionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get('filter');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredCollections = activeFilter 
    ? collections.filter(collection => collection.id === activeFilter)
    : collections;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="flex-1 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-grotesk font-bold text-gray-900 mb-4">
              Property <span className="bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent">Collections</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our carefully curated property collections. Each collection is designed to help you find the perfect home that matches your lifestyle and investment goals.
            </p>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={!activeFilter ? "default" : "outline"}
              onClick={() => router.push('/collections')}
              className={!activeFilter ? "bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white" : ""}
            >
              All Collections
            </Button>
            {collections.map((collection) => (
              <Button
                key={collection.id}
                variant={activeFilter === collection.id ? "default" : "outline"}
                onClick={() => router.push(`/collections?filter=${collection.id}`)}
                className={activeFilter === collection.id ? "bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white" : ""}
              >
                {collection.title}
              </Button>
            ))}
          </div>

          {/* Active Filter Badge */}
          {activeFilter && (
            <div className="flex justify-center mb-8">
              <Badge 
                variant="secondary" 
                className="bg-lime-100 text-lime-800 border-lime-200 px-4 py-2 text-sm"
              >
                Showing: {collections.find(c => c.id === activeFilter)?.title || activeFilter}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0 text-lime-600 hover:text-lime-800"
                  onClick={() => router.push('/collections')}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            </div>
          )}
        </div>
      </section>

      {/* Collections Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredCollections.map((collection) => (
            <div key={collection.id} className="mb-16">
              {/* Collection Header */}
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-grotesk font-bold text-gray-900 mb-4">
                  {collection.title}
                </h2>
                <p className="text-base text-gray-600 mb-4 max-w-2xl mx-auto">
                  {collection.subtitle}
                </p>
                <p className="text-sm text-gray-500 max-w-3xl mx-auto">
                  {collection.description}
                </p>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {collection.properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.location}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-sm font-semibold text-gray-900">{property.price}</span>
                      </div>
                      <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {property.mlsId}
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 truncate">
                        {property.location}
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Home className="w-4 h-4" />
                          <span>{property.beds} bed, {property.baths} bath</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{property.sqft.toLocaleString()} sqft</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{property.daysOnMarket} days on market</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{property.views} views</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-400 mb-4">
                        Built: {property.yearBuilt} • Lot: {property.lotSize.toLocaleString()} sqft
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white"
                        onClick={() => router.push(`/property/${property.id}`)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Collection Stats */}
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{collection.properties.length}</div>
                    <div className="text-sm text-gray-600">Properties</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${Math.round(collection.properties.reduce((acc, prop) => 
                        acc + parseInt(prop.price.replace(/[$,]/g, '')), 0) / collection.properties.length).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Avg Price</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(collection.properties.reduce((acc, prop) => acc + prop.daysOnMarket, 0) / collection.properties.length)}
                    </div>
                    <div className="text-sm text-gray-600">Avg Days on Market</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(collection.properties.reduce((acc, prop) => acc + prop.sqft, 0) / collection.properties.length).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Avg Sqft</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 pt-20 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading collections...</p>
        </div>
      </div>
    }>
      <CollectionsContent />
    </Suspense>
  );
}
