"use client";

import { EditorialVideoCard } from "@/components/editorial-video-card";
import { Button } from "@/components/ui/button";
import { ExternalLink, PlayCircle, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { videoService } from "@/lib/services";
import { FabFridayVideo } from "@/lib/supabase";

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
  const [videos, setVideos] = useState<FabFridayVideo[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar videos al montar el componente
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const videosData = await videoService.getPublicVideos();
      setVideos(videosData);
    } catch (error) {
      console.error('Error loading videos:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const hasVideos = videos.length > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-lime-600" />
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      </div>
    );
  }

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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Featured Video */}
              {(() => {
                const featuredVideo = videos.find((v) => v.featured);
                if (!featuredVideo) return null;
                
                return (
                  <div className="mb-16">
                    <div className="max-w-4xl mx-auto">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        <div className="aspect-video bg-gray-900 relative">
                          <iframe
                            src={featuredVideo.video_url.replace('watch?v=', 'embed/').replace('shorts/', 'embed/') + '?rel=0&modestbranding=1&showinfo=0'}
                            title={featuredVideo.title}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                        <div className="p-8">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="bg-lime-100 text-lime-800 text-xs font-semibold px-2 py-1 rounded-full">
                              Featured Episode
                            </span>
                          </div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {featuredVideo.title}
                          </h2>
                          <p className="text-lg text-gray-600 mb-6">
                            {featuredVideo.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(featuredVideo.created_at).toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Recent Videos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos
                  .filter((v) => !v.featured)
                  .map((video) => (
                    <EditorialVideoCard
                      key={video.id}
                      id={video.id.toString()}
                      title={video.title}
                      description={video.description || ""}
                      thumbnailUrl={getVideoThumbnail(video.video_url)}
                      embedUrl={video.video_url.replace('watch?v=', 'embed/').replace('shorts/', 'embed/') + '?rel=0&modestbranding=1&showinfo=0'}
                      date={video.created_at}
                      edition={`Episode ${video.id}`}
                      featured={video.featured}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
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