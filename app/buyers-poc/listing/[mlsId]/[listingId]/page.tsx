"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrokerCard } from "@/components/buyers-poc/broker-card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import "./listing-detail.css";

// IDX Broker domain - should match your IDX Broker account
const IDX_BROKER_DOMAIN = "patronrealestateservices.idxbroker.com";

function BuyersPOCListingContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mlsId = params.mlsId as string;
  const listingId = params.listingId as string;
  const source = searchParams.get('source'); // 'mls-search' if came from MLS search, null if from results
  const [idxUrl, setIdxUrl] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Validate that we have both mlsId and listingId
    if (!mlsId || !listingId) {
      const missing = [];
      if (!mlsId) missing.push("mlsId");
      if (!listingId) missing.push("listingId");
      setError(`Missing required parameters: ${missing.join(", ")}`);
      
      // Log in dev mode
      if (process.env.NODE_ENV === 'development') {
        console.error('Missing parameters:', { mlsId, listingId, missing });
      }
      return;
    }

    // Decode URL parameters
    const decodedMlsId = decodeURIComponent(mlsId);
    const decodedListingId = decodeURIComponent(listingId);

    // Log in dev mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Property detail page:', { mlsId: decodedMlsId, listingId: decodedListingId });
    }

    // Construct IDX Broker detail URL
    // Try to use embed mode or parameters to minimize header duplication
    // Note: IDX Broker may not support hiding header via URL params, but we try widgetReferer
    const url = `https://${IDX_BROKER_DOMAIN}/idx/details/listing/${decodedMlsId}/${decodedListingId}?widgetReferer=true&hideHeader=true`;
    setIdxUrl(url);

    // Log in dev mode
    if (process.env.NODE_ENV === 'development') {
      console.log('IDX Broker URL constructed:', url);
    }
  }, [mlsId, listingId]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <Card className="bg-white shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Missing Required Information</h2>
                  <p className="text-gray-600 mb-2">{error}</p>
                  <p className="text-sm text-gray-500 mb-6">
                    Please ensure both MLS ID and Listing ID are provided to view property details.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={() => router.push("/buyers-poc")}
                      className="bg-lime-500 hover:bg-lime-600 text-white"
                    >
                      Back to Search
                    </Button>
                    {source !== 'mls-search' && (
                      <Button 
                        variant="outline"
                        onClick={() => router.push("/buyers-poc/results")}
                      >
                        Back to Results
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 buyers-poc-listing-detail-container">
      <div className="w-full px-4 py-8">
        <div className="w-full max-w-[1920px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            {source === 'mls-search' ? (
              <Link href="/buyers-poc">
                <Button variant="outline" className="mb-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Search
                </Button>
              </Link>
            ) : (
              <Link href="/buyers-poc/results">
                <Button variant="outline" className="mb-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Results
                </Button>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - IDX Broker iframe */}
            <div className="lg:col-span-2 space-y-6 buyers-poc-listing-main">
              {/* IDX Broker iframe - Full width, allow page scroll */}
              <div className="w-full bg-white shadow-lg border border-gray-200 rounded-lg overflow-visible">
                {idxUrl ? (
                  <div className="idx-broker-iframe-container">
                    <iframe
                      src={idxUrl}
                      className="w-full border-0 idx-broker-iframe"
                      style={{ 
                        minHeight: '2000px',
                        height: 'auto',
                        display: 'block',
                        width: '100%',
                        maxWidth: '100%',
                        overflow: 'visible'
                      }}
                      title="Property Details"
                      allow="fullscreen"
                      loading="lazy"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center" style={{ minHeight: '800px' }}>
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading property details...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Open in new tab button */}
              {idxUrl && (
                <Card className="bg-white shadow-lg border border-gray-200">
                  <CardContent className="p-4">
                    <Button
                      onClick={() => window.open(idxUrl, '_blank', 'noopener,noreferrer')}
                      className="w-full bg-lime-500 hover:bg-lime-600 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Listing Details in New Tab
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sticky Broker Card */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <BrokerCard />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default function BuyersPOCListingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property details...</p>
          </div>
        </div>
      </div>
    }>
      <BuyersPOCListingContent />
    </Suspense>
  );
}

