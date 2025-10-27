"use client";

import { EditorialVideoCard } from "@/components/editorial-video-card";
import { Button } from "@/components/ui/button";
import { ExternalLink, PlayCircle, Calendar } from "lucide-react";
import Link from "next/link";

// Mock data with YouTube/Vimeo embed URLs
const videos = [
  {
    id: "1",
    title: "How to Find Your Dream Home in Miami's Competitive Market",
    description: "Join us as we explore the key strategies for finding and securing your perfect property in Miami's fast-paced real estate market.",
    thumbnailUrl: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/9bZkp7q19f0?rel=0&modestbranding=1&showinfo=0",
    date: "2024-01-15",
    edition: "Episode 12",
    featured: true,
  },
  {
    id: "2",
    title: "Understanding Market Trends: What Buyers Need to Know",
    description: "A deep dive into current market conditions and what they mean for your buying decisions.",
    thumbnailUrl: "https://img.youtube.com/vi/OPf0YbXwDGI/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/OPf0YbXwDGI?rel=0&modestbranding=1&showinfo=0",
    date: "2024-01-08",
    edition: "Episode 11",
  },
  {
    id: "3",
    title: "Luxury Waterfront Properties: A Virtual Tour",
    description: "Experience Miami's most stunning waterfront properties from the comfort of your home.",
    thumbnailUrl: "https://img.youtube.com/vi/FScLMFX3ffI/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/FScLMFX3ffI?rel=0&modestbranding=1&showinfo=0",
    date: "2024-01-01",
    edition: "Episode 10",
  },
  {
    id: "4",
    title: "First-Time Home Buyer Guide: Everything You Need to Know",
    description: "Expert advice for navigating your first home purchase with confidence.",
    thumbnailUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=450&fit=crop",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&showinfo=0",
    date: "2023-12-25",
    edition: "Episode 9",
  },
  {
    id: "5",
    title: "Investment Opportunities in Miami Real Estate",
    description: "Discover the best neighborhoods and property types for real estate investment.",
    thumbnailUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=450&fit=crop",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&showinfo=0",
    date: "2023-12-18",
    edition: "Episode 8",
  },
  {
    id: "6",
    title: "Selling Your Home: Maximizing Value and Speed",
    description: "Professional tips to prepare, price, and market your property effectively.",
    thumbnailUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=450&fit=crop",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&showinfo=0",
    date: "2023-12-11",
    edition: "Episode 7",
  },
];

const featuredVideo = videos.find((v) => v.featured);
const recentVideos = videos.filter((v) => !v.featured);

// Helper function to get YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  // Handle YouTube embed URLs
  const embedPattern = /youtube\.com\/embed\/([^&\n?#]+)/;
  const embedMatch = url.match(embedPattern);
  if (embedMatch) return embedMatch[1];
  
  // Handle regular YouTube URLs
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

// Helper function to get video thumbnail URL
const getVideoThumbnail = (url: string): string => {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg';
};

export default function FabFridayPage() {
  const hasVideos = videos.length > 0;

  return (
    <main className="flex-1">
      {/* Hero Section with Branding */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-white via-gray-50 to-lime-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-grotesk font-bold text-gray-900 mb-4">
              <span className="text-gray-900">Fab</span>
              <span className="bg-gradient-to-r from-lime-500 to-lime-600 bg-clip-text text-transparent">Friday</span>
              </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Weekly insights, market updates, and property tours with Fabiola Patron
            </p>
          </div>
        </div>
      </section>

      {hasVideos ? (
        <>
          {/* Featured Video */}
          {featuredVideo && (
            <section className="py-12 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  <EditorialVideoCard key={featuredVideo.id} {...featuredVideo} />
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{featuredVideo.title}</h2>
                    <p className="text-gray-600">{featuredVideo.description}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Recent Videos Grid */}
          {recentVideos.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Episodes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentVideos.map((video) => (
                      <EditorialVideoCard key={video.id} {...video} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Optional CTA Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-2xl p-8 md:p-12">
                  <PlayCircle className="w-12 h-12 text-lime-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Never Miss an Episode
              </h3>
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    Subscribe to our YouTube channel for weekly real estate insights and property tours
              </p>
              <Button
                    size="lg"
                    className="bg-lime-500 hover:bg-lime-600 text-white"
                    asChild
                  >
                    <a
                      href="https://youtube.com/@your-channel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      Visit Our Channel
                      <ExternalLink className="w-4 h-4" />
                    </a>
              </Button>
            </div>
              </div>
        </div>
      </section>
        </>
      ) : (
        /* Empty State */
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-lime-100 flex items-center justify-center mx-auto mb-6">
                <PlayCircle className="w-10 h-10 text-lime-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                New episodes are on the way. Our next FabFriday will premiere soon with exclusive property tours and market insights.
              </p>
          <Button
            size="lg"
                variant="outline"
                className="border-lime-500 text-lime-600 hover:bg-lime-50"
                asChild
              >
                <a
                  href="https://youtube.com/@your-channel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Subscribe for Updates
                  <ExternalLink className="w-4 h-4" />
                </a>
          </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
