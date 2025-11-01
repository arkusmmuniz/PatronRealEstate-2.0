"use client";

import { IDXBrokerWidget } from "@/components/idxbroker-widget";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Home } from "lucide-react";
import Link from "next/link";

export default function AltadenaPropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/communities">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Communities
            </Button>
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center text-2xl">
              🌲
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Altadena Properties
              </h1>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4" />
                Explore homes in Altadena
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 max-w-3xl">
            Discover exceptional properties in Altadena, nestled below the San Gabriel Mountains, 
            embracing cultural richness with diverse architecture and neighborly spirit.
          </p>
        </div>

        {/* Community Highlights Banner */}
        <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-lg p-6 mb-8 border-2 border-lime-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-lime-600 mb-1">$1,100,000</div>
              <div className="text-sm text-gray-600">Avg Home Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-lime-600 mb-1">43,000</div>
              <div className="text-sm text-gray-600">Residents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-lime-600 mb-1">🏡</div>
              <div className="text-sm text-gray-600">Historic Homes</div>
            </div>
          </div>
        </div>

        {/* IDX Broker Widget */}
        <div className="mb-12">
          <IDXBrokerWidget 
            widgetId="121636" 
            title="Available Properties in Altadena" 
          />
        </div>

        {/* Contact CTA */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-lime-200">
          <div className="text-center">
            <Home className="w-12 h-12 text-lime-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Find Your Home in Altadena?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contact Fabiola Patron for personalized guidance and expert assistance in finding 
              your perfect property in this culturally rich mountain community.
            </p>
            <Link href="/contact">
              <Button className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-3 text-lg">
                Contact Fabiola
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

