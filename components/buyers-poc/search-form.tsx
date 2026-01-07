"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchForm() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<"standard" | "mls">("standard");
  const [formData, setFormData] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "any",
    bathrooms: "any",
    propertyType: "any",
    mlsNumber: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStandardSearch = () => {
    const params = new URLSearchParams();
    
    if (formData.location) params.append("location", formData.location);
    if (formData.minPrice) params.append("minPrice", formData.minPrice);
    if (formData.maxPrice) params.append("maxPrice", formData.maxPrice);
    // Only add bedrooms if it's not "any"
    if (formData.bedrooms && formData.bedrooms !== "any") params.append("bedrooms", formData.bedrooms);
    // Only add bathrooms if it's not "any"
    if (formData.bathrooms && formData.bathrooms !== "any") params.append("bathrooms", formData.bathrooms);
    // Only add propertyType if it's not "any"
    if (formData.propertyType && formData.propertyType !== "any") params.append("propertyType", formData.propertyType);

    router.push(`/buyers-poc/results?${params.toString()}`);
  };

  const parseMLSInput = (input: string): { mlsId: string | null; listingId: string | null } => {
    const trimmed = input.trim();
    
    // Try to parse formats like "e025/25629321" or "e025-25629321" or "e025 25629321"
    const separators = ['/', '-', ' '];
    for (const sep of separators) {
      const parts = trimmed.split(sep);
      if (parts.length === 2) {
        const mlsId = parts[0].trim();
        const listingId = parts[1].trim();
        if (mlsId && listingId) {
          return { mlsId, listingId };
        }
      }
    }
    
    // If no separator found, treat entire input as listingId
    // User will need to provide mlsId separately or we'll show an error
    return { mlsId: null, listingId: trimmed || null };
  };

  const handleMLSSearch = async () => {
    const parsed = parseMLSInput(formData.mlsNumber);
    
    if (!parsed.listingId) {
      // Show error - need at least listingId
      alert('Please enter a valid Listing ID');
      return;
    }
    
    if (!parsed.mlsId) {
      // If only listingId is provided, show a helpful message with options
      // Most common MLS IDs for testing - try the most common one first
      const commonMlsIds = ['e025', 'e026', 'e027', 'e028'];
      
      // Try the most common MLS ID (e025) as a fallback
      // This is a reasonable assumption based on the example provided
      const tryCommonMlsId = confirm(
        `You entered only the Listing ID: ${parsed.listingId}\n\n` +
        `We need both MLS ID and Listing ID to view the property.\n\n` +
        `Would you like to try with the most common MLS ID (e025)?\n\n` +
        `If this doesn't work, you can:\n` +
        `• Use Standard Search to find the property\n` +
        `• Enter the full format: mlsId/listingId (e.g., e025/${parsed.listingId})`
      );
      
      if (tryCommonMlsId) {
        // Try with the most common MLS ID
        router.push(`/buyers-poc/listing/${encodeURIComponent('e025')}/${encodeURIComponent(parsed.listingId)}?source=mls-search`);
        return;
      } else {
        // User declined - redirect to standard search
        router.push('/buyers-poc/results');
        return;
      }
    }
    
    // Navigate to listing page with mlsId and listingId
    router.push(`/buyers-poc/listing/${encodeURIComponent(parsed.mlsId)}/${encodeURIComponent(parsed.listingId)}?source=mls-search`);
  };

  return (
    <div className="space-y-6">
        <div className="space-y-6">
          {/* Search Type Toggle - Segmented Control Style */}
          <div className="flex gap-0 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              className={`flex-1 px-4 py-2.5 rounded-md font-medium transition-all border-none ${
                searchType === "standard"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "bg-transparent text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setSearchType("standard")}
            >
              Standard Search
            </button>
            <button
              type="button"
              className={`flex-1 px-4 py-2.5 rounded-md font-medium transition-all border-none ${
                searchType === "mls"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "bg-transparent text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setSearchType("mls")}
            >
              Search by MLS #
            </button>
          </div>

          {searchType === "standard" ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Location (City/ZIP)</Label>
                <Input
                  id="location"
                  placeholder="e.g., Los Angeles, CA or 90001"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minPrice">Min Price</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    placeholder="Min"
                    value={formData.minPrice}
                    onChange={(e) => handleInputChange("minPrice", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="maxPrice">Max Price</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="Max"
                    value={formData.maxPrice}
                    onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select
                    value={formData.bedrooms}
                    onValueChange={(value) => handleInputChange("bedrooms", value)}
                  >
                    <SelectTrigger id="bedrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select
                    value={formData.bathrooms}
                    onValueChange={(value) => handleInputChange("bathrooms", value)}
                  >
                    <SelectTrigger id="bathrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => handleInputChange("propertyType", value)}
                >
                  <SelectTrigger id="propertyType">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                    <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleStandardSearch}
                className="w-full bg-lime-500 hover:bg-lime-600 text-white"
              >
                Search
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="mlsNumber">MLS ID / Listing ID</Label>
                <Input
                  id="mlsNumber"
                  placeholder="e.g., e025/25629321 or e025-25629321"
                  value={formData.mlsNumber}
                  onChange={(e) => handleInputChange("mlsNumber", e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && formData.mlsNumber.trim()) {
                      handleMLSSearch();
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter both MLS ID and Listing ID separated by "/" or "-" (e.g., e025/25629321). 
                  <br />
                  <span className="text-gray-400">If you only have the Listing ID, use Standard Search to find the property first.</span>
                </p>
              </div>
              <Button
                onClick={handleMLSSearch}
                className="w-full bg-lime-500 hover:bg-lime-600 text-white"
                disabled={!formData.mlsNumber.trim()}
              >
                Search by MLS #
              </Button>
            </div>
          )}
        </div>
    </div>
  );
}

