"use client";

import { PropertyCarousel } from "@/components/property-carousel";

export default function IDXBrokerIntegrationPage() {

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Properties
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the newest properties available with our IDXBroker integration
            </p>
          </div>

          {/* Latest Properties Carousel */}
          <PropertyCarousel />
        </div>
      </div>
    </div>
  );
}
