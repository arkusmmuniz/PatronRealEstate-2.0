"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { IDX_ADVANCED_SEARCH_URL } from "@/lib/constants";

interface AdvancedSearchButtonProps {
  size?: "default" | "lg";
  className?: string;
}

/**
 * Reusable button component for Advanced Property Search
 * Opens IDX Broker advanced search in a new tab
 */
export function AdvancedSearchButton({
  size = "default",
  className = "",
}: AdvancedSearchButtonProps) {
  const baseClasses =
    size === "lg"
      ? "bg-lime-500 hover:bg-lime-600 text-white"
      : "bg-lime-600 hover:bg-lime-700 text-white";

  return (
    <Button size={size} className={`${baseClasses} ${className}`} asChild>
      <Link
        href={IDX_ADVANCED_SEARCH_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Advanced Property Search in a new tab"
      >
        <Search className={size === "lg" ? "w-5 h-5 mr-2" : "w-4 h-4 mr-2"} />
        Advanced Property Search
      </Link>
    </Button>
  );
}

