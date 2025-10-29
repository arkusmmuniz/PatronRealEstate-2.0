import { supabase, supabaseAdmin, BlogPost, FabFridayVideo, User } from './supabase'

// Función para generar slug a partir del título
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
    .trim()
    .replace(/^-|-$/g, ''); // Remover guiones al inicio y final
}

// Funciones para Blog Posts
export const blogService = {
  // Obtener todos los posts (para admin)
  async getAllPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Obtener posts publicados (para frontend público)
  async getPublishedPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }
    return data || []
  },

  // Obtener post por ID
  async getPostById(id: string): Promise<BlogPost | null> {
    console.log('Getting blog post by ID:', id);
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
    
    console.log('Blog post query result:', { data, error });
    
    if (error) {
      console.error('Error getting blog post:', error);
      throw error;
    }
    
    return data
  },

  // Crear nuevo post
  async createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
    console.log('Creating blog post in service:', post);
    
    // Solo enviar campos mínimos requeridos
    const minimalPostData = {
      title: post.title,
      slug: post.slug || generateSlug(post.title),
      content: post.content,
      status: post.status || "draft",
    };
    
    console.log('Minimal post data to send:', minimalPostData);
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([minimalPostData])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase create blog post error:', error);
      throw error;
    }
    
    console.log('Blog post created successfully:', data);
    return data
  },

  // Actualizar post
  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Eliminar post
  async deletePost(id: string): Promise<void> {
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Funciones para FabFriday Videos
export const videoService = {
  // Obtener todos los videos (para admin)
  async getAllVideos(): Promise<FabFridayVideo[]> {
    const { data, error } = await supabaseAdmin
      .from('Videos')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Obtener videos públicos (para frontend)
  async getPublicVideos(): Promise<FabFridayVideo[]> {
    const { data, error } = await supabaseAdmin
      .from('Videos')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching videos:', error)
      throw error
    }
    return data || []
  },

  // Obtener video por ID
  async getVideoById(id: number): Promise<FabFridayVideo | null> {
    const { data, error } = await supabase
      .from('Videos')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Crear nuevo video
  async createVideo(video: Omit<FabFridayVideo, 'id' | 'created_at' | 'updated_at'>): Promise<FabFridayVideo> {
    console.log('Creating video in service:', video);
    
    const { data, error } = await supabaseAdmin
      .from('Videos')
      .insert([video])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase create video error:', error);
      throw error;
    }
    
    console.log('Video created successfully:', data);
    return data;
  },

  // Actualizar video
  async updateVideo(id: number, updates: Partial<FabFridayVideo>): Promise<FabFridayVideo> {
    const { data, error } = await supabaseAdmin
      .from('Videos')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Eliminar video
  async deleteVideo(id: number): Promise<void> {
    const { error } = await supabaseAdmin
      .from('Videos')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Toggle featured (solo puede haber uno featured)
  async toggleFeatured(id: number): Promise<void> {
    // Primero desactivar todos los featured
    await supabaseAdmin
      .from('Videos')
      .update({ featured: false })
      .neq('id', id)
    
    // Luego activar el seleccionado
    const { error } = await supabaseAdmin
      .from('Videos')
      .update({ featured: true, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    if (error) throw error
  }
}

// Funciones para Users (autenticación)
export const userService = {
  // Obtener usuario por email
  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error) throw error
    return data
  },

  // Crear usuario
  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([user])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Actualizar usuario
  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}