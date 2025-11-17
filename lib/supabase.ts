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
  id: string; // Changed from number to string for UUID
  title: string
  slug: string // Added required slug field
  excerpt?: string
  content: string
  status: 'draft' | 'published' | 'archived'
  publish_date: string
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

export interface ActivityLog {
  id: number // int8
  entity_type: 'video' | 'post' | 'testimonial' // basado en la tabla real
  entity_id: string // uuid
  action: 'create' | 'update' | 'delete' | 'feature' | 'unfeature' // basado en la tabla real
  old_data?: Record<string, any> // jsonb
  new_data?: Record<string, any> // jsonb
  occurred_at?: string // timestamptz (auto-generado por la BD)
}

export interface Testimonial {
  id: number
  stars_number: number
  author_name: string
  author_location: string
  author_picture_url: string
  testimonial_description: string
  created_at: string
}