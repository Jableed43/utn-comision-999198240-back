# 🗄️ Scripts de Datos Mock - Sistema de Gestión

## 📋 **Descripción**

Este directorio contiene scripts para insertar datos mock en MongoDB para el sistema de gestión CRUD con Handlebars. Los scripts están diseñados para poblar la base de datos con datos de prueba realistas.

## 📁 **Archivos Disponibles**

### **Scripts Individuales**
- `categories.js` - Inserta 10 categorías de productos
- `users.js` - Inserta 10 usuarios de prueba
- `products.js` - Inserta 15 productos con relaciones a categorías

### **Script Completo**
- `insert-all.js` - Ejecuta todos los scripts en secuencia

## 🚀 **Cómo Usar**

### **Opción 1: Ejecutar Todo de Una Vez (Recomendado)**
```bash
# Desde la raíz del proyecto (carpeta 18)
node mock-data/insert-all.js
```

### **Opción 2: Ejecutar Scripts Individuales**
```bash
# Solo categorías
node mock-data/categories.js

# Solo usuarios
node mock-data/users.js

# Solo productos (requiere categorías existentes)
node mock-data/products.js
```

## 📊 **Datos que se Insertan**

### **Categorías (10)**
- electrónicos
- ropa
- hogar
- deportes
- libros
- juguetes
- automotriz
- belleza
- alimentación
- muebles

### **Usuarios (10)**
- **juan perez** - juan.perez@email.com
- **maria garcia** - maria.garcia@email.com
- **carlos lopez** - carlos.lopez@email.com
- **ana martinez** - ana.martinez@email.com
- **pedro rodriguez** - pedro.rodriguez@email.com
- **laura fernandez** - laura.fernandez@email.com
- **diego sanchez** - diego.sanchez@email.com
- **sofia ramirez** - sofia.ramirez@email.com
- **miguel torres** - miguel.torres@email.com
- **isabella flores** - isabella.flores@email.com

**Contraseña para todos:** `Password123`

### **Productos (15)**
- **laptop gaming** - $1500 (electrónicos) - Destacado
- **smartphone samsung** - $800 (electrónicos) - Destacado
- **camiseta algodon** - $25 (ropa)
- **tenis nike** - $120 (deportes) - Destacado
- **mesa comedor** - $300 (muebles)
- **libro programacion** - $45 (libros)
- **auriculares bluetooth** - $80 (electrónicos)
- **balon futbol** - $35 (deportes)
- **crema hidratante** - $15 (belleza)
- **cafetera automatica** - $200 (hogar) - Destacado
- **juego mesa** - $55 (juguetes)
- **aceite motor** - $30 (automotriz)
- **cereal integral** - $8 (alimentación)
- **silla oficina** - $180 (muebles)
- **tablet android** - $250 (electrónicos) - Sin stock

## 🔧 **Configuración Requerida**

### **Variables de Entorno**
Asegúrate de tener configurado el archivo `.env`:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017
UTN_DB=utn_database
SECRET=tu_secreto_jwt_muy_seguro_aqui_123456789
```

### **Dependencias**
Las dependencias deben estar instaladas:
```bash
npm install
```

## 📈 **Características de los Datos Mock**

### **Usuarios**
- **Edades variadas** (22-35 años)
- **Emails únicos** y válidos
- **Contraseñas seguras** (encriptadas automáticamente)
- **Nombres realistas** en español

### **Productos**
- **Precios variados** ($8 - $1500)
- **Márgenes de ganancia** realistas (1.20 - 1.80)
- **Estados diferentes** (AVAILABLE, NOT AVAILABLE)
- **Stock variado** (0 - 200 unidades)
- **Productos destacados** marcados
- **Relaciones con categorías** establecidas

### **Categorías**
- **Nombres descriptivos** y realistas
- **Variedad de sectores** comerciales
- **Relaciones con productos** establecidas

## 🎯 **Casos de Uso de Prueba**

### **Autenticación**
- Login con usuarios existentes
- Registro de nuevos usuarios
- Validación de contraseñas

### **Gestión de Productos**
- Listado con categorías
- Búsqueda por nombre
- Filtrado por estado
- Gestión de stock

### **Relaciones**
- Productos con categorías
- Validación de referencias
- Populate de datos relacionados

## 🚨 **Notas Importantes**

### **Orden de Ejecución**
1. **Categorías** (primero)
2. **Usuarios** (independiente)
3. **Productos** (requiere categorías)

### **Limpieza de Datos**
- Los scripts **eliminan datos existentes** antes de insertar
- **No ejecutar en producción** sin respaldo
- **Solo para desarrollo** y testing

### **Dependencias**
- **MongoDB** debe estar ejecutándose
- **Conexión** a la base de datos configurada
- **Modelos** de Mongoose cargados

## 🔄 **Reiniciar Datos**

Para limpiar y volver a insertar todos los datos:
```bash
node mock-data/insert-all.js
```

## 📞 **Soporte**

Si encuentras problemas:
1. **Verificar conexión** a MongoDB
2. **Revisar variables** de entorno
3. **Confirmar dependencias** instaladas
4. **Ejecutar en orden** correcto

---

**¡Datos mock listos para probar el sistema!** 🚀
