"use client";

import { VideoCard } from "@/components/video-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Play, Star, Eye, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { videoData, categories } from "@/lib/video-data";

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleVideos, setVisibleVideos] = useState(6);

  // Filter and sort videos
  const filteredVideos = videoData.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      video.category.toLowerCase().replace(" ", "-") === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured video
  const featuredVideo = filteredVideos.find((video) => video.featured);

  // Sort filtered videos
  const sortedVideos = filteredVideos.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "popular":
        return b.views - a.views;
      case "rating":
        return b.rating - a.rating;
      case "duration":
        return (
          parseFloat(a.duration.replace(":", ".")) -
          parseFloat(b.duration.replace(":", "."))
        );
      default:
        return 0;
    }
  });

  // Get videos to show (excluding featured)
  const videosToShow = sortedVideos
    .filter((video) => !video.featured)
    .slice(0, visibleVideos);

  // Load more videos
  const loadMoreVideos = () => {
    setVisibleVideos((prev) =>
      Math.min(prev + 3, sortedVideos.filter((video) => !video.featured).length)
    );
  };

  // Check if there are more videos to load
  const hasMoreVideos =
    visibleVideos < sortedVideos.filter((video) => !video.featured).length;

  return (
    <main className="flex-1 pt-20">
      {/* Hero Section */}
      <section className="relative bg-white py-8 md:py-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-white to-lime-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-5 left-5 w-20 h-20 bg-lime-200 rounded-full opacity-20"></div>
          <div className="absolute top-20 right-10 w-16 h-16 bg-lime-300 rounded-full opacity-15"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-lime-100 rounded-full opacity-25"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                <span className="text-gray-900">Fab</span><span className="text-lime-600">Friday</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
                Discover properties, expert tips, and market analysis through
                our
                <span className="text-lime-600 font-semibold">
                  {" "}
                  curated video content
                </span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-lime-600" />
                  <span>+100 videos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-lime-600" />
                  <span>+50k views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-lime-600" />
                  <span>4.8/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search videos..."
                  className="pl-10 border-2 border-gray-200 focus:border-lime-500 focus:ring-lime-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48 border-2 border-gray-200 focus:border-lime-500 focus:ring-lime-500">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="property-tours">Property Tours</SelectItem>
                  <SelectItem value="selling-tips">Selling Tips</SelectItem>
                  <SelectItem value="market-analysis">
                    Market Analysis
                  </SelectItem>
                  <SelectItem value="buying-tips">Buying Tips</SelectItem>
                  <SelectItem value="home-care">Home Care</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="neighborhoods">Neighborhoods</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="financing">Financing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-2 border-gray-200 focus:border-lime-500 focus:ring-lime-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      {featuredVideo && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Video
            </h2>
            <VideoCard {...featuredVideo} featured={true} />
          </div>
        </section>
      )}

      {/* Regular Videos */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Recent Videos{" "}
            {videosToShow.length > 0 &&
              `(${videosToShow.length} of ${
                sortedVideos.filter((video) => !video.featured).length
              })`}
          </h2>

          {videosToShow.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videosToShow.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-2 border-lime-300 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-lime-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                No videos found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button
                className="border-2 border-lime-300 text-lime-600 hover:bg-lime-50"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSortBy("newest");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Load More */}
      {hasMoreVideos && (
        <section className="py-8 text-center">
          <Button
            className="border-2 border-lime-300 text-lime-600 hover:bg-lime-50 bg-white"
            size="lg"
            onClick={loadMoreVideos}
          >
            Load More Videos (+3)
          </Button>
        </section>
      )}
    </main>
  );
}
