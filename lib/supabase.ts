import { createClient } from '@supabase/supabase-js'

// Credenciales directas (sin variables de entorno)
const supabaseUrl = 'https://ndvtqycczedduplqmarg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kdnRxeWNjemVkZHVwbHFtYXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NjkwMjcsImV4cCI6MjA3NjU0NTAyN30.jAj4MqcoCFUeaq28ozJ2iRN3L_NXyWL4jkdF3BktdoU'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kdnRxeWNjemVkZHVwbHFtYXJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk2OTAyNywiZXhwIjoyMDc2NTQ1MDI3fQ.wEYdQe5tHw0gx6WsGae0-tx-vwUycX1bXAwToHdDyds'

console.log('Supabase Configuration:', {
  url: supabaseUrl,
  anonKey: supabaseAnonKey ? 'Present' : 'Missing',
  serviceKey: supabaseServiceKey ? 'Present' : 'Missing'
})

// Crear clientes
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Tipos para las tablas existentes
export interface BlogPost {
  id: number
  title: string
  excerpt?: string
  content: string
  author: string
  author_email?: string
  category: string
  status: 'draft' | 'published' | 'archived'
  publish_date: string
  image_url?: string
  read_time: string
  featured: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface FabFridayVideo {
  id: number
  title: string
  description?: string
  video_url: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  role: 'admin' | 'agent'
  name?: string
  created_at: string
  updated_at: string
}