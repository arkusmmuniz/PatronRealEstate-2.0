"use client";

import { IDXBrokerWidget } from "@/components/idxbroker-widget";

export default function IDXBrokerIntegrationPage() {

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              IDXBroker Integration
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover properties and virtual showings with our IDXBroker integration
            </p>
          </div>

          {/* IDXBroker Widget Section */}
          <div className="mb-12">
            <IDXBrokerWidget 
              widgetId="121096" 
              title="Featured Properties from IDXBroker" 
            />
          </div>

          {/* Virtual Showing Section */}
          <div className="mt-12">
            <IDXBrokerWidget 
              widgetId="121097" 
              title="Virtual Showing" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
