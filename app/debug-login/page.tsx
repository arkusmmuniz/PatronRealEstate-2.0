"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

// Forzar renderizado dinámico para evitar errores en build
export const dynamic = 'force-dynamic';

export default function LoginDebug() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testLogin = async () => {
    try {
      setError(null);
      setResult(null);
      
      console.log('Testing login with:', { email, password });
      
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('Login result:', { data, loginError });
      
      if (loginError) {
        setError(`Login Error: ${loginError.message}`);
        setResult({ error: loginError });
      } else {
        setResult({ 
          success: true, 
          user: data.user,
          session: data.session 
        });
      }
      
    } catch (err) {
      console.error('Test login error:', err);
      setError(`Connection Error: ${err}`);
      setResult({ error: err });
    }
  };

  const testConnection = async () => {
    try {
      setError(null);
      setResult(null);
      
      console.log('Testing Supabase connection...');
      
      const { data, error: connError } = await supabase
        .from('users')
        .select('*')
        .limit(1);
      
      console.log('Connection test result:', { data, connError });
      
      if (connError) {
        setError(`Connection Error: ${connError.message}`);
        setResult({ error: connError });
      } else {
        setResult({ 
          success: true, 
          data,
          message: 'Connection successful' 
        });
      }
      
    } catch (err) {
      console.error('Connection test error:', err);
      setError(`Connection Error: ${err}`);
      setResult({ error: err });
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login Debug - Supabase Auth</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter password"
          />
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={testLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Login
          </button>
          
          <button
            onClick={testConnection}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Test Connection
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
      
      <div className="mb-4">
        <strong>Supabase Client Info:</strong>
        <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
          {JSON.stringify({
            supabaseUrl: supabase?.supabaseUrl || 'Not available',
            supabaseKey: supabase?.supabaseKey ? 'Present' : 'Not available',
            auth: supabase?.auth ? 'Available' : 'Not available'
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
