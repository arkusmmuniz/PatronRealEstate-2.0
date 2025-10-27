"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Type for FabFriday videos
interface FabFridayVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  date: string;
  featured: boolean;
}

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

// Mock data - will be replaced with Supabase later
const mockVideos: FabFridayVideo[] = [
  {
    id: "1",
    title: "How to Find Your Dream Home in Miami",
    description: "Key strategies for finding your perfect property in Miami's fast-paced real estate market.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "2024-01-15",
    featured: true,
  },
  {
    id: "2",
    title: "Understanding Market Trends",
    description: "Deep dive into current market conditions and what they mean for your buying decisions.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "2024-01-08",
    featured: false,
  },
  {
    id: "3",
    title: "Luxury Waterfront Properties",
    description: "Experience Miami's most stunning waterfront properties from the comfort of your home.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "2024-01-01",
    featured: false,
  },
  {
    id: "4",
    title: "First Time Home Buyer Guide",
    description: "Everything you need to know to buy your first home with confidence and avoid common mistakes.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "2023-12-25",
    featured: false,
  },
];

export default function FabFridayAdminPage() {
  const { toast } = useToast();
  const [videos, setVideos] = useState(mockVideos);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });

  const handleAddVideo = () => {
    if (!newVideo.title || !newVideo.videoUrl) {
      toast({
        title: "Required fields",
        description: "Please fill in the title and video URL",
        variant: "destructive",
      });
      return;
    }

    const video: FabFridayVideo = {
      id: Date.now().toString(),
      ...newVideo,
      date: new Date().toISOString().split("T")[0],
      featured: false,
    };

    setVideos([video, ...videos]);
    setNewVideo({ title: "", description: "", videoUrl: "" });
    setShowAddModal(false);

    toast({
      title: "Video added",
      description: `${video.title} has been added to FabFriday`,
    });
  };

  const handleDeleteVideo = (id: string) => {
    const video = videos.find((v) => v.id === id);
    setVideos(videos.filter((v) => v.id !== id));

    toast({
      title: "Video deleted",
      description: `${video?.title} has been removed`,
      variant: "destructive",
    });
  };

  const handleToggleFeatured = (id: string) => {
    const video = videos.find((v) => v.id === id);
    if (!video) return;

    // Check if trying to feature more than 1 video
    const currentFeaturedCount = videos.filter((v) => v.featured).length;
    
    // If clicking to feature a video and already at max
    if (!video.featured && currentFeaturedCount >= 1) {
      toast({
        title: "Limit Reached",
        description: "You can only feature 1 video. Please unfeature the current featured video first.",
        variant: "destructive",
      });
      return;
    }

    // Toggle featured status - if featuring, unfeature all others
    const updatedVideos = videos.map((v) => ({
      ...v,
      featured: v.id === id ? !v.featured : false,
    }));
    
    setVideos(updatedVideos);

    toast({
      title: video.featured ? "Video Unfeatured" : "Video Featured",
      description: `${video.title} is now ${video.featured ? 'no longer' : ''} featured`,
    });
  };

  // Get latest video date
  const latestVideo = videos.length > 0 ? videos[0] : null;
  const lastUploadDate = latestVideo ? new Date(latestVideo.date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }) : 'No videos yet';

  const totalVideos = videos.length;
  const featuredCount = videos.filter((v) => v.featured).length;

  return (
    <TooltipProvider>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
          <DialogContent className="max-w-2xl">
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
                  value={newVideo.videoUrl}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, videoUrl: e.target.value })
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
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Videos</p>
            <p className="text-2xl font-bold text-gray-900">{totalVideos}</p>
          </div>
          
          <div className="h-12 w-px bg-gray-200" />
          
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

          <div className="h-12 w-px bg-gray-200" />

          <div>
            <p className="text-xs text-gray-600 mb-1">Last Upload</p>
            <p className="text-lg font-semibold text-gray-900">{lastUploadDate}</p>
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Video className="h-5 w-5" />
          FabFriday Videos ({videos.length})
        </h3>
        <div className="space-y-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-sm"
              >
                {/* Thumbnail preview */}
                <div className="w-48 h-28 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                  <img 
                    src={getVideoThumbnail(video.videoUrl)} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop';
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
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
                      {video.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={video.videoUrl}
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
                <div className="flex flex-col gap-2">
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
