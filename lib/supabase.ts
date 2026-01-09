import { createClient } from '@supabase/supabase-js'

// Credenciales desde variables de entorno
const supabaseUrl:any = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey:any = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey:any = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || ''

// Detectar si estamos en runtime (no en build)
const isRuntime = typeof window !== 'undefined' || process.env.NEXT_PHASE === 'phase-production-server';

// Validar que las variables de entorno estén configuradas en runtime
if (isRuntime && (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey)) {
  console.error('⚠️ SUPABASE ERROR: Missing environment variables in production!');
  console.error('Missing:', {
    NEXT_PUBLIC_SUPABASE_URL: !supabaseUrl,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !supabaseAnonKey,
    NEXT_PUBLIC_SUPABASE_SERVICE_KEY: !supabaseServiceKey
  });
}

// Crear clientes solo si las variables están disponibles
// Durante el build, esto puede no estar disponible, por lo que usamos valores dummy
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key')

export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : createClient('https://placeholder.supabase.co', 'placeholder-key', {
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
  image_url?: string // Optional image URL for blog post
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
  author_picture_url: string
  publication_date: any
  testimonial_description: string
  created_at: string
}