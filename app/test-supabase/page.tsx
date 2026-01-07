"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// Forzar renderizado dinámico para evitar errores en build
export const dynamic = 'force-dynamic';

export default function SupabaseTest() {
  const [status, setStatus] = useState<string>('Testing...');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection...');
        
        // Probar conexión básica con blog_posts
        const { data: blogData, error: blogError } = await supabase
          .from('blog_posts')
          .select('*')
          .limit(5);
        
        if (blogError) {
          setStatus('❌ Blog posts error: ' + blogError.message);
          setData({ blogError });
          return;
        }

        // Probar conexión con videos
        const { data: videoData, error: videoError } = await supabase
          .from('videos')
          .select('*')
          .limit(5);
        
        if (videoError) {
          setStatus('❌ Videos error: ' + videoError.message);
          setData({ videoError });
          return;
        }

        setStatus('✅ Supabase connected successfully!');
        setData({ 
          blogPosts: blogData?.length || 0,
          videos: videoData?.length || 0,
          sampleBlog: blogData?.[0],
          sampleVideo: videoData?.[0]
        });
        
      } catch (err) {
        setStatus('❌ Connection error: ' + err);
        setData({ error: err });
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Supabase Connection Test</h2>
      <div className="mb-4">
        <strong>Status:</strong> {status}
      </div>
      <div className="mb-4">
        <strong>Data:</strong>
        <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}