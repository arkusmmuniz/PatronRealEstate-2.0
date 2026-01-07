// Script para verificar la conexión con Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;

console.log('🔍 Verificando conexión con Supabase...\n');

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('❌ Faltan variables de entorno de Supabase');
  console.log('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅' : '❌');
  process.exit(1);
}

console.log('📋 Configuración:');
console.log(`   URL: ${supabaseUrl}`);
console.log(`   Anon Key: ${supabaseAnonKey.substring(0, 20)}...`);
console.log(`   Service Key: ${supabaseServiceKey ? supabaseServiceKey.substring(0, 20) + '...' : 'NO CONFIGURADA'}\n`);

// Crear cliente
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Probar conexión básica
async function testConnection() {
  try {
    console.log('🔄 Probando conexión básica...');
    
    // Intentar obtener información de la sesión (no requiere autenticación)
    const { data, error } = await supabase.from('_test').select('*').limit(1);
    
    // Si hay error, puede ser porque la tabla no existe, pero eso está bien
    // Lo importante es que no sea un error de conexión
    if (error) {
      if (error.message.includes('relation') || 
          error.message.includes('does not exist') ||
          error.message.includes('schema cache') ||
          error.message.includes('Could not find the table')) {
        console.log('✅ Conexión exitosa (el error es esperado - tabla de prueba no existe)');
        console.log('   Esto significa que Supabase está respondiendo correctamente\n');
        return true;
      } else if (error.message.includes('JWT') || 
                 error.message.includes('Invalid API key') ||
                 error.message.includes('invalid') ||
                 error.message.includes('unauthorized')) {
        console.log('❌ Error de autenticación:');
        console.log(`   ${error.message}\n`);
        return false;
      } else {
        console.log('⚠️  Error inesperado:');
        console.log(`   ${error.message}\n`);
        return false;
      }
    }
    
    console.log('✅ Conexión exitosa\n');
    return true;
  } catch (err) {
    console.log('❌ Error de conexión:');
    console.log(`   ${err.message}\n`);
    return false;
  }
}

// Probar con una tabla común si existe
async function testTables() {
  const commonTables = ['blog_posts', 'fab_friday_videos', 'testimonials', 'users'];
  
  console.log('🔄 Verificando tablas comunes...\n');
  
  for (const table of commonTables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      
      if (error) {
        if (error.message.includes('relation') || error.message.includes('does not exist')) {
          console.log(`   ⚠️  Tabla "${table}": No existe`);
        } else {
          console.log(`   ❌ Tabla "${table}": Error - ${error.message}`);
        }
      } else {
        console.log(`   ✅ Tabla "${table}": Existe y accesible`);
      }
    } catch (err) {
      console.log(`   ❌ Tabla "${table}": Error - ${err.message}`);
    }
  }
  
  console.log('');
}

// Ejecutar pruebas
(async () => {
  const connectionOk = await testConnection();
  
  if (connectionOk) {
    await testTables();
    console.log('✅ Verificación completada\n');
    process.exit(0);
  } else {
    console.log('❌ Verificación fallida\n');
    process.exit(1);
  }
})();

