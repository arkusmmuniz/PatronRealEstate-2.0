"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ExternalLink, 
  Video, 
  FileText, 
  Star, 
  Clock, 
  Plus,
  MoreVertical,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [activityFilter, setActivityFilter] = useState<"all" | "video" | "blog">("all");
  const [newVideo, setNewVideo] = useState({ title: "", description: "", videoUrl: "" });
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [userFirstName, setUserFirstName] = useState<string>("Admin");

  useEffect(() => {
    if (!auth.isAuthenticated("admin")) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      loadUserProfile();
    }
  }, [router]);

  const loadUserProfile = async () => {
    try {
      // Obtener usuario autenticado
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return;
      }

      // Obtener perfil desde la tabla profiles
      const { data: profileData, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .maybeSingle();

      if (profileData?.first_name) {
        setUserFirstName(profileData.first_name);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-lime-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  const handleAddVideo = () => {
    if (!newVideo.title || !newVideo.videoUrl) {
      toast({
        title: "Required fields",
        description: "Please fill in the title and video URL",
        variant: "destructive",
      });
      return;
    }
    router.push("/admin/fabfriday");
    toast({
      title: "Video added",
      description: "Redirecting to manage your video",
    });
  };

  const handleAddBlog = () => {
    if (!newBlog.title || !newBlog.content) {
      toast({
        title: "Required fields",
        description: "Please fill in the title and content",
        variant: "destructive",
      });
      return;
    }
    router.push("/admin/blog");
    toast({
      title: "Blog post added",
      description: "Redirecting to manage your post",
    });
  };

  // Mock data
  const stats = {
    totalVideos: 12,
    totalBlogPosts: 8,
    featuredVideos: 3,
  };

  const allActivities = [
    { type: "video", action: "published", title: "Miami Market Update", date: "2 hours ago", author: "You" },
    { type: "blog", action: "published", title: "First Time Buyer Guide", date: "5 hours ago", author: "You" },
    { type: "video", action: "published", title: "Luxury Properties Tour", date: "1 day ago", author: "You" },
    { type: "video", action: "edited", title: "Understanding Market Trends", date: "2 days ago", author: "You" },
    { type: "blog", action: "edited", title: "Investment Opportunities", date: "3 days ago", author: "You" },
    { type: "video", action: "deleted", title: "Old Market Analysis", date: "4 days ago", author: "You" },
    { type: "blog", action: "published", title: "Home Staging Tips", date: "5 days ago", author: "You" },
    { type: "video", action: "published", title: "Neighborhood Spotlight", date: "6 days ago", author: "You" },
    { type: "blog", action: "edited", title: "Financing Your Home", date: "1 week ago", author: "You" },
    { type: "video", action: "published", title: "Real Estate Investment Guide", date: "1 week ago", author: "You" },
    { type: "blog", action: "deleted", title: "Outdated Post", date: "2 weeks ago", author: "You" },
    { type: "video", action: "published", title: "Miami Beach Tour", date: "2 weeks ago", author: "You" },
  ];

  const recentActivity = allActivities.slice(0, 5);
  const filteredActivities = activityFilter === "all" 
    ? recentActivity 
    : recentActivity.filter(activity => activity.type === activityFilter);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome, <span className="bg-gradient-to-r from-lime-500 to-lime-600 bg-clip-text text-transparent">{userFirstName}</span>
          </h1>
          <p className="text-sm text-gray-600">
            Here's what's happening with your content today
          </p>
        </div>

        {/* New Entry Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setShowVideoModal(true)}>
              <Video className="mr-2 h-4 w-4" />
              <span>FabFriday Video</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowBlogModal(true)}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Blog Post</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Compact Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Videos</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalVideos}</p>
          </div>
          
          <div className="h-12 w-px bg-gray-200" />
          
          <div>
            <p className="text-xs text-gray-600 mb-1">Blog Posts</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalBlogPosts}</p>
          </div>

          <div className="h-12 w-px bg-gray-200" />

          <div>
            <p className="text-xs text-gray-600 mb-1">Featured</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">{stats.featuredVideos}</p>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Active
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity - Expanded */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-600" />
            Recent Activity
          </h3>
          <div className="flex gap-2">
            <Button 
              variant={activityFilter === "video" ? "default" : "outline"} 
              size="sm" 
              className={`text-xs ${activityFilter === "video" ? "bg-lime-600 text-white hover:bg-lime-700" : ""}`}
              onClick={() => setActivityFilter(activityFilter === "video" ? "all" : "video")}
            >
              <Video className="h-3 w-3 mr-1.5" />
              Videos
            </Button>
            <Button 
              variant={activityFilter === "blog" ? "default" : "outline"} 
              size="sm" 
              className={`text-xs ${activityFilter === "blog" ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
              onClick={() => setActivityFilter(activityFilter === "blog" ? "all" : "blog")}
            >
              <FileText className="h-3 w-3 mr-1.5" />
              Blog
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredActivities.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
            >
              <div className={`p-2.5 rounded-lg flex-shrink-0 ${
                activity.type === 'video' 
                  ? 'bg-lime-100' 
                  : 'bg-blue-100'
              }`}>
                {activity.type === 'video' ? (
                  <Video className="h-5 w-5 text-lime-600" />
                ) : (
                  <FileText className="h-5 w-5 text-blue-600" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <Badge 
                    variant={
                      activity.action === 'published' ? 'default' : 
                      activity.action === 'edited' ? 'secondary' : 
                      'destructive'
                    }
                    className="text-xs"
                  >
                    {activity.action}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">
                  {activity.author} · {activity.date}
                </p>
              </div>

              <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded hover:bg-gray-100">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full text-sm text-gray-600 hover:text-gray-900"
            onClick={() => setShowAllActivity(true)}
          >
            View All Activity ({allActivities.length})
          </Button>
        </div>
      </div>

      {/* All Activity Modal */}
      <Dialog open={showAllActivity} onOpenChange={setShowAllActivity}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>All Activity</DialogTitle>
            <DialogDescription>
              Complete history of all your content activity
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[60vh] pr-2 space-y-3">
            {allActivities.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
              >
                <div className={`p-2.5 rounded-lg flex-shrink-0 ${
                  activity.type === 'video' 
                    ? 'bg-lime-100' 
                    : 'bg-blue-100'
                }`}>
                  {activity.type === 'video' ? (
                    <Video className="h-5 w-5 text-lime-600" />
                  ) : (
                    <FileText className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <Badge 
                      variant={
                        activity.action === 'published' ? 'default' : 
                        activity.action === 'edited' ? 'secondary' : 
                        'destructive'
                      }
                      className="text-xs"
                    >
                      {activity.action}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    {activity.author} · {activity.date}
                  </p>
                </div>

                <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded hover:bg-gray-100">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAllActivity(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modals */}
      {/* Add Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add FabFriday Video</DialogTitle>
            <DialogDescription>
              Enter the information for the new video. Just paste the YouTube or Vimeo URL.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="videoTitle">Video Title *</Label>
              <Input
                id="videoTitle"
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                placeholder="e.g., Episode 12 - Miami Market Update"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="videoDescription">Description</Label>
              <Textarea
                id="videoDescription"
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
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
                onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVideoModal(false)}>
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

      {/* Add Blog Modal */}
      <Dialog open={showBlogModal} onOpenChange={setShowBlogModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Blog Post</DialogTitle>
            <DialogDescription>
              Add a new blog post to your website
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="blogTitle">Post Title *</Label>
              <Input
                id="blogTitle"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                placeholder="e.g., First Time Home Buyer Guide"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="blogContent">Content *</Label>
              <Textarea
                id="blogContent"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                placeholder="Write your blog post content here..."
                rows={8}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlogModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddBlog}
              variant="outline"
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              Create Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
