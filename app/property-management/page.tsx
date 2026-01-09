"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Building2,
  Home,
  Users,
  MapPin,
  Search,
  Phone,
  Shield,
  Wrench,
  FileText,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

// IDX Broker Rental Search URLs - filtered for rentals only (Residential Lease)
const IDX_RENTALS_URL_EN = "https://patronrealestateservices.idxbroker.com/idx/search/advanced?pt=Residential%20Lease";
const IDX_RENTALS_URL_ES = "https://patronrealestateservices.idxbroker.com/idx/search/advanced?pt=Residential%20Lease";

export default function PropertyManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-grotesk font-bold text-gray-900 mb-4">
            Property
            <span className="block text-lime-500">Management</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Professional property management services for landlords and property
            investors, plus rental search tools for tenants.
          </p>
        </div>

        {/* For Renters Section */}
        <div className="mb-16">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Home className="w-6 h-6 text-lime-600" />
                Looking for a Rental?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Search available rental properties in your area using our
                comprehensive MLS database. Find your perfect home with detailed
                listings and professional assistance.
              </p>

              {/* IDX Broker Rental Search Integration */}
              <div className="mb-6">
                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      window.open(IDX_RENTALS_URL_EN, "_blank", "noopener,noreferrer");
                    }}
                    className="w-full md:w-auto px-8 py-6 text-lg bg-lime-600 hover:bg-lime-700"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Available Rentals
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* For Property Owners Section */}
        <div className="mb-16">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Building2 className="w-6 h-6 text-lime-600" />
                Property Management Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Let us handle the day-to-day management of your rental
                properties so you can focus on growing your investment
                portfolio. Our comprehensive services cover everything from
                tenant screening to maintenance coordination.
              </p>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Tenant Screening</h4>
                    <p className="text-sm text-gray-600">
                      Comprehensive background checks, credit reports, and
                      rental history verification.
                    </p>
                  </div>
                </div>


                <div className="flex items-start gap-3">
                  <Wrench className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Maintenance</h4>
                    <p className="text-sm text-gray-600">
                      24/7 emergency maintenance response and regular property
                      inspections.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Tenant Relations</h4>
                    <p className="text-sm text-gray-600">
                      Professional tenant communication, lease renewals, and
                      conflict resolution.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Legal Compliance</h4>
                    <p className="text-sm text-gray-600">
                      Stay compliant with all local, state, and federal rental
                      property regulations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Market Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Regular market analysis to ensure competitive rental rates
                      and maximize income.
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="border-2 border-lime-300 p-6 rounded-lg mb-6 bg-white">
                <h4 className="font-semibold text-lime-800 mb-3">
                  Why Choose Our Property Management Services?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lime-600" />
                    <span className="text-sm text-gray-700">
                      Local market expertise
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lime-600" />
                    <span className="text-sm text-gray-700">
                      24/7 tenant support
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lime-600" />
                    <span className="text-sm text-gray-700">
                      Transparent reporting
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="bg-white shadow-xl border-2 border-lime-300">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Ready to Get Started?
                </h3>
                <p className="text-lg mb-6 text-gray-600">
                  Whether you're looking for a rental property or need
                  professional property management services, we're here to help.
                  Contact us to discuss your specific needs.
                </p>
              </div>
              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-lime-500 hover:bg-lime-600 text-white"
                  asChild
                >
                  <Link href="/contact">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
