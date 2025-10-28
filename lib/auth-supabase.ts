"use client"

import { supabase } from './supabase'

export const auth = {
  // Login con Supabase
  async login(email: string, password: string, role: "admin" | "agent" = "admin") {
    try {
      console.log('Attempting login with:', { email, role });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('Login response:', { data, error });

      if (error) {
        console.error('Supabase auth error:', error);
        throw new Error(error.message || 'Authentication failed');
      }

      if (data.user) {
        console.log('Login successful:', data.user);
        
        // Guardar información adicional en localStorage para compatibilidad
        localStorage.setItem("userRole", role)
        localStorage.setItem("userEmail", email)
        
        // También setear cookies para el middleware
        document.cookie = `userRole=${role}; path=/; max-age=86400`
        document.cookie = `userEmail=${email}; path=/; max-age=86400`
        
        return { success: true, user: data.user }
      }
      
      throw new Error('No user data returned from authentication')
    } catch (error: any) {
      console.error('Login error:', error)
      throw error
    }
  },

  // Logout
  async logout() {
    try {
      await supabase.auth.signOut()
      
      // Limpiar localStorage
      localStorage.removeItem("userRole")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("agentName")

      // Limpiar cookies
      document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "userEmail=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"

      window.location.href = "/"
    } catch (error) {
      console.error('Logout error:', error)
      // Forzar redirección incluso si hay error
      window.location.href = "/"
    }
  },

  // Obtener usuario actual
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error) {
        console.error('Error getting current user:', error)
        return null
      }
      
      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  },

  // Verificar autenticación (compatibilidad con sistema anterior)
  isAuthenticated: (requiredRole?: "admin" | "agent") => {
    if (typeof window === "undefined") return false

    const role = localStorage.getItem("userRole")
    if (!role) return false

    if (requiredRole) return role === requiredRole
    return true
  },

  // Obtener información del usuario (compatibilidad con sistema anterior)
  getUser: () => {
    if (typeof window === "undefined") return null

    return {
      role: localStorage.getItem("userRole"),
      email: localStorage.getItem("userEmail"),
      name: localStorage.getItem("agentName"),
    }
  }
}