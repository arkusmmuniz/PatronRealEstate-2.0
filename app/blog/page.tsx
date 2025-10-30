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
import { Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { blogService } from "@/lib/services";
import { BlogPost } from "@/lib/supabase";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar posts al montar el componente
  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const posts = await blogService.getPublishedPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort posts (including featured)
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get featured post from filtered results
  const featuredPost = filteredPosts.find((post) => post.featured);

  // Sort filtered posts
  const sortedPosts = filteredPosts.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
      case "oldest":
        return new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime();
      case "popular":
        return b.views - a.views;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-lime-600" />
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-white via-gray-50 to-lime-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Real Estate <span className="text-lime-600">Insights</span>
                </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Expert advice, market analysis, and insider tips to help you navigate the real estate market with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
              <div className="flex gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="popular">Popular</SelectItem>
                  </SelectContent>
                </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-lime-100 text-lime-800 text-xs font-semibold px-2 py-1 rounded-full">
                Featured Article
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {featuredPost.title}
              </h2>
                    <p className="text-lg text-gray-600 mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-1">
                        <span>By Patron Real Estate Services</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span>{featuredPost.publish_date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span>{featuredPost.read_time}</span>
                      </span>
                    </div>
                    <Button asChild className="bg-lime-600 hover:bg-lime-700">
                      <a href={`/blog/${featuredPost.id}`}>Read Full Article</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {postsToShow.map((post) => (
                  <BlogCard
                    key={post.id}
                    id={post.id.toString()}
                    title={post.title}
                    excerpt={post.excerpt || ""}
                    author="Patron Real Estate Services"
                    date={post.publish_date}
                    category="Blog Post"
                    imageUrl={post.image_url || "/placeholder.jpg"}
                    readTime={post.read_time}
                    featured={post.featured}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMorePosts && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={loadMorePosts}
                    className="border-lime-500 text-lime-600 hover:bg-lime-50"
                  >
                    Load More Articles
                  </Button>
                </div>
              )}

              {/* Empty State */}
              {filteredPosts.length === 0 && !loading && (
              <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No articles found
                </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                    variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                    Clear Filters
                </Button>
              </div>
            )}
          </div>
          </div>
          </section>
      </main>
    </div>
  );
}
