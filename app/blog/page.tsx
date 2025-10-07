"use client";

import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

// Blog posts data
const blogPosts = [
  {
    id: "1",
    title: "🏡 Why Now Might Be the Best Time for Buyers in 2025",
    excerpt:
      "After years of intense competition and sky-high prices, the U.S. housing market is finally showing signs of relief for homebuyers—and the timing couldn't be better.",
    author: "Patron Real Estate Services",
    date: "2025-06-17",
    category: "Market Analysis",
    imageUrl: "/placeholder.jpg",
    readTime: "5 min read",
    featured: true,
    content: `
      After years of intense competition and sky-high prices, the U.S. housing market is finally showing signs of relief for homebuyers—and the timing couldn't be better.

      According to a recent article from MarketWatch, housing inventory in the U.S. has climbed to over 1 million active listings, the highest level since before the pandemic. With more homes on the market and fewer bidding wars, buyers now have more room to breathe, think, and negotiate.

      📉 Price Drops Are Back

      One of the most telling signs of this shift? Roughly 1 in 5 listings have had a price cut, and 37% of newly built homes are also reducing prices. Builders and sellers alike are adjusting to slower market conditions—and savvy buyers are reaping the benefits.

      🕰 Homes Are Sitting Longer

      Another shift from the seller-dominated days of the past: homes are spending about 38 days on the market before going under contract. This gives buyers more time to view properties, do their homework, and even revisit homes before making an offer. Gone are the days of rushing in with a blind bid the same day a home is listed.

      🔍 What This Means for Buyers

      If you've been sitting on the sidelines waiting for the market to cool down—this might be your window of opportunity. While interest rates remain elevated, buyers now have more negotiating power, flexibility on terms, and the ability to avoid risky practices like waiving inspections or contingencies.

      👀 Local Perspective

      Here in Los Angeles, we're seeing similar trends, especially in neighborhoods where inventory is growing. If you're buying in areas like Altadena, Tujunga, Burbank, or surrounding parts of L.A., you may start to notice more listings with price reductions or seller incentives.

      📲 Thinking About Buying or Selling?

      Whether you're a first-time buyer or looking to sell and upgrade, I'm here to guide you through this evolving market with clarity, confidence, and strategy. Reach out anytime—I'd love to help you make your next move.
    `,
    contactInfo: {
      email: "patronrealestateservices@gmail.com",
      phone: "323.350.3137",
      location:
        "Serving Greater Los Angeles | Patron Real Estate Inc. | DRE #02178767",
    },
    disclaimer:
      'This post references insights from a MarketWatch article published on June 17, 2025: "The housing market is finally buyer-friendly as more sellers slash prices." The article is not my own, but the observations shared align with current market activity across many L.A. neighborhoods.',
  },
  {
    id: "2",
    title:
      "First-Time Homebuyer's Complete Guide: LA's Hidden Gems Under $800K",
    excerpt:
      "Skip the bidding wars! We've found 5 up-and-coming neighborhoods where first-time buyers can still find affordable homes with great potential for appreciation.",
    author: "Patron Real Estate Services",
    date: "2024-01-12",
    category: "Buying Tips",
    imageUrl: "/placeholder.jpg",
    readTime: "12 min read",
    featured: false,
  },
  {
    id: "3",
    title: "Staging Secrets: How We Sold a $2.5M Home in 3 Days",
    excerpt:
      "Professional stager reveals the exact techniques used to sell luxury homes at record speed. From lighting to furniture placement, learn what really works.",
    author: "Patron Real Estate Services",
    date: "2024-01-10",
    category: "Selling Tips",
    imageUrl: "/placeholder.jpg",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "4",
    title: "Investment Goldmine: Multi-Family Properties in Downtown LA",
    excerpt:
      "Why savvy investors are flocking to downtown LA's multi-family market. ROI analysis shows 8-12% annual returns with minimal vacancy rates.",
    author: "Patron Real Estate Services",
    date: "2024-01-08",
    category: "Investment",
    imageUrl: "/placeholder.jpg",
    readTime: "15 min read",
    featured: false,
  },
  {
    id: "5",
    title: "Neighborhood Deep Dive: Why Pasadena is LA's Best-Kept Secret",
    excerpt:
      "Historic charm meets modern convenience. Pasadena's real estate market is heating up with tech professionals and families seeking the perfect balance.",
    author: "Patron Real Estate Services",
    date: "2024-01-05",
    category: "Neighborhoods",
    imageUrl: "/placeholder.jpg",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "6",
    title:
      "Home Maintenance Calendar: What to Do Every Month to Protect Your Investment",
    excerpt:
      "Prevent costly repairs with our month-by-month maintenance checklist. From HVAC to roof inspections, keep your home in top condition year-round.",
    author: "Patron Real Estate Services",
    date: "2024-01-03",
    category: "Home Care",
    imageUrl: "/placeholder.jpg",
    readTime: "14 min read",
    featured: false,
  },
  {
    id: "7",
    title: "Market Trends: Los Angeles Real Estate in 2025",
    excerpt:
      "An in-depth analysis of current market conditions and predictions for the coming year in the Los Angeles real estate market.",
    author: "Patron Real Estate Services",
    date: "2024-01-01",
    category: "Market Analysis",
    imageUrl: "/placeholder.jpg",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: "8",
    title: "Investment Strategies for First-Time Real Estate Investors",
    excerpt:
      "Essential tips and strategies for those looking to enter the real estate investment market for the first time.",
    author: "Patron Real Estate Services",
    date: "2023-12-28",
    category: "Investment",
    imageUrl: "/placeholder.jpg",
    readTime: "12 min read",
    featured: false,
  },
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [visiblePosts, setVisiblePosts] = useState(3); // Show 3 posts initially

  // Filter and sort posts (including featured)
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      post.category.toLowerCase().replace(" ", "-") === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured post from filtered results
  const featuredPost = filteredPosts.find((post) => post.featured);

  // Sort filtered posts
  const sortedPosts = filteredPosts.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "popular":
        return Math.random() - 0.5; // Simulate popularity for demo
      default:
        return 0;
    }
  });

  // Get posts to display (excluding featured)
  const postsToShow = sortedPosts
    .filter((post) => !post.featured)
    .slice(0, visiblePosts);

  // Load more function
  const loadMorePosts = () => {
    setVisiblePosts((prev) =>
      Math.min(prev + 3, sortedPosts.filter((post) => !post.featured).length)
    );
  };

  // Check if there are more posts to load
  const hasMorePosts =
    visiblePosts < sortedPosts.filter((post) => !post.featured).length;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative bg-white py-6 md:py-8 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-white to-lime-50"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-3 left-3 w-16 h-16 bg-lime-200 rounded-full opacity-20"></div>
            <div className="absolute top-12 right-8 w-12 h-12 bg-lime-300 rounded-full opacity-15"></div>
            <div className="absolute bottom-6 left-1/4 w-8 h-8 bg-lime-100 rounded-full opacity-25"></div>
          </div>

          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-lime-100 rounded-full mb-3">
                  <span className="text-base">📝</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                  Real Estate
                  <span className="block text-lime-600">Insights</span>
                </h1>
                <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3">
                  Expert analysis and market trends from Los Angeles'
                  <span className="text-lime-600 font-semibold">
                    {" "}
                    trusted real estate professional
                  </span>
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-lime-500 rounded-full"></div>
                    Market Analysis
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-lime-500 rounded-full"></div>
                    Investment Tips
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-lime-500 rounded-full"></div>
                    Local Insights
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Blog */}
        <section className="py-4 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
              <div className="text-center">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Whether you're buying, selling, investing—or just love keeping
                  up with all things real estate—this blog is for you. Here
                  you'll find helpful articles, local market updates, home tips,
                  and insights straight from my experience as a real estate
                  broker in Los Angeles.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs">
                  <span className="flex items-center gap-1 text-gray-600">
                    <span className="text-lime-600">📊</span>
                    Market Analysis
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <span className="text-lime-600">🏠</span>
                    Home Tips
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <span className="text-lime-600">🎯</span>
                    Investment Advice
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search articles..."
                    className="pl-10"
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
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="market-analysis">
                      Market Analysis
                    </SelectItem>
                    <SelectItem value="buying-tips">Buying Tips</SelectItem>
                    <SelectItem value="selling-tips">Selling Tips</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="neighborhoods">Neighborhoods</SelectItem>
                    <SelectItem value="home-care">Home Care</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredPost && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Featured Article
              </h2>
              <BlogCard {...featuredPost} featured={true} />
            </div>
          </section>
        )}

        {/* Regular Articles */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Latest Articles{" "}
              {postsToShow.length > 0 &&
                `(${postsToShow.length} of ${
                  sortedPosts.filter((post) => !post.featured).length
                })`}
            </h2>

            {postsToShow.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {postsToShow.map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-2 border-lime-300 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-lime-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  No articles found
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
        {hasMorePosts && (
          <section className="py-8 text-center">
            <Button
              className="border-2 border-lime-300 text-lime-600 hover:bg-lime-50 bg-white"
              size="lg"
              onClick={loadMorePosts}
            >
              Load More Articles (+3)
            </Button>
          </section>
        )}
      </main>
    </div>
  );
}
