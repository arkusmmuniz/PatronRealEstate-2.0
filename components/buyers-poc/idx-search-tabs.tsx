"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Hash, Map } from "lucide-react";
import "@/app/buying/idx-search.css";

const IDX_BROKER_DOMAIN = "patronrealestateservices.idxbroker.com";

const searchTabs = [
  {
    id: "advanced",
    label: "Advanced Search",
    icon: Search,
    url: `https://${IDX_BROKER_DOMAIN}/idx/search/advanced`,
    description: "Search by multiple criteria including price, bedrooms, bathrooms, and more"
  },
  {
    id: "listingid",
    label: "Listing ID",
    icon: Hash,
    url: `https://${IDX_BROKER_DOMAIN}/idx/search/listingid`,
    description: "Search by MLS numbers (up to 25 listings at once)"
  },
  {
    id: "address",
    label: "Address",
    icon: MapPin,
    url: `https://${IDX_BROKER_DOMAIN}/idx/search/address`,
    description: "Search by property address, city, or postal code"
  },
  {
    id: "map",
    label: "Map Search",
    icon: Map,
    url: `https://${IDX_BROKER_DOMAIN}/idx/map/mapsearch`,
    description: "Explore properties on an interactive map"
  }
];

export function IDXSearchTabs() {
  const [activeTab, setActiveTab] = useState("advanced");

  const activeTabData = searchTabs.find(tab => tab.id === activeTab);

  return (
    <Card className="bg-white shadow-xl border border-gray-200">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Search className="w-8 h-8 text-lime-600" />
          Search Properties
        </CardTitle>
        <p className="text-gray-600">
          Find your perfect home with our comprehensive search tools
        </p>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex flex-wrap gap-2 -mb-px">
            {searchTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors
                    border-b-2 -mb-px
                    ${
                      isActive
                        ? "border-lime-600 text-lime-600 bg-lime-50"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Description */}
        {activeTabData && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">{activeTabData.description}</p>
          </div>
        )}

        {/* Iframe Container */}
        <div 
          className="relative w-full idx-search-iframe-container" 
          style={{ 
            minHeight: "800px", 
            height: "calc(100vh - 400px)",
            maxHeight: "1200px"
          }}
        >
          {activeTabData && (
            <iframe
              src={activeTabData.url}
              className="w-full h-full border-0 idx-search-iframe"
              title={`IDX Broker ${activeTabData.label}`}
              allow="fullscreen"
              loading="lazy"
              style={{
                minHeight: "800px",
                display: "block",
                width: "100%",
                maxWidth: "100%"
              }}
            />
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Data services provided by IDX Broker
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
