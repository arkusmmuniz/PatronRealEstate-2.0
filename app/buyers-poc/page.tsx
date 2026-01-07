"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Users,
  ArrowRight,
  Monitor,
  Users as UsersIcon,
  TreePine,
  Building2,
  DollarSign,
  Search,
} from "lucide-react";
import Link from "next/link";
import { SearchForm } from "@/components/buyers-poc/search-form";

export default function BuyersPOCPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-grotesk font-bold text-gray-900 mb-6">
            Are you ready to buy your
            <span className="block text-lime-500">home?</span>
          </h1>
        </div>

        {/* Intro Statement - Moved to Top */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardContent className="p-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                Watching a home buyer get those keys to their new home and light
                up is one of our favorite parts of the job! This is an exciting
                time but can also pose some challenges along the way if you
                don't have all the information you need to ensure you have
                covered all your possible options and risk factors.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Let us help you navigate the obstacles by providing you the
                proper guidance and a knowledge base with 20+ years of industry
                experience. We consider ourselves experts in the surrounding
                areas. Trust in us to help you build your knowledge and better
                position you to be able to take advantage of all your options
                available when buying your home.
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                If you have already begun the search for a home, we want to make
                sure you have answers to the questions that may come up along
                the way.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Here are some examples:
              </h3>

              <div className="space-y-6">
                {/* Location Questions */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-lime-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-lime-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Location & Geography
                    </h4>
                    <p className="text-gray-600">
                      Have you chosen at least three possible cities you want to
                      live in? Are there particular neighborhoods or communities
                      that you like? Sometimes you get outpriced in the city you
                      were primarily looking at and need to possibly expand your
                      geographical target area to neighboring cities.
                    </p>
                  </div>
                </div>

                {/* Property Style Questions */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-lime-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Building2 className="w-5 h-5 text-lime-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Property Style & Layout
                    </h4>
                    <p className="text-gray-600">
                      What kind of house styles are you interested in? Spanish,
                      Traditional, Craftsman, etc. How many bedrooms and
                      bathrooms do you want?
                    </p>
                  </div>
                </div>

                {/* Work from Home */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-lime-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Monitor className="w-5 h-5 text-lime-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Home Office & Flex Spaces
                    </h4>
                    <p className="text-gray-600">
                      Are you going to be working from home and need a home
                      office? Do you need a bonus room or a flex room?
                    </p>
                  </div>
                </div>

                {/* Entertainment */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-lime-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <UsersIcon className="w-5 h-5 text-lime-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Entertainment & Outdoor Living
                    </h4>
                    <p className="text-gray-600">
                      Will your home be entertaining guests often? Space for BBQ
                      or built-in BBQ.
                    </p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-lime-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TreePine className="w-5 h-5 text-lime-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Outdoor Amenities
                    </h4>
                    <p className="text-gray-600">
                      Do you want a yard, pool, or gated community?
                    </p>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border-2 border-lime-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <DollarSign className="w-5 h-5 text-lime-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Budget & Financing
                    </h4>
                    <p className="text-gray-600">
                      Based on all the above, have you determined a price range
                      or consulted a lender to determine the best price range
                      that is <strong>RIGHT FOR YOU!</strong>?
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8 mt-8">
                If you need additional or specific information on this topic,
                please{" "}
                <Link
                  href="/contact"
                  className="text-lime-600 hover:text-lime-700 underline font-medium"
                >
                  click here
                </Link>{" "}
                to get in contact with a Patron team member.
              </p>

              <div className="text-center p-6 border-2 border-lime-300 rounded-lg bg-white">
                <h3 className="text-xl font-bold text-lime-600 mb-2">
                  Let us help you find your dream home!
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Process Overview */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                Buying Process Overview
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-16 h-16 border-3 border-lime-400 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-sm">
                    <span className="text-2xl font-bold text-lime-600">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Initial Consultation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We'll discuss your needs, budget, and preferences to
                    understand your home buying goals.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-16 h-16 border-3 border-lime-400 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-sm">
                    <span className="text-2xl font-bold text-lime-600">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Property Search
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We'll help you find properties that match your criteria
                    using our MLS access and local expertise.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-16 h-16 border-3 border-lime-400 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-sm">
                    <span className="text-2xl font-bold text-lime-600">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Property Viewing
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Schedule viewings of properties you're interested in with
                    our professional guidance.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="text-center">
                  <div className="w-16 h-16 border-3 border-lime-400 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-sm">
                    <span className="text-2xl font-bold text-lime-600">4</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Offer & Negotiation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We'll help you make competitive offers and negotiate the
                    best terms for your purchase.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="text-center">
                  <div className="w-16 h-16 border-3 border-lime-400 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-sm">
                    <span className="text-2xl font-bold text-lime-600">5</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Due Diligence
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We'll guide you through inspections, appraisals, and other
                    necessary steps.
                  </p>
                </div>

                {/* Step 6 */}
                <div className="text-center">
                  <div className="w-16 h-16 border-3 border-lime-400 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-sm">
                    <span className="text-2xl font-bold text-lime-600">6</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Closing</h4>
                  <p className="text-gray-600 text-sm">
                    We'll ensure a smooth closing process and help you get the
                    keys to your new home.
                  </p>
                </div>
              </div>

              <div className="text-center mt-8 p-6 border-2 border-lime-300 rounded-lg bg-white">
                <h4 className="text-lg font-bold text-lime-600 mb-2">
                  Ready to Start?
                </h4>
                <p className="text-gray-600 mb-4">
                  Let us guide you through every step of the home buying process
                  with our 20+ years of experience.
                </p>
                <Button
                  className="bg-lime-600 hover:bg-lime-700 text-white"
                  asChild
                >
                  <Link href="/contact">
                    <Users className="w-4 h-4 mr-2" />
                    Contact Us Today
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Search Section - Buyers POC Search Form */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="bg-white shadow-xl border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Search className="w-8 h-8 text-lime-600" />
                Search Properties
              </CardTitle>
              <p className="text-gray-600">
                Connected to MLS - Find your perfect home with our advanced
                search tools
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <SearchForm />
            </CardContent>
          </Card>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-white shadow-xl border-2 border-lime-300">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Ready to Start Your Home Buying Journey?
                </h3>
                <p className="text-lg text-gray-600">
                  Contact us today to get personalized guidance and expert
                  assistance
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Why Choose Patron Real Estate?
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-lime-600" />
                      20+ years of industry experience
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-lime-600" />
                      Expert knowledge of local markets
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-lime-600" />
                      Personalized guidance throughout the process
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-lime-600" />
                      Access to exclusive MLS listings
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-lime-500 hover:bg-lime-600 text-white"
                    asChild
                  >
                    <Link href="/contact">
                      <Users className="w-5 h-5 mr-2" />
                      Contact Our Team
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
