// Script para probar la autenticación de Swagger
import fetch from 'node-fetch';

const testSwaggerAuth = async () => {
  const baseUrl = 'http://localhost:3000/api-docs';
  
  console.log('🔐 Probando autenticación de Swagger...\n');
  
  // Test 1: Sin autenticación (debería fallar)
  console.log('1️⃣ Probando sin autenticación...');
  try {
    const response1 = await fetch(baseUrl);
    console.log(`   Status: ${response1.status}`);
    if (response1.status === 401) {
      console.log('   ✅ Correcto: Acceso denegado sin credenciales');
    } else {
      console.log('   ❌ Error: Debería requerir autenticación');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
  
  // Test 2: Con credenciales correctas
  console.log('\n2️⃣ Probando con credenciales correctas...');
  try {
    const response2 = await fetch(baseUrl, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('admin:swagger123').toString('base64')
      }
    });
    console.log(`   Status: ${response2.status}`);
    if (response2.status === 200) {
      console.log('   ✅ Correcto: Acceso permitido con credenciales válidas');
    } else {
      console.log('   ❌ Error: Debería permitir acceso con credenciales válidas');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
  
  // Test 3: Con credenciales incorrectas
  console.log('\n3️⃣ Probando con credenciales incorrectas...');
  try {
    const response3 = await fetch(baseUrl, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('admin:wrongpassword').toString('base64')
      }
    });
    console.log(`   Status: ${response3.status}`);
    if (response3.status === 401) {
      console.log('   ✅ Correcto: Acceso denegado con credenciales incorrectas');
    } else {
      console.log('   ❌ Error: Debería denegar acceso con credenciales incorrectas');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
  
  console.log('\n🎉 Pruebas completadas!');
};

testSwaggerAuth();
