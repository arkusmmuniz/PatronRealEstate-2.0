"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Upload,
  Eye,
  Calendar,
  User,
  MoreVertical,
  Archive,
  X,
  Star,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { blogService } from "@/lib/services";
import { BlogPost } from "@/lib/supabase";

// Usamos la interfaz BlogPost de supabase.ts

const categories = [
  "Market Analysis",
  "Home Care",
  "Investment Guides",
  "Neighborhood Guides",
  "Tips & Advice",
  "Company News",
];

export default function AdminBlogPage() {
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar posts al montar el componente
  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const posts = await blogService.getAllPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit for images
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      toast({
        title: "Image selected",
        description: `${file.name} has been selected for upload`,
      });
    }
  };

  const handleUploadPost = async () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Creating blog post with data:', newPost);
      
      const postData = {
        title: newPost.title,
        content: newPost.content,
        status: "draft" as const,
      };

      console.log('Blog post data to send:', postData);
      const newPostData = await blogService.createPost(postData);
      console.log('Blog post created successfully:', newPostData);
      setBlogPosts([newPostData, ...blogPosts]);
      
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
    });
    setSelectedFile(null);
    setShowUploadModal(false);

    toast({
      title: "Blog post created successfully",
        description: `${newPostData.title} has been added to your blog`,
      });
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      console.error('Error details:', {
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint
      });
      toast({
        title: "Error",
        description: `Failed to create blog post: ${error?.message || 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const handleEditPost = async () => {
    if (!editingPost) return;

    try {
      const updatedPost = await blogService.updatePost(editingPost.id, editingPost);
      setBlogPosts(
        blogPosts.map((p) =>
          p.id === editingPost.id ? updatedPost : p
        )
      );
      setEditingPost(null);
      setShowEditModal(false);

      toast({
        title: "Blog post updated",
        description: "Blog post information has been updated successfully",
      });
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (id: number) => {
    const post = blogPosts.find((p) => p.id === id);
    if (!post) return;

    try {
      await blogService.deletePost(id);
      setBlogPosts(blogPosts.filter((p) => p.id !== id));
      toast({
        title: "Blog post deleted",
        description: `${post.title} has been removed from your blog`,
      });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  const handleArchivePost = async (id: number) => {
    try {
      await blogService.updatePost(id, { status: "archived" });
    setBlogPosts(
      blogPosts.map((p) => (p.id === id ? { ...p, status: "archived" } : p))
    );

    const post = blogPosts.find((p) => p.id === id);
    if (post) {
      toast({
        title: "Blog post archived",
        description: `${post.title} has been moved to archive`,
        });
      }
    } catch (error) {
      console.error('Error archiving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to archive blog post",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await blogService.updatePost(id, { status: newStatus as any });
    setBlogPosts(
      blogPosts.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );

    const post = blogPosts.find((p) => p.id === id);
    if (post) {
      toast({
        title: "Status updated",
        description: `${post.title} is now ${newStatus}`,
        });
      }
    } catch (error) {
      console.error('Error updating post status:', error);
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (id: number) => {
    const post = blogPosts.find((p) => p.id === id);
    if (!post) return;

    try {
    const newFeaturedState = !post.featured;

    if (newFeaturedState) {
        // Desactivar todos los demás featured
        await Promise.all(
          blogPosts
            .filter(p => p.featured && p.id !== id)
            .map(p => blogService.updatePost(p.id, { featured: false }))
        );
        
        // Activar el seleccionado
        await blogService.updatePost(id, { featured: true });
        
      setBlogPosts(
        blogPosts.map((p) => (p.id === id ? { ...p, featured: true } : { ...p, featured: false }))
      );
        
      toast({
        title: "Post featured",
        description: `${post.title} is now featured`,
      });
    } else {
        await blogService.updatePost(id, { featured: false });
      setBlogPosts(
        blogPosts.map((p) => (p.id === id ? { ...p, featured: false } : p))
      );
        
      toast({
        title: "Post unfeatured",
        description: `${post.title} is no longer featured`,
        });
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update featured status",
        variant: "destructive",
      });
    }
  };

  const totalPosts = blogPosts.length;
  const publishedPosts = blogPosts.filter(
    (p) => p.status === "published"
  ).length;
  const archivedPosts = blogPosts.filter((p) => p.status === "archived").length;
  const featuredPosts = blogPosts.filter((p) => p.featured).length;

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-sm text-gray-600">
            Create, edit, and manage your blog articles and content
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700"
          onClick={() => setShowUploadModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Compact Metrics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Posts</p>
            <p className="text-2xl font-bold text-gray-900">{totalPosts}</p>
          </div>
          
          <div className="h-12 w-px bg-gray-200" />
          
          <div>
            <p className="text-xs text-gray-600 mb-1">Published</p>
            <p className="text-2xl font-bold text-gray-900">{publishedPosts}</p>
          </div>

          <div className="h-12 w-px bg-gray-200" />

          <div>
            <p className="text-xs text-gray-600 mb-1">Featured</p>
            <p className="text-2xl font-bold text-gray-900">{featuredPosts}</p>
          </div>

          <div className="h-12 w-px bg-gray-200" />

          <div>
            <p className="text-xs text-gray-600 mb-1">Archived</p>
            <p className="text-2xl font-bold text-gray-900">{archivedPosts}</p>
          </div>
        </div>
      </div>

      {/* Blog Posts List */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Blog Posts ({blogPosts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.excerpt || "No excerpt available"}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500 flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        Patron Real Estate Services
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.publish_date}
                      </span>
                      <Badge
                        variant={
                          post.status === "published"
                            ? "default"
                            : post.status === "archived"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {post.status}
                      </Badge>
                      {post.featured && (
                        <Badge variant="outline" className="text-yellow-600">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPreviewPost(post);
                      setShowPreviewModal(true);
                    }}
                    title="Preview Post"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingPost(post);
                          setShowEditModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(
                            post.id,
                            post.status === "published"
                              ? "draft"
                              : "published"
                          )
                        }
                      >
                        {post.status === "published"
                          ? "Unpublish"
                          : "Publish"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleToggleFeatured(post.id)}
                      >
                        <Star className={`w-4 h-4 mr-2 ${post.featured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                        {post.featured ? "Unfeature" : "Feature"}
                      </DropdownMenuItem>
                      {post.status !== "archived" && (
                        <DropdownMenuItem
                          onClick={() => handleArchivePost(post.id)}
                        >
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {blogPosts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">
                  No blog posts found
                </h3>
                <p className="text-sm">
                  Get started by creating your first blog post.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create Blog Post Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
            <DialogDescription>
              Add a new blog post to your content library. Fill in the details
              below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Post Title *</Label>
              <Input
                id="title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                placeholder="Enter post title"
                required
              />
            </div>
            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={newPost.excerpt}
                onChange={(e) =>
                  setNewPost({ ...newPost, excerpt: e.target.value })
                }
                placeholder="Enter a brief excerpt for the post"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                placeholder="Enter the full content of your blog post"
                rows={8}
                required
              />
            </div>
            <div>
              <Label htmlFor="imageFile">Featured Image</Label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedFile ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="w-8 h-8 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        {selectedFile.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadPost}>Create Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Blog Post Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update the blog post information and settings.
            </DialogDescription>
          </DialogHeader>
          {editingPost && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editTitle">Post Title</Label>
                <Input
                  id="editTitle"
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="editExcerpt">Excerpt</Label>
                <Textarea
                  id="editExcerpt"
                  value={editingPost.excerpt || ""}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      excerpt: e.target.value,
                    })
                  }
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="editContent">Content</Label>
                <Textarea
                  id="editContent"
                  value={editingPost.content}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      content: e.target.value,
                    })
                  }
                  rows={8}
                />
              </div>
              <div>
                <Label htmlFor="editStatus">Status</Label>
                <Select
                  value={editingPost.status}
                  onValueChange={(value) =>
                    setEditingPost({ ...editingPost, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPost}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Blog Post Preview Modal */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Blog Post Preview</DialogTitle>
            <DialogDescription>
              Preview your blog post content before publishing.
            </DialogDescription>
          </DialogHeader>
          {previewPost && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{previewPost.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By Patron Real Estate Services</span>
                  <span>Date: {previewPost.publish_date}</span>
                  <span>Read time: {previewPost.read_time}</span>
                  <Badge variant="outline">Blog Post</Badge>
                </div>
                {previewPost.excerpt && previewPost.excerpt.trim() && (
                  <p className="text-lg text-gray-600 italic">
                    {previewPost.excerpt}
                  </p>
                )}
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{previewPost.content}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPreviewModal(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
