// Script para verificar que las variables de entorno estén configuradas correctamente
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando variables de entorno...\n');

// Leer .env.local
const envPath = path.join(__dirname, '..', '.env.local');
let envVars = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  console.log('✅ Archivo .env.local encontrado\n');
} else {
  console.log('❌ Archivo .env.local NO encontrado\n');
  process.exit(1);
}

// Variables requeridas
const requiredVars = [
  'NEXT_PUBLIC_API_KEY',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_SERVICE_KEY'
];

console.log('📋 Verificando variables requeridas:\n');

let allPresent = true;
requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (value && value.length > 0) {
    const displayValue = varName.includes('KEY') || varName.includes('SECRET') 
      ? `${value.substring(0, 10)}...` 
      : value;
    console.log(`  ✅ ${varName}: ${displayValue}`);
  } else {
    console.log(`  ❌ ${varName}: NO CONFIGURADA`);
    allPresent = false;
  }
});

console.log('\n');

// Verificar formato de URLs
if (envVars.NEXT_PUBLIC_SUPABASE_URL) {
  const url = envVars.NEXT_PUBLIC_SUPABASE_URL;
  if (url.startsWith('https://') && url.includes('.supabase.co')) {
    console.log('✅ NEXT_PUBLIC_SUPABASE_URL tiene formato correcto');
  } else {
    console.log('⚠️  NEXT_PUBLIC_SUPABASE_URL puede tener formato incorrecto');
  }
}

// Verificar que las keys no estén vacías
const keyVars = [
  'NEXT_PUBLIC_API_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_SERVICE_KEY'
];

console.log('\n🔑 Verificando longitud de keys:\n');
keyVars.forEach(varName => {
  const value = envVars[varName];
  if (value) {
    if (value.length > 20) {
      console.log(`  ✅ ${varName}: ${value.length} caracteres (OK)`);
    } else {
      console.log(`  ⚠️  ${varName}: ${value.length} caracteres (puede ser muy corta)`);
    }
  }
});

console.log('\n');

if (allPresent) {
  console.log('✅ Todas las variables requeridas están configuradas\n');
  console.log('💡 Recuerda reiniciar el servidor de desarrollo si aún no lo has hecho');
  process.exit(0);
} else {
  console.log('❌ Faltan algunas variables requeridas\n');
  process.exit(1);
}














