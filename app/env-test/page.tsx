"use client";

export default function EnvTest() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Environment Variables Test</h2>
      
      <div className="space-y-4">
        <div>
          <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>
          <div className="bg-gray-100 p-2 rounded mt-1">
            {process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET'}
          </div>
        </div>
        
        <div>
          <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>
          <div className="bg-gray-100 p-2 rounded mt-1">
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (hidden)' : 'NOT SET'}
          </div>
        </div>
        
        <div>
          <strong>SUPABASE_SERVICE_ROLE_KEY:</strong>
          <div className="bg-gray-100 p-2 rounded mt-1">
            {process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET (hidden)' : 'NOT SET'}
          </div>
        </div>
        
        <div>
          <strong>DATABASE_URL:</strong>
          <div className="bg-gray-100 p-2 rounded mt-1">
            {process.env.DATABASE_URL ? 'SET (hidden)' : 'NOT SET'}
          </div>
        </div>
        
        <div>
          <strong>NEXT_PUBLIC_APP_URL:</strong>
          <div className="bg-gray-100 p-2 rounded mt-1">
            {process.env.NEXT_PUBLIC_APP_URL || 'NOT SET'}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <strong>All Environment Variables:</strong>
        <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto max-h-96">
          {JSON.stringify(process.env, null, 2)}
        </pre>
      </div>
    </div>
  );
}
