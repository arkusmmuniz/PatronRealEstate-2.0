"use client";

import { useState } from "react";
import { blogService } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Forzar renderizado dinámico para evitar errores en build
export const dynamic = 'force-dynamic';

export default function DebugBlogIndividualPage() {
  const [postId, setPostId] = useState("1");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testGetBlogPost = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log('Testing get blog post with ID:', postId);
      
      const post = await blogService.getPostById(postId);
      
      console.log('Blog post result:', post);
      
      if (post) {
        setResult({ 
          success: true, 
          post: post,
          postStructure: Object.keys(post)
        });
      } else {
        setError(`Blog post with ID ${postId} not found`);
        setResult({ error: 'Post not found' });
      }
      
    } catch (err) {
      console.error('Get blog post error:', err);
      setError(`Get Blog Post Error: ${err}`);
      setResult({ error: err });
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
      <h1 className="text-2xl font-bold mb-4">Debug Blog Individual</h1>
      
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="postId" className="block text-sm font-medium text-gray-700 mb-2">
            Post ID to test:
          </label>
          <Input 
            id="postId" 
            value={postId} 
            onChange={(e) => setPostId(e.target.value)}
            placeholder="Enter post ID (e.g., 1)"
          />
        </div>
        
        <div className="flex space-x-4">
          <Button onClick={testGetBlogPost} disabled={loading}>
            {loading ? "Testing..." : "Test Get Blog Post"}
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
          <a href="/admin-debug" className="text-blue-500 hover:underline">Go to Admin Debug</a>
        </div>
      </div>
    </div>
  );
}
