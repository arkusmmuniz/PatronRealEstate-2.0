"use client";

import { useEffect, useState } from 'react';
import { supabaseAdmin } from '@/lib/supabase';

export default function AdminDebug() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testVideosTable = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      console.log('Testing videos table...');
      
      const { data, error: videosError } = await supabaseAdmin
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('Videos table result:', { data, videosError });
      
      if (videosError) {
        setError(`Videos Table Error: ${videosError.message}`);
        setResult({ error: videosError });
      } else {
        setResult({ 
          success: true, 
          videos: data,
          count: data?.length || 0
        });
      }
      
    } catch (err) {
      console.error('Test videos error:', err);
      setError(`Connection Error: ${err}`);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  const testBlogTable = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      console.log('Testing blog_posts table...');
      
      const { data, error: blogError } = await supabaseAdmin
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('Blog table result:', { data, blogError });
      
      if (blogError) {
        setError(`Blog Table Error: ${blogError.message}`);
        setResult({ error: blogError });
      } else {
        setResult({ 
          success: true, 
          posts: data,
          count: data?.length || 0
        });
      }
      
    } catch (err) {
      console.error('Test blog error:', err);
      setError(`Connection Error: ${err}`);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  const testUsersTable = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      console.log('Testing users table...');
      
      const { data, error: usersError } = await supabaseAdmin
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('Users table result:', { data, usersError });
      
      if (usersError) {
        setError(`Users Table Error: ${usersError.message}`);
        setResult({ error: usersError });
      } else {
        setResult({ 
          success: true, 
          users: data,
          count: data?.length || 0
        });
      }
      
    } catch (err) {
      console.error('Test users error:', err);
      setError(`Connection Error: ${err}`);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Admin Debug - Database Tables</h2>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={testVideosTable}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Videos Table'}
        </button>
        
        <button
          onClick={testBlogTable}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Blog Table'}
        </button>
        
        <button
          onClick={testUsersTable}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Users Table'}
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {result && (
        <div className="mb-4">
          <strong>Result:</strong>
          <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto max-h-96">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mb-4">
        <strong>Supabase Admin Client Info:</strong>
        <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
          {JSON.stringify({
            supabaseUrl: supabaseAdmin?.supabaseUrl || 'Not available',
            supabaseKey: supabaseAdmin?.supabaseKey ? 'Present' : 'Not available'
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
