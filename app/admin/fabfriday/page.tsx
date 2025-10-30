"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Plus,
  Trash2,
  ExternalLink,
  Video,
  Star,
  Calendar,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { videoService } from "@/lib/services";
import { FabFridayVideo } from "@/lib/supabase";

// Usamos la interfaz FabFridayVideo de supabase.ts

// Helper function to get YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
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
  // Default placeholder if not YouTube
  return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop';
};

export default function FabFridayAdminPage() {
  const { toast } = useToast();
  const [videos, setVideos] = useState<FabFridayVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    video_url: "",
  });

  // Cargar videos al montar el componente
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      console.log('Loading videos from admin...');
      const videosData = await videoService.getAllVideos();
      console.log('Videos loaded:', videosData);
      setVideos(videosData);
    } catch (error) {
      console.error('Error loading videos:', error);
      toast({
        title: "Error",
        description: `Failed to load videos: ${error}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddVideo = async () => {
    if (!newVideo.title || !newVideo.video_url) {
      toast({
        title: "Required fields",
        description: "Please fill in the title and video URL",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Creating video with data:', newVideo);
      
      const videoData = {
        title: newVideo.title,
        description: newVideo.description || "",
        video_url: newVideo.video_url,
        featured: false,
      };

      console.log('Video data to send:', videoData);
      const newVideoData = await videoService.createVideo(videoData);
      console.log('Video created successfully:', newVideoData);
      
      setVideos([newVideoData, ...videos]);
      setNewVideo({ title: "", description: "", video_url: "" });
      setShowAddModal(false);

      toast({
        title: "Video added",
        description: `${newVideoData.title} has been added to FabFriday`,
      });
    } catch (error) {
      console.error('Error creating video:', error);
      toast({
        title: "Error",
        description: `Failed to add video: ${error}`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteVideo = async (id: number) => {
    const video = videos.find((v) => v.id === id);
    if (!video) return;

    try {
      await videoService.deleteVideo(id);
      setVideos(videos.filter((v) => v.id !== id));

      toast({
        title: "Video deleted",
        description: `${video.title} has been removed`,
        variant: "destructive",
      });
    } catch (error) {
      console.error('Error deleting video:', error);
      toast({
        title: "Error",
        description: "Failed to delete video",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (id: number) => {
    const video = videos.find((v) => v.id === id);
    if (!video) return;

    try {
      await videoService.toggleFeatured(id);
      
      // Actualizar el estado local
      const updatedVideos = videos.map((v) => ({
        ...v,
        featured: v.id === id ? !v.featured : false,
      }));
      
      setVideos(updatedVideos);

      toast({
        title: video.featured ? "Video Unfeatured" : "Video Featured",
        description: `${video.title} is now ${video.featured ? 'no longer' : ''} featured`,
      });
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update featured status",
        variant: "destructive",
      });
    }
  };

  // Get latest video date
  const latestVideo = videos.length > 0 ? videos[0] : null;
  const lastUploadDate = latestVideo ? new Date(latestVideo.created_at).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }) : 'No videos yet';

  const totalVideos = videos.length;
  const featuredCount = videos.filter((v) => v.featured).length;

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
    <TooltipProvider>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FabFriday Management</h1>
          <p className="text-sm text-gray-600">
            Manage all FabFriday video content
          </p>
        </div>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>Add FabFriday Video</DialogTitle>
              <DialogDescription>
                Enter the information for the new video. Just paste the YouTube or Vimeo URL.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Video Title *</Label>
                <Input
                  id="title"
                  value={newVideo.title}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, title: e.target.value })
                  }
                  placeholder="e.g., Episode 12 - Miami Market Update"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newVideo.description}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, description: e.target.value })
                  }
                  placeholder="Brief description of the video content"
                  rows={3}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="videoUrl">Video URL (YouTube/Vimeo) *</Label>
                <Input
                  id="videoUrl"
                  value={newVideo.video_url}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, video_url: e.target.value })
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="mt-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddVideo} 
                className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700"
              >
                Add Video
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Compact Metrics */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Videos</p>
            <p className="text-2xl font-bold text-gray-900">{totalVideos}</p>
          </div>
          
          <div className="hidden sm:block h-12 w-px bg-gray-200" />
          
          <div>
            <p className="text-xs text-gray-600 mb-1">Featured</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">{featuredCount}/1</p>
              {featuredCount >= 1 && (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Active
                </Badge>
              )}
            </div>
          </div>

          <div className="hidden sm:block h-12 w-px bg-gray-200" />

          <div>
            <p className="text-xs text-gray-600 mb-1">Last Upload</p>
            <p className="text-lg font-semibold text-gray-900">{lastUploadDate}</p>
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Video className="h-5 w-5" />
          FabFriday Videos ({videos.length})
        </h3>
        <div className="space-y-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-sm flex-wrap"
              >
                {/* Thumbnail preview */}
                <div className="w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                  <img 
                    src={getVideoThumbnail(video.video_url)} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop';
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {video.title}
                        </h3>
                        {video.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(video.created_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-600 hover:text-lime-700 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on YouTube
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="order-last w-full sm:order-none sm:w-auto flex flex-row sm:flex-col gap-2 mt-2 sm:mt-0 sm:ml-auto">
                  {(() => {
                    const featuredCount = videos.filter((v) => v.featured).length;
                    const isMaxReached = featuredCount >= 1;
                    const isDisabled = !video.featured && isMaxReached;
                    
                    if (isDisabled) {
                      return (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={true}
                              className="opacity-50 cursor-not-allowed"
                            >
                              <Star className="w-4 h-4 mr-1 text-gray-400" />
                              Feature
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Only 1 video can be featured at a time</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    }
                    
                    return (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleFeatured(video.id)}
                        className={video.featured ? "bg-yellow-50 hover:bg-yellow-100 border-yellow-300" : ""}
                      >
                        {video.featured ? (
                          <>
                            <Star className="w-4 h-4 mr-1 fill-current text-yellow-500" />
                            Featured
                          </>
                        ) : (
                          <>
                            <Star className="w-4 h-4 mr-1" />
                            Feature
                          </>
                        )}
                      </Button>
                    );
                  })()}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteVideo(video.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}

            {videos.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Video className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">
                  No videos yet
                </h3>
                <p className="text-sm">Get started by adding your first video</p>
              </div>
            )}
        </div>
      </div>
      </div>
    </TooltipProvider>
  );
}
