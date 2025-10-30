"use client";

import { useState } from "react";
import { supabaseAdmin } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TestBlogCreationPage() {
  const [title, setTitle] = useState("Test Title");
  const [content, setContent] = useState("Test content");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testAbsoluteMinimal = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log('Testing absolute minimal blog post creation...');
      
      const postData = {
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim().replace(/^-|-$/g, ''),
        content,
        status: "draft",
      };
      
      console.log('Absolute minimal post data:', postData);
      
      const { data, error: createError } = await supabaseAdmin
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();
      
      console.log('Creation result:', { data, createError });
      
      if (createError) {
        setError(`Creation Error: ${createError.message}`);
        setResult({ error: createError });
      } else {
        setResult({ success: true, post: data });
      }
      
    } catch (err) {
      console.error('Test creation error:', err);
      setError(`Test Creation Error: ${err}`);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  const testWithExcerpt = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log('Testing blog post creation with excerpt...');
      
      const postData = {
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim().replace(/^-|-$/g, ''),
        excerpt: "Test excerpt",
        content,
      };
      
      console.log('Post data with excerpt:', postData);
      
      const { data, error: createError } = await supabaseAdmin
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();
      
      console.log('Creation result:', { data, createError });
      
      if (createError) {
        setError(`Creation Error: ${createError.message}`);
        setResult({ error: createError });
      } else {
        setResult({ success: true, post: data });
      }
      
    } catch (err) {
      console.error('Test creation error:', err);
      setError(`Test Creation Error: ${err}`);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  const testWithStatus = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      console.log('Testing blog post creation with status...');
      
      const postData = {
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim().replace(/^-|-$/g, ''),
        content,
        status: "draft",
      };
      
      console.log('Post data with status:', postData);
      
      const { data, error: createError } = await supabaseAdmin
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();
      
      console.log('Creation result:', { data, createError });
      
      if (createError) {
        setError(`Creation Error: ${createError.message}`);
        setResult({ error: createError });
      } else {
        setResult({ success: true, post: data });
      }
      
    } catch (err) {
      console.error('Test creation error:', err);
      setError(`Test Creation Error: ${err}`);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Blog Creation</h1>
      <p className="text-gray-600 mb-6">
        Probando diferentes combinaciones de campos para encontrar cuáles funcionan.
      </p>
      
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={4} />
        </div>
        
        <div className="flex space-x-4">
          <Button onClick={testAbsoluteMinimal} disabled={loading}>
            {loading ? "Testing..." : "Test Absolute Minimal"}
          </Button>
          <Button onClick={testWithExcerpt} disabled={loading}>
            {loading ? "Testing..." : "Test + Excerpt"}
          </Button>
          <Button onClick={testWithStatus} disabled={loading}>
            {loading ? "Testing..." : "Test + Status"}
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
          <a href="/debug-blog-schema" className="text-blue-500 hover:underline">Go to Schema Debug</a>
          <a href="/create-blog-debug" className="text-blue-500 hover:underline">Go to Create Blog Debug</a>
          <a href="/admin/blog" className="text-blue-500 hover:underline">Go to Admin Blog</a>
        </div>
      </div>
    </div>
  );
}
