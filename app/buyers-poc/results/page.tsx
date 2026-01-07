"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, ArrowRight } from "lucide-react";
import IDXBrokerAPI, { IDXBrokerProperty, IDXBrokerResponse } from "@/lib/idxbroker-api";
import { getApiKey } from "@/lib/config";
import { idxbrokerUtils } from "@/lib/idxbroker-api";

function BuyersPOCResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState<IDXBrokerProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchResults();
  }, [searchParams]);

  const fetchResults = async () => {
    setLoading(true);
    setError("");

    try {
      const apiKey = getApiKey();
      if (!apiKey) {
        setError("API key not configured");
        setLoading(false);
        return;
      }

      const api = new IDXBrokerAPI(apiKey);
      
      const searchParams_obj: any = {
        limit: 20,
        offset: offset,
      };

      // Extract search parameters
      const location = searchParams.get("location");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const bedrooms = searchParams.get("bedrooms");
      const bathrooms = searchParams.get("bathrooms");
      const propertyType = searchParams.get("propertyType");

      if (location) {
        // Try to parse city/zip from location
        const parts = location.split(",").map((p) => p.trim());
        if (parts.length > 1) {
          searchParams_obj.city = parts[0];
          searchParams_obj.state = parts[1];
        } else {
          // Could be zip or city
          if (/^\d{5}$/.test(parts[0])) {
            searchParams_obj.zipCode = parts[0];
          } else {
            searchParams_obj.city = parts[0];
          }
        }
      }

      if (minPrice) searchParams_obj.minPrice = parseInt(minPrice);
      if (maxPrice) searchParams_obj.maxPrice = parseInt(maxPrice);
      // Only add bedrooms if it's not "any"
      if (bedrooms && bedrooms !== "any") searchParams_obj.bedrooms = parseInt(bedrooms);
      // Only add bathrooms if it's not "any"
      if (bathrooms && bathrooms !== "any") searchParams_obj.bathrooms = parseFloat(bathrooms);
      // Only add propertyType if it's not "any"
      if (propertyType && propertyType !== "any") searchParams_obj.propertyType = propertyType;

      const response = await api.searchProperties(searchParams_obj);

      if (response.success && response.data) {
        if (offset === 0) {
          setResults(response.data);
        } else {
          setResults((prev) => [...prev, ...response.data!]);
        }
        setHasMore(response.data.length === 20);
      } else {
        setError(response.error || "No properties found");
      }
    } catch (err) {
      setError("Failed to load properties");
      console.error("Error fetching results:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    // Fetch more results
    fetchResults();
  };

  const handleViewDetails = (property: IDXBrokerProperty) => {
    // Use mlsId + listingId if available, otherwise fallback to old format
    if (property.mlsId && property.listingID) {
      router.push(`/buyers-poc/listing/${encodeURIComponent(property.mlsId)}/${encodeURIComponent(property.listingID)}`);
    } else {
      // Fallback: if mlsId is missing, we can't construct the proper URL
      // Show error or try to extract mlsId from listingID
      console.warn('Property missing mlsId:', property);
      // For now, try to use listingID as both (this might not work but is better than nothing)
      router.push(`/buyers-poc/listing/${encodeURIComponent(property.listingID)}/${encodeURIComponent(property.listingID)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => router.push("/buyers-poc")}
              className="mb-6"
            >
              ← New Search
            </Button>
            <h1 className="text-4xl md:text-5xl font-grotesk font-bold text-gray-900 mb-6">
              Search Results
            </h1>
          </div>

            {loading && offset === 0 ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading properties...</p>
              </div>
            ) : error ? (
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardContent className="p-6 text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button 
                    onClick={() => router.push("/buyers-poc")}
                    className="bg-lime-500 hover:bg-lime-600 text-white"
                  >
                    Start New Search
                  </Button>
                </CardContent>
              </Card>
            ) : results.length === 0 ? (
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 mb-4">No properties found matching your criteria.</p>
                  <Button 
                    onClick={() => router.push("/buyers-poc")}
                    className="bg-lime-500 hover:bg-lime-600 text-white"
                  >
                    Start New Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {results.map((property) => (
                    <Card
                      key={property.listingID}
                      className="bg-white shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-all"
                      onClick={() => handleViewDetails(property)}
                    >
                      <div className="overflow-hidden">
                        <img
                          src={property.imageUrl || "/placeholder.jpg"}
                          alt={property.address}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.jpg";
                          }}
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-lime-600 mb-2">
                          {idxbrokerUtils.formatPrice(property.price)}
                        </div>
                        <div className="font-semibold text-gray-900 mb-1">
                          <MapPin className="w-4 h-4 inline mr-1 text-gray-600" />
                          {property.address}
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          {property.city}, {property.state} {property.zipCode}
                        </div>
                        <div className="flex gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            {property.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            {property.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Square className="w-4 h-4" />
                            {property.squareFeet.toLocaleString()} sq ft
                          </span>
                        </div>
                        <Button
                          className="w-full bg-lime-500 hover:bg-lime-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(property);
                          }}
                        >
                          View Details <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center mb-8">
                    <Button
                      onClick={loadMore}
                      variant="outline"
                      disabled={loading}
                      className="bg-white border-lime-300 text-lime-700 hover:bg-lime-50"
                    >
                      {loading ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export default function BuyersPOCResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search results...</p>
          </div>
        </div>
      </div>
    }>
      <BuyersPOCResultsContent />
    </Suspense>
  );
}

