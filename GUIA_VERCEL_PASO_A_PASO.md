# 🚀 Guía Paso a Paso: Configurar Variables en Vercel

## 📋 Variables que Necesitas Configurar

Copia estas 3 variables exactamente como están:

### Variable 1: NEXT_PUBLIC_SUPABASE_URL
```
https://ndvtqycczedduplqmarg.supabase.co
```

### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kdnRxeWNjemVkZHVwbHFtYXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NjkwMjcsImV4cCI6MjA3NjU0NTAyN30.jAj4MqcoCFUeaq28ozJ2iRN3L_NXyWL4jkdF3BktdoU
```

### Variable 3: NEXT_PUBLIC_SUPABASE_SERVICE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kdnRxeWNjemVkZHVwbHFtYXJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk2OTAyNywiZXhwIjoyMDc2NTQ1MDI3fQ.wEYdQe5tHw0gx6WsGae0-tx-vwUycX1bXAwToHdDyds
```

---

## 🎯 Pasos en Vercel (10 minutos)

### Paso 1: Ir a Vercel Dashboard
1. Abre tu navegador
2. Ve a: **https://vercel.com/login**
3. Inicia sesión con tu cuenta

### Paso 2: Abrir tu Proyecto
1. En el dashboard, busca el proyecto: **patron-real-estate-2-0**
2. Click en el proyecto para abrirlo

### Paso 3: Ir a Settings
1. En la parte superior, click en la pestaña **"Settings"**
2. En el menú lateral izquierdo, click en **"Environment Variables"**

---

## ➕ Agregar Variable 1: SUPABASE_URL

### Paso 3.1: Click en "Add New"
- Verás un botón que dice **"Add New"** o **"Add Environment Variable"**
- Click en ese botón

### Paso 3.2: Llenar el Formulario

**Campo "Key" (Nombre):**
```
NEXT_PUBLIC_SUPABASE_URL
```

**Campo "Value" (Valor):**
```
https://ndvtqycczedduplqmarg.supabase.co
```

**Sección "Environments" (Casillas de verificación):**
- ✅ Marca: **Production**
- ✅ Marca: **Preview**
- ✅ Marca: **Development**

*(Deben estar las 3 marcadas)*

### Paso 3.3: Guardar
- Click en **"Save"** o **"Add"**
- ✅ Listo! Variable 1 agregada

---

## ➕ Agregar Variable 2: SUPABASE_ANON_KEY

### Paso 4.1: Click en "Add New" nuevamente

### Paso 4.2: Llenar el Formulario

**Campo "Key":**
```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Campo "Value":**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kdnRxeWNjemVkZHVwbHFtYXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NjkwMjcsImV4cCI6MjA3NjU0NTAyN30.jAj4MqcoCFUeaq28ozJ2iRN3L_NXyWL4jkdF3BktdoU
```

**Environments:**
- ✅ Production
- ✅ Preview
- ✅ Development

### Paso 4.3: Guardar
- Click en **"Save"**
- ✅ Listo! Variable 2 agregada

---

## ➕ Agregar Variable 3: SUPABASE_SERVICE_KEY

### Paso 5.1: Click en "Add New" una vez más

### Paso 5.2: Llenar el Formulario

**Campo "Key":**
```
NEXT_PUBLIC_SUPABASE_SERVICE_KEY
```

**Campo "Value":**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kdnRxeWNjemVkZHVwbHFtYXJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk2OTAyNywiZXhwIjoyMDc2NTQ1MDI3fQ.wEYdQe5tHw0gx6WsGae0-tx-vwUycX1bXAwToHdDyds
```

**Environments:**
- ✅ Production
- ✅ Preview
- ✅ Development

### Paso 5.3: Guardar
- Click en **"Save"**
- ✅ Listo! Variable 3 agregada

---

## 🔄 Paso 6: Redeploy (Muy Importante)

**Las variables NO se aplican automáticamente**, necesitas hacer un redeploy:

### 6.1: Ir a Deployments
1. En la parte superior, click en la pestaña **"Deployments"**
2. Verás una lista de deployments

### 6.2: Seleccionar el Último Deployment
1. Click en el **primer deployment** de la lista (el más reciente)
2. Se abrirá la página de detalles del deployment

### 6.3: Hacer Redeploy
1. En la esquina superior derecha, verás un botón con **3 puntos** (⋯)
2. Click en los 3 puntos
3. En el menú, selecciona **"Redeploy"**
4. Te preguntará si estás seguro, click en **"Redeploy"** nuevamente

### 6.4: Esperar
- ⏱️ El proceso toma **2-3 minutos**
- Verás una barra de progreso
- Espera hasta que diga: **✅ "Ready"**

---

## ✅ Paso 7: Verificar que Funciona

Una vez que el deployment esté listo (status: Ready):

### 7.1: Abrir Blog
1. Abre una **nueva pestaña** en tu navegador
2. Ve a: **https://www.patronrealestateservices.com/blog**
3. ✅ **Debe mostrar**: Las 3 entradas del blog
4. ❌ **NO debe mostrar**: "No articles found"

### 7.2: Abrir Videos
1. Ve a: **https://www.patronrealestateservices.com/videos**
2. ✅ **Debe mostrar**: Los videos de FabFriday
3. ❌ **NO debe mostrar**: "Coming Soon"

### 7.3: Verificar Consola (Opcional)
1. En la página, presiona **F12** (o click derecho → Inspeccionar)
2. Ve a la pestaña **"Console"**
3. ✅ **NO debe haber** errores de "Error fetching blog posts" o "Error fetching videos"

---

## 🎉 ¡Listo!

Si ves el contenido correctamente:
- ✅ Blog muestra entradas
- ✅ Videos muestra videos
- ✅ No hay errores en consola

**El problema está resuelto!**

---

## ❓ Si Algo Sale Mal

### Problema: Aún aparece "No articles found"

**Soluciones:**
1. **Espera 2-3 minutos más** - A veces tarda en propagarse
2. **Limpia la caché del navegador**:
   - Presiona `Cmd + Shift + R` (Mac) o `Ctrl + Shift + R` (Windows)
3. **Verifica las variables**:
   - Ve a Vercel → Settings → Environment Variables
   - Asegúrate que las 3 variables estén allí
   - Verifica que cada una tenga las 3 casillas marcadas (Production, Preview, Development)
4. **Haz otro Redeploy**:
   - A veces es necesario hacer 2 redeployments

### Problema: No puedo agregar variables

**Soluciones:**
1. Verifica que estás en la cuenta correcta de Vercel
2. Verifica que tienes permisos de admin en el proyecto
3. Intenta refrescar la página de Vercel

---

## 📞 Contacto

Si necesitas ayuda, avísame y te ayudo a debuggear.

**Una vez que funcione, me avisas para hacer el push del fix a GitHub!** 🚀
