"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IDX_ADVANCED_SEARCH_URL } from "@/lib/constants";

/**
 * Sticky CTA Card Component for Buying Page
 * 
 * Displays a call-to-action card that remains visible while scrolling on desktop.
 * Opens IDX Broker advanced search in a new tab.
 */
export function StickyCtaCard() {
  return (
    <aside
      className="lg:sticky lg:top-32 lg:self-start"
      aria-label="Property search call to action"
    >
      <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your dream home is a click away!
          </h2>
          <p className="text-gray-600 mb-6">
            Search smarter, faster, and with guidance you can trust.
          </p>
          <Button
            className="w-full bg-lime-600 hover:bg-lime-700 text-white focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2"
            size="lg"
            asChild
          >
            <Link
              href={IDX_ADVANCED_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start your dream home search in a new tab"
            >
              Start Your Dream Home Search
            </Link>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}

