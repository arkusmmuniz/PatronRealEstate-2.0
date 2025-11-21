import { supabase, supabaseAdmin, BlogPost, FabFridayVideo, User, ActivityLog, Testimonial } from './supabase'

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
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Obtener videos públicos (para frontend)
  async getPublicVideos(): Promise<FabFridayVideo[]> {
    const { data, error } = await supabaseAdmin
      .from('videos')
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
      .from('videos')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Crear nuevo video
  async createVideo(video: Omit<FabFridayVideo, 'id' | 'created_at' | 'updated_at'>, userId?: string): Promise<FabFridayVideo> {
    console.log('Creating video in service:', video);
    
    const { data, error } = await supabaseAdmin
      .from('videos')
      .insert([video])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase create video error:', error);
      throw error;
    }
    
    console.log('Video created successfully:', data);
    
    // Log activity
    try {
      await activityService.logActivity({
        entity_type: 'video',
        entity_id: data.id.toString(),
        action: 'create',
        new_data: data,
      });
    } catch (logError) {
      console.error('Error logging activity:', logError);
    }
    
    return data;
  },

  // Actualizar video
  async updateVideo(id: number, updates: Partial<FabFridayVideo>): Promise<FabFridayVideo> {
    // Obtener data anterior para el log
    const { data: oldData } = await supabaseAdmin
      .from('videos')
      .select('*')
      .eq('id', id)
      .single();
    
    const { data, error } = await supabaseAdmin
      .from('videos')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    // Log activity
    try {
      await activityService.logActivity({
        entity_type: 'video',
        entity_id: id.toString(),
        action: 'update',
        old_data: oldData,
        new_data: data,
      });
    } catch (logError) {
      console.error('Error logging activity:', logError);
    }
    
    return data
  },

  // Eliminar video
  async deleteVideo(id: number, userId?: string, videoTitle?: string): Promise<void> {
    // Obtener data para el log antes de eliminar
    const { data: oldData } = await supabaseAdmin
      .from('videos')
      .select('*')
      .eq('id', id)
      .single();
    
    const { error } = await supabaseAdmin
      .from('videos')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    // Log activity
    try {
      await activityService.logActivity({
        entity_type: 'video',
        entity_id: id.toString(),
        action: 'delete',
        old_data: oldData,
      });
    } catch (logError) {
      console.error('Error logging activity:', logError);
    }
  },

  // Toggle featured (solo puede haber uno featured)
  async toggleFeatured(id: number, userId?: string, videoTitle?: string, isFeatured?: boolean): Promise<void> {
    // Obtener estado anterior
    const { data: oldData } = await supabaseAdmin
      .from('videos')
      .select('*')
      .eq('id', id)
      .single();
    
    // Primero desactivar todos los featured
    await supabaseAdmin
      .from('videos')
      .update({ featured: false })
      .neq('id', id)
    
    // Luego activar el seleccionado
    const { data: newData, error } = await supabaseAdmin
      .from('videos')
      .update({ featured: true, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    // Log activity
    try {
      const action = isFeatured === false ? 'feature' : 'unfeature';
      await activityService.logActivity({
        entity_type: 'video',
        entity_id: id.toString(),
        action,
        old_data: oldData,
        new_data: newData,
      });
    } catch (logError) {
      console.error('Error logging activity:', logError);
    }
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

// Funciones para Activity Logs
export const activityService = {
  // Crear un log de actividad
  async logActivity(activity: Omit<ActivityLog, 'id'>): Promise<ActivityLog> {
    const { data, error } = await supabaseAdmin
      .from('activity_log')
      .insert([activity])
      .select()
      .single()
    
    if (error) {
      console.error('Error logging activity:', error);
      throw error;
    }
    return data
  },

  // Obtener logs de actividad
  async getActivityLogs(limit = 50): Promise<ActivityLog[]> {
    try {
      const { data, error } = await supabaseAdmin
        .from('activity_log')
        .select('*')
        .order('occurred_at', { ascending: false })
        .limit(limit)
      
      if (error) {
        console.error('Error fetching activity logs:', error);
        throw error;
      }
      return data || []
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      throw error;
    }
  },

  // Obtener logs de actividad por tipo de entidad
  async getActivityLogsByType(entityType: 'video' | 'post' | 'testimonial', limit = 50): Promise<ActivityLog[]> {
    try {
      const { data, error } = await supabaseAdmin
        .from('activity_log')
        .select('*')
        .eq('entity_type', entityType)
        .order('occurred_at', { ascending: false })
        .limit(limit)
      
      if (error) {
        console.error('Error fetching activity logs by type:', error);
        throw error;
      }
      return data || []
    } catch (error) {
      console.error('Error fetching activity logs by type:', error);
      throw error;
    }
  }
}

export const testimonialService = {
  // Obtener todos los testimonios (para admin)
  async getAllTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .order('publication_date', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getAllTestimonialsWithRange(min: number, max: number): Promise<Testimonial[]> {
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .order('publication_date', { ascending: false })
      .range(min, max)
    
    if (error) throw error
    return data || []
  },

  // Obtener testimonio por ID
  async getTestimonialById(id: number): Promise<Testimonial | null> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Crear nuevo video
  async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Promise<Testimonial> {
    console.log('Creating video in service:', testimonial);
    
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .insert([testimonial])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase create video error:', error);
      throw error;
    }
    
    console.log('Video created successfully:', data);
    
    // Log activity
    try {
      await activityService.logActivity({
        entity_type: 'testimonial',
        entity_id: data.id.toString(),
        action: 'create',
        new_data: data,
      });
    } catch (logError) {
      console.error('Error logging activity:', logError);
    }
    
    return data;
  },

  // Actualizar testimonio
  async updateTestimonial(id: number, updates: Partial<Testimonial>): Promise<Testimonial> {
    // Obtener data anterior para el log
    const { data: oldData } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();
    
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    // Log activity
    try {
      await activityService.logActivity({
        entity_type: 'testimonial',
        entity_id: id.toString(),
        action: 'update',
        old_data: oldData,
        new_data: data,
      });
    } catch (logError) {
      console.error('Error logging activity:', logError);
    }
    
    return data
  },

  // Eliminar testimonio
  async deleteTestimonial(id: number): Promise<void> {
    // Obtener data para el log antes de eliminar
    const { data: oldData } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();
    
    const { error } = await supabaseAdmin
      .from('testimonials')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    // Log activity
    try {
      await activityService.logActivity({
        entity_type: 'testimonial',
        entity_id: id.toString(),
        action: 'delete',
        old_data: oldData,
      });
    } catch (logError) {
      console.error('Error logging activity:', logError);
    }
  },
}