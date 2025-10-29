"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { blogService } from "@/lib/services";
import { BlogPost } from "@/lib/supabase";

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.id as string;
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Loading blog post with ID:', postId);
        const post = await blogService.getPostById(postId);
        
        if (post) {
          console.log('Blog post loaded:', post);
          setBlogPost(post);
        } else {
          console.log('Blog post not found');
          setError('Article not found');
        }
      } catch (err: any) {
        console.error('Error loading blog post:', err);
        console.error('Error details:', {
          message: err?.message,
          code: err?.code,
          details: err?.details,
          hint: err?.hint
        });
        setError(`Failed to load article: ${err?.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      loadBlogPost();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <Button
              variant="outline"
              size="lg"
              className="text-foreground hover:text-white border-2 hover:border-primary hover:bg-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />← Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back to Blog */}
      <section className="py-6 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <Link href="/blog">
            <Button
              variant="outline"
              className="text-foreground hover:text-white border-2 hover:border-primary hover:bg-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />← Back to Blog
            </Button>
          </Link>
        </div>
      </section>

      {/* Blog Post */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Post Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-sm">
                  Blog Post
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{new Date(blogPost.publish_date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{blogPost.read_time}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {blogPost.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                By Patron Real Estate Services
              </p>
            </div>

            {/* Post Content */}
            <Card className="p-8 md:p-12 mb-8">
              <div className="prose prose-lg max-w-none">
                {blogPost.content.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-6 text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>

            {/* Contact Section */}
              <Card className="p-8 bg-primary/5 border-primary/20">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  📲 Thinking About Buying or Selling?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Whether you're a first-time buyer or looking to sell and
                  upgrade, I'm here to guide you through this evolving market
                  with clarity, confidence, and strategy. Reach out anytime—I'd
                  love to help you make your next move.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <a
                    href="mailto:patronrealestateservices@gmail.com"
                      className="text-primary hover:underline"
                    >
                    patronrealestateservices@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <a
                    href="tel:323.350.3137"
                      className="text-primary hover:underline"
                    >
                    323.350.3137
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">
                    Serving Greater Los Angeles | Patron Real Estate Inc. | DRE #02178767
                    </span>
                  </div>
                </div>
              </Card>


            {/* Back to Blog Button */}
            <div className="text-center py-8">
              <Link href="/blog">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-foreground hover:text-white border-2 hover:border-primary hover:bg-primary"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />← Back to All Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
