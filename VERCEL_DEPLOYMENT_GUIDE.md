# Guía de Deployment en Vercel - Patron Real Estate

## 🚨 Problema Actual

El deployment en Vercel está fallando por **falta de variables de entorno**. El build local pasa perfectamente ✅, pero Vercel necesita configuración adicional.

---

## ✅ Solución: Configurar Variables de Entorno en Vercel

### Paso 1: Acceder a Vercel Dashboard

1. Ve a: https://vercel.com/dashboard
2. Busca el proyecto: **patron-real-estate-2-0**
3. Click en el proyecto

### Paso 2: Configurar Variables de Entorno

1. Ve a **Settings** → **Environment Variables**
2. Agrega las siguientes variables para **Production, Preview, y Development**:

```
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
NEXT_PUBLIC_SUPABASE_SERVICE_KEY=tu_supabase_service_key_aqui
```

**Importante:** Marca las 3 checkboxes (Production, Preview, Development) para cada variable.

### Paso 3: Forzar Redeploy

Después de agregar las variables:

1. Ve a **Deployments**
2. Encuentra el último deployment (commit: `ee44d2d`)
3. Click en los 3 puntos (...) → **Redeploy**
4. Confirma el redeploy

---

## 📋 Dónde Obtener las Variables de Supabase

### Opción 1: Desde el archivo local `.env.local`

Si tienes acceso al proyecto localmente:

```bash
cat .env.local
```

Copia los valores de:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_SERVICE_KEY`

### Opción 2: Desde Supabase Dashboard

1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `NEXT_PUBLIC_SUPABASE_SERVICE_KEY`

---

## 🔍 Verificar que el Deployment Funcionó

Después del redeploy, verifica:

1. **Status**: Debe cambiar de ❌ Error a ✅ Ready
2. **Tiempo**: ~3-5 minutos
3. **Página de prueba**: https://www.patronrealestateservices.com/property-management
   - Debe mostrar los botones "Search in English" y "Buscar en Español"
   - **NO** debe tener el widget de ApexIDX embebido

---

## 📝 Cambios Implementados en Este Release

### Features Principales:
✅ Property Management: ApexIDX reemplazado por IDX Broker (nueva pestaña)
✅ Buyers Page: Advanced Search button + Sticky CTA
✅ Blog: Fechas en formato US + Imágenes funcionando
✅ Broker Card: Diseño actualizado

### Fixes Técnicos:
✅ 10 páginas de debug con renderizado dinámico
✅ Redirects de páginas debug a 404 en producción
✅ Clientes Supabase con valores fallback
✅ Configuración de Vercel (`vercel.json`)

---

## 🆘 Si el Deployment Sigue Fallando

### Opción 1: Ver Logs Detallados

1. En Vercel, ve al deployment que falló
2. Click en **View Function Logs** o **Build Logs**
3. Copia el error exacto
4. Comparte el error con el equipo de desarrollo

### Opción 2: Build Local de Prueba

Si tienes acceso local:

```bash
cd /Users/Arkusnexus/PatronRealEstate-2.0
rm -rf .next
npm run build
```

Si el build local pasa pero Vercel falla, el problema es 100% de configuración de Vercel.

### Opción 3: Reinstalar Integración de Vercel

Si nada funciona:

1. Ve a GitHub → Settings → Integrations
2. Desconecta Vercel
3. Reconecta Vercel
4. Reconfigura las variables de entorno

---

## 📞 Contacto

Si necesitas ayuda adicional, contacta al equipo de desarrollo con:
- Commit ID: `ee44d2d`
- Branch: `feature/simplified-design`
- Error específico desde los logs de Vercel

---

**Última actualización:** 7 de enero de 2026
**Commits en este release:** ca84d13, c4b1f65, 6b6bb7f, 18b6e1a, c8b39fc, d2f35dc, ee44d2d

