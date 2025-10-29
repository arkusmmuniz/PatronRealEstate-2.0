"use client";

import { useState } from "react";
import { blogService } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateBlogPostDebugPage() {
  const [title, setTitle] = useState("Test Blog Post Title");
  const [excerpt, setExcerpt] = useState("Test Blog Post Excerpt");
  const [content, setContent] = useState("This is test content for the blog post. It should contain enough text to make it a proper blog post.");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateBlogPost = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log('Testing blog post creation...');
      
      const postData = {
        title,
        content,
        status: "draft",
      };
      
      console.log('Blog post data:', postData);
      
      const newPost = await blogService.createPost(postData);
      setResult(newPost);
      console.log('Blog post creation successful:', newPost);
      
    } catch (e: any) {
      setError(e.message);
      console.error('Blog post creation failed:', e);
    } finally {
      setLoading(false);
    }
  };

  const testGetAllPosts = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log('Testing get all blog posts...');
      
      const posts = await blogService.getAllPosts();
      
      console.log('All blog posts result:', posts);
      
      setResult({ 
        success: true, 
        posts: posts,
        count: posts.length,
        postIds: posts.map(p => p.id)
      });
      
    } catch (err) {
      console.error('Get all blog posts error:', err);
      setError(`Get All Blog Posts Error: ${err}`);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Create Blog Post</h1>
      
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
          <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
        </div>
        
        <div className="flex space-x-4">
          <Button onClick={handleCreateBlogPost} disabled={loading}>
            {loading ? "Creating..." : "Test Create Blog Post"}
          </Button>
          <Button onClick={testGetAllPosts} disabled={loading}>
            {loading ? "Testing..." : "Test Get All Posts"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {result && (
        <div>
          <h2 className="text-xl font-bold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
            <code>{JSON.stringify(result, null, 2)}</code>
          </pre>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Quick Links:</h2>
        <div className="space-x-4">
          <a href="/blog" className="text-blue-500 hover:underline">Go to Blog</a>
          <a href="/admin/blog" className="text-blue-500 hover:underline">Go to Admin Blog</a>
          <a href="/debug-blog-individual" className="text-blue-500 hover:underline">Go to Blog Individual Debug</a>
        </div>
      </div>
    </div>
  );
}
