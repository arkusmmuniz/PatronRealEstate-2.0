"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SupabaseDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testSupabase = async () => {
      try {
        console.log('Testing Supabase connection...');
        
        // Test 1: Basic connection
        const { data: testData, error: testError } = await supabase
          .from('videos')
          .select('*')
          .limit(1);
        
        console.log('Test result:', { testData, testError });
        
        if (testError) {
          setError(`Supabase Error: ${testError.message}`);
          setDebugInfo({
            error: testError,
            errorCode: testError.code,
            errorDetails: testError.details,
            errorHint: testError.hint
          });
        } else {
          setDebugInfo({
            success: true,
            videoCount: testData?.length || 0,
            sampleVideo: testData?.[0] || null,
            connection: 'OK'
          });
        }
        
      } catch (err) {
        console.error('Connection error:', err);
        setError(`Connection Error: ${err}`);
        setDebugInfo({ error: err });
      }
    };

    testSupabase();
  }, []);

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Supabase Debug - Videos Table</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div className="mb-4">
        <strong>Debug Information:</strong>
        <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto max-h-96">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>
      
      <div className="mb-4">
        <strong>Supabase Client Info:</strong>
        <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
          {JSON.stringify({
            supabaseUrl: supabase?.supabaseUrl || 'Not available',
            supabaseKey: supabase?.supabaseKey ? 'Present' : 'Not available'
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
