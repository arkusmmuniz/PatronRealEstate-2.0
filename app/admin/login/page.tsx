"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, User, Loader2 } from "lucide-react"
import { auth } from "@/lib/auth-supabase"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log('Starting login process...')
      const result = await auth.login(email, password, "admin")
      console.log('Login result:', result)
      
      if (result.success) {
        console.log('Redirecting to admin dashboard...')
        router.push("/admin")
      } else {
        setError("Login failed. Please check your credentials.")
      }
    } catch (error: any) {
      console.error('Login error:', error)
      
      // Manejar diferentes tipos de errores
      if (error.message?.includes('Invalid login credentials')) {
        setError("Invalid email or password. Please try again.")
      } else if (error.message?.includes('Email not confirmed')) {
        setError("Please check your email and confirm your account before logging in.")
      } else if (error.message?.includes('Too many requests')) {
        setError("Too many login attempts. Please wait a moment and try again.")
      } else {
        setError(error.message || "Login failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image con overlay similar al homepage */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('/hero-living-room.jpg')`,
          }}
        />
        {/* Overlay oscuro para contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-md p-4">
        <div className="text-center mb-10">
          <Link href="/" className="text-white hover:text-lime-400 transition-colors drop-shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-grotesk font-bold leading-tight">
              Patron Real <span className="bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent">Estate</span>
            </h1>
          </Link>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto w-20 h-20 flex items-center justify-center p-3">
              <Image 
                src="/croped patron icon.png" 
                alt="Patron Icon" 
                width={80} 
                height={80} 
                className="object-contain"
              />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold">
                <span className="text-gray-700">Admin </span>
                <span className="bg-gradient-to-r from-lime-500 to-lime-600 bg-clip-text text-transparent">Login</span>
              </CardTitle>
              <CardDescription className="text-base text-gray-600">Access the administrative dashboard</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@patronrealestate.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 border-gray-200 focus:border-lime-500 focus:ring-lime-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-12 border-gray-200 focus:border-lime-500 focus:ring-lime-500"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
