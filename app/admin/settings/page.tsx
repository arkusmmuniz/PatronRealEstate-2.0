"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from "lucide-react";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string; // Este id corresponde al user.id de auth.users
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  role?: string;
}

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      
      // Obtener el usuario actual de Supabase Auth
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error("Error getting user:", userError);
        toast({
          title: "Error",
          description: "No se pudo obtener la información del usuario",
          variant: "destructive",
        });
        return;
      }

      console.log("👤 Usuario autenticado:", {
        id: user.id,
        email: user.email
      });

      // Obtener el perfil desde la tabla profiles
      // La tabla profiles usa 'id' como clave, que corresponde al id del usuario en auth.users
      console.log("🔍 Buscando perfil en tabla 'profiles' con user.id:", user.id);
      
      // Usar supabaseAdmin para evitar problemas de RLS (Row Level Security)
      const { data: profileData, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      
      console.log("📊 Resultado de consulta profiles:", {
        encontroPerfil: !!profileData,
        tieneError: !!profileError,
        datos: profileData,
        error: profileError
      });
      
      // Manejar errores solo si son críticos
      if (profileError) {
        const errorMessage = profileError?.message;
        const errorCode = profileError?.code;
        const hasRealContent = errorMessage || errorCode;
        
        // Solo mostrar error si es crítico (no errores de "no encontrado")
        if (hasRealContent && errorCode !== "PGRST116" && errorCode !== "42P01") {
          console.error("Error al cargar perfil:", profileError);
          toast({
            title: "Error al cargar perfil",
            description: errorMessage || "Error desconocido al cargar el perfil",
            variant: "destructive",
          });
        }
      }

      if (profileData) {
        console.log("✅ PERFIL ENCONTRADO en tabla profiles!");
        console.log("📋 Datos completos del perfil:", JSON.stringify(profileData, null, 2));
        
        // El perfil existe - extraer los datos directamente de la tabla profiles
        // Estos valores hacen match con first_name y last_name de la tabla
        setProfile(profileData);
        
        // Extraer los valores de la tabla profiles (NO de auth.users)
        const firstNameRaw = profileData.first_name;
        const lastNameRaw = profileData.last_name;
        const emailRaw = profileData.email;
        
        console.log("🔍 Valores RAW de profiles:", {
          first_name: firstNameRaw,
          last_name: lastNameRaw,
          email: emailRaw,
          tipo_first_name: typeof firstNameRaw,
          tipo_last_name: typeof lastNameRaw
        });
        
        const firstNameValue = firstNameRaw ? String(firstNameRaw).trim() : "";
        const lastNameValue = lastNameRaw ? String(lastNameRaw).trim() : "";
        const emailValue = emailRaw ? String(emailRaw).trim() : (user.email || "");
        
        console.log("✨ Valores procesados que se establecerán en los estados:", {
          firstNameValue,
          lastNameValue,
          emailValue
        });
        
        // Establecer los estados con los valores de la tabla profiles
        setEmail(emailValue);
        setFirstName(firstNameValue);
        setLastName(lastNameValue);
        
        console.log("✅ Estados establecidos desde la tabla profiles");
      } else {
        // No existe el perfil todavía
        console.log("No se encontró perfil para este usuario. Usando datos de auth.");
        setEmail(user.email || "");
        setFirstName("");
        setLastName("");
        setProfile(null);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al cargar el perfil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      // Validar que las contraseñas coincidan
      if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match. Please try again",
        variant: "destructive",
      });
        return;
      }

      // Validar que la nueva contraseña tenga al menos 6 caracteres
      if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
        return;
      }

      setChangingPassword(true);

      // Obtener el usuario actual
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast({
          title: "Error",
          description: "No se pudo obtener la información del usuario",
          variant: "destructive",
        });
        return;
      }

      // Actualizar la contraseña usando Supabase Auth
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        console.error("Error al actualizar contraseña:", updateError);
        toast({
          title: "Error",
          description: updateError.message || "Ocurrió un error al actualizar la contraseña",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Password updated successfully",
        variant: "success",
      });

      // Limpiar los campos
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al cambiar la contraseña",
        variant: "destructive",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Obtener el usuario actual
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast({
          title: "Error",
          description: "No se pudo obtener la información del usuario",
          variant: "destructive",
        });
        return;
      }

      // Actualizar solo first_name y last_name en la tabla profiles
      // NO actualizamos el email desde aquí por seguridad
      if (profile) {
        // Actualizar perfil existente usando supabaseAdmin para evitar RLS
        const { error: updateError } = await supabaseAdmin
          .from("profiles")
          .update({
            first_name: firstName,
            last_name: lastName,
            // No actualizamos email - mantener必须是 el valor actual de la BD
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (updateError) {
          console.error("Error al actualizar perfil:", updateError);
          throw updateError;
        }
      } else {
        // Crear nuevo perfil usando supabaseAdmin para evitar RLS
        // Usar el email del usuario autenticado, no el del formulario
        const { error: insertError } = await supabaseAdmin
          .from("profiles")
          .insert([{ 
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email: user.email, // Usar el email del usuario autenticado
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }]);

        if (insertError) {
          console.error("Error al crear perfil:", insertError);
          throw insertError;
        }
      }

      toast({
        title: "Éxito",
        description: "Perfil actualizado correctamente",
      });

      // Recargar el perfil
      await loadUserProfile();
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al guardar el perfil",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    const first = firstName?.charAt(0).toUpperCase() || "";
    const last = lastName?.charAt(0).toUpperCase() || "";
    return first + last || email?.charAt(0).toUpperCase() || "A";
  };

  const getDisplayName = () => {
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    if (lastName) return lastName;
    return "Admin";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin <span className="bg-gradient-to-r from-lime-500 to-lime-600 bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences.
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin <span className="bg-gradient-to-r from-lime-500 to-lime-600 bg-clip-text text-transparent">Profile</span>
        </h1>
        <p className="text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={getDisplayName()} />
                <AvatarFallback className="bg-lime-500 text-white text-2xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-lime-500 text-white flex items-center justify-center hover:bg-lime-600 transition-colors border-2 border-white">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{getDisplayName()}</h3>
              <p className="text-sm text-gray-600">{email || "No email"}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                disabled
                className="bg-gray-50 cursor-not-allowed"
                title="El email no se puede modificar desde aquí por seguridad"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input 
              id="newPassword" 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <Button 
            onClick={handlePasswordChange}
            disabled={changingPassword || newPassword.length === 0 || confirmPassword.length === 0 || newPassword !== confirmPassword}
            className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {changingPassword ? "Updating Password..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button 
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Guardando..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
