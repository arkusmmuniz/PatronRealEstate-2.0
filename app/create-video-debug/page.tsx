"use client";

import { useState } from 'react';
import { videoService } from '@/lib/services';

// Forzar renderizado dinámico para evitar errores en build
export const dynamic = 'force-dynamic';

export default function CreateVideoDebug() {
  const [title, setTitle] = useState('Test Video');
  const [description, setDescription] = useState('Test Description');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=kqLVUJnE_cM');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testCreateVideo = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      console.log('Testing video creation...');
      
      const videoData = {
        title,
        description: description || "",
        video_url: videoUrl,
        featured: false,
      };
      
      console.log('Video data:', videoData);
      
      const newVideo = await videoService.createVideo(videoData);
      
      console.log('Video created:', newVideo);
      
      setResult({ 
        success: true, 
        video: newVideo
      });
      
    } catch (err) {
      console.error('Create video error:', err);
      setError(`Create Video Error: ${err}`);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  const testGetVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      console.log('Testing get videos...');
      
      const videos = await videoService.getAllVideos();
      
      console.log('Videos retrieved:', videos);
      
      // Mostrar la estructura del primer video para ver qué campos tiene
      const firstVideo = videos[0];
      const videoStructure = firstVideo ? Object.keys(firstVideo) : [];
      
      setResult({ 
        success: true, 
        videos: videos,
        count: videos.length,
        videoStructure: videoStructure,
        sampleVideo: firstVideo
      });
      
    } catch (err) {
      console.error('Get videos error:', err);
      setError(`Get Videos Error: ${err}`);
      setResult({ error: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Video Debug</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Video title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Video description"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Video URL:</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="YouTube URL"
          />
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={testCreateVideo}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Test Create Video'}
          </button>
          
          <button
            onClick={testGetVideos}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Test Get Videos'}
          </button>
        </div>
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
    </div>
  );
}
