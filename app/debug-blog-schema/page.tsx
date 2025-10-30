"use client";

import { useState } from "react";
import { supabaseAdmin } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function DebugBlogSchemaPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testGetAllPosts = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log('Testing get all blog posts to see schema...');
      
      const { data, error: postsError } = await supabaseAdmin
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('Blog posts query result:', { data, postsError });
      
      if (postsError) {
        setError(`Blog Posts Query Error: ${postsError.message}`);
        setResult({ error: postsError });
      } else {
        // Mostrar la estructura del primer post para ver qué campos tiene
        const firstPost = data && data.length > 0 ? data[0] : null;
        const postStructure = firstPost ? Object.keys(firstPost) : [];
        
        setResult({ 
          success: true, 
          posts: data,
          count: data?.length || 0,
          postStructure: postStructure,
          samplePost: firstPost
        });
      }
      
    } catch (err) {
      console.error('Get all blog posts error:', err);
      setError(`Get All Blog Posts Error: ${err}`);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  const testGetSinglePost = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log('Testing get single blog post...');
      
      const { data, error: postError } = await supabaseAdmin
        .from('blog_posts')
        .select('*')
        .limit(1)
        .single();
      
      console.log('Single blog post query result:', { data, postError });
      
      if (postError) {
        setError(`Single Post Query Error: ${postError.message}`);
        setResult({ error: postError });
      } else {
        const postStructure = data ? Object.keys(data) : [];
        
        setResult({ 
          success: true, 
          post: data,
          postStructure: postStructure
        });
      }
      
    } catch (err) {
      console.error('Get single blog post error:', err);
      setError(`Get Single Blog Post Error: ${err}`);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Blog Schema</h1>
      <p className="text-gray-600 mb-6">
        Esta página nos ayudará a ver exactamente qué campos tiene la tabla blog_posts en Supabase.
      </p>
      
      <div className="flex space-x-4 mb-6">
        <Button onClick={testGetAllPosts} disabled={loading}>
          {loading ? "Testing..." : "Test Get All Posts"}
        </Button>
        <Button onClick={testGetSinglePost} disabled={loading}>
          {loading ? "Testing..." : "Test Get Single Post"}
        </Button>
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
          <a href="/create-blog-debug" className="text-blue-500 hover:underline">Go to Create Blog Debug</a>
        </div>
      </div>
    </div>
  );
}
