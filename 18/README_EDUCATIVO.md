# 📚 Sistema CRUD Educativo - Node.js + Express + MongoDB + Handlebars

## 🎯 **¿Qué es este proyecto?**

Este es un sistema completo de gestión que permite:
- **Crear, leer, actualizar y eliminar** usuarios, categorías y productos
- **Autenticación** con login/logout
- **Relaciones** entre productos y categorías
- **Interfaz web** simple y fácil de entender

## 🏗️ **Arquitectura del Proyecto**

### **Patrón MVC (Model-View-Controller)**
```
📁 src/
├── 📁 models/          # 📊 MODELOS - Estructura de datos
│   ├── userModel.js       # Usuario: nombre, email, edad, password
│   ├── categoryModel.js  # Categoría: nombre
│   └── productModel.js   # Producto: nombre, precio, categoría
├── 📁 views/           # 🎨 VISTAS - Lo que ve el usuario
│   ├── layouts/main.handlebars  # Plantilla principal
│   ├── user/                   # Vistas de usuarios
│   ├── category/               # Vistas de categorías
│   └── product/                # Vistas de productos
├── 📁 controllers/     # 🎮 CONTROLADORES - Lógica de la aplicación
│   ├── userController.js       # Maneja usuarios
│   ├── categoryController.js   # Maneja categorías
│   └── productController.js    # Maneja productos
├── 📁 services/        # 🔧 SERVICIOS - Lógica de negocio
│   ├── userService.js          # Operaciones con usuarios
│   ├── categoryService.js      # Operaciones con categorías
│   └── productService.js       # Operaciones con productos
└── 📁 routes/          # 🛣️ RUTAS - URLs de la aplicación
    ├── userRoute.js            # /user/*
    ├── categoryRoute.js        # /category/*
    └── productRoute.js         # /product/*
```

## 🚀 **¿Cómo funciona?**

### **1. Flujo de una Petición**
```
Usuario hace clic → Ruta → Controlador → Servicio → Modelo → Base de Datos
                ↓
Usuario ve resultado ← Vista ← Controlador ← Servicio ← Modelo ← Base de Datos
```

### **2. Ejemplo: Crear un Usuario**
1. **Usuario** llena formulario en `/user/create`
2. **Ruta** `/user/create` (POST) recibe los datos
3. **Controlador** `createUser()` procesa la petición
4. **Servicio** `createUserService()` valida y guarda
5. **Modelo** `User` define la estructura
6. **Base de datos** MongoDB guarda el usuario
7. **Vista** muestra mensaje de éxito

## 📋 **Funcionalidades del Sistema**

### **👥 Gestión de Usuarios**
- ✅ **Registro:** Crear nuevos usuarios
- ✅ **Login:** Iniciar sesión
- ✅ **Lista:** Ver todos los usuarios
- ✅ **Editar:** Modificar datos de usuario
- ✅ **Eliminar:** Borrar usuarios
- ✅ **Logout:** Cerrar sesión

### **📂 Gestión de Categorías**
- ✅ **Crear:** Nuevas categorías
- ✅ **Lista:** Ver todas las categorías
- ✅ **Eliminar:** Borrar categorías

### **🛍️ Gestión de Productos**
- ✅ **Crear:** Nuevos productos (con categoría opcional)
- ✅ **Lista:** Ver todos los productos
- ✅ **Editar:** Modificar productos
- ✅ **Eliminar:** Borrar productos
- ✅ **Relaciones:** Productos pueden tener categorías

## 🛠️ **Tecnologías Utilizadas**

### **Backend**
- **Node.js:** Entorno de ejecución de JavaScript
- **Express.js:** Framework web para Node.js
- **MongoDB:** Base de datos NoSQL
- **Mongoose:** ODM (Object Document Mapper) para MongoDB
- **Handlebars:** Motor de plantillas para HTML

### **Autenticación**
- **JWT:** Tokens para autenticación
- **bcrypt:** Encriptación de contraseñas
- **express-session:** Manejo de sesiones

### **Frontend**
- **HTML5:** Estructura de las páginas
- **CSS3:** Estilos simples y responsivos
- **JavaScript:** Interactividad básica
- **Font Awesome:** Iconos

## 📚 **Plan de Enseñanza - 5 Horas**

### **🕐 Hora 1: Introducción y Estructura (60 min)**
#### **Contenido:**
1. **¿Qué es un CRUD?** (15 min)
   - Create (Crear)
   - Read (Leer)
   - Update (Actualizar)
   - Delete (Eliminar)

2. **Arquitectura MVC** (20 min)
   - **Modelo:** Estructura de datos
   - **Vista:** Lo que ve el usuario
   - **Controlador:** Lógica de la aplicación

3. **Configuración del proyecto** (25 min)
   - Variables de entorno
   - Conexión a MongoDB
   - Middlewares básicos

#### **🎯 Objetivos:**
- Entender qué es un CRUD
- Conocer la arquitectura MVC
- Configurar el entorno de desarrollo

### **🕐 Hora 2: Modelos y Base de Datos (60 min)**
#### **Contenido:**
1. **Modelo de Usuario** (20 min)
   ```javascript
   // Estructura del modelo de usuario
   const userSchema = new mongoose.Schema({
       name: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       age: { type: Number, required: true },
       password: { type: String, required: true }
   });
   ```

2. **Modelo de Categoría** (15 min)
   ```javascript
   // Modelo simple de categoría
   const categorySchema = new mongoose.Schema({
       name: { type: String, required: true, unique: true }
   });
   ```

3. **Modelo de Producto** (25 min)
   ```javascript
   // Modelo con relaciones
   const productSchema = new mongoose.Schema({
       name: { type: String, required: true },
       price: { type: Number, required: true },
       category: { 
           type: mongoose.Schema.Types.ObjectId, 
           ref: "category",
           required: false  // Categoría opcional
       }
   });
   ```

#### **🎯 Objetivos:**
- Entender qué son los modelos
- Aprender a definir esquemas
- Comprender las relaciones entre modelos

### **🕐 Hora 3: Controladores y Lógica (60 min)**
#### **Contenido:**
1. **Controlador de Usuarios** (25 min)
   ```javascript
   // Función para crear usuario
   export const createUser = async (req, res) => {
       try {
           // 1. Llamar al servicio
           const response = await createUserService(req.body)
           
           // 2. Guardar mensaje de éxito
           req.session.message = "Usuario creado exitosamente"
           
           // 3. Redirigir a la lista
           res.redirect("/user/getAll")
       } catch (error) {
           // 4. Manejar errores
           req.session.message = error.message
           res.redirect("/user/create")
       }
   };
   ```

2. **Controlador de Categorías** (15 min)
   ```javascript
   // CRUD simple para categorías
   export const createCategory = async (req, res) => {
       // Lógica similar pero más simple
   };
   ```

3. **Controlador de Productos** (20 min)
   ```javascript
   // CRUD con relaciones
   export const createProduct = async (req, res) => {
       // Incluir categorías en el formulario
   };
   ```

#### **🎯 Objetivos:**
- Entender qué hacen los controladores
- Aprender a manejar errores
- Comprender el flujo de datos

### **🕐 Hora 4: Vistas y Handlebars (60 min)**
#### **Contenido:**
1. **Layout principal** (15 min)
   ```handlebars
   <!-- Estructura básica -->
   <!DOCTYPE html>
   <html>
   <head>
       <title>{{title}}</title>
   </head>
   <body>
       <header>Navegación</header>
       <main>{{{body}}}</main>
   </body>
   </html>
   ```

2. **Formularios simples** (25 min)
   ```handlebars
   <!-- Formulario de creación -->
   <form action="/user/create" method="POST">
       <input type="text" name="name" required>
       <input type="email" name="email" required>
       <button type="submit">Crear</button>
   </form>
   ```

3. **Listas y tablas** (20 min)
   ```handlebars
   <!-- Lista de usuarios -->
   {{#each users}}
       <div>{{name}} - {{email}}</div>
   {{/each}}
   ```

#### **🎯 Objetivos:**
- Entender Handlebars básico
- Crear formularios funcionales
- Mostrar datos en listas

### **🕐 Hora 5: Autenticación y Pruebas (60 min)**
#### **Contenido:**
1. **Sistema de Login** (30 min)
   ```javascript
   // Flujo de autenticación
   export const validate = async (req, res) => {
       // 1. Validar credenciales
       const result = await validateUserService(email, password)
       
       // 2. Guardar en sesión
       req.session.userId = result.userId
       req.session.userName = result.userName
       
       // 3. Redirigir
       res.redirect("/")
   };
   ```

2. **Protección de rutas** (15 min)
   ```javascript
   // Middleware de autenticación
   const authMiddleware = (req, res, next) => {
       if (req.session.userId) {
           next(); // Continuar
       } else {
           res.redirect('/user/login'); // Redirigir al login
       }
   };
   ```

3. **Pruebas y debugging** (15 min)
   - Probar todas las funcionalidades
   - Identificar errores comunes
   - Soluciones básicas

#### **🎯 Objetivos:**
- Entender la autenticación
- Aprender a proteger rutas
- Probar el sistema completo

## 🎨 **Diseño Simplificado**

### **Características del Diseño:**
- ✅ **Colores simples:** Azul, verde, rojo, gris
- ✅ **Formularios básicos:** Campos simples y claros
- ✅ **Navegación intuitiva:** Enlaces fáciles de entender
- ✅ **Responsive:** Se adapta a diferentes pantallas
- ✅ **Iconos básicos:** Font Awesome para claridad

### **Paleta de Colores:**
```css
:root {
    --primary: #007bff;      /* Azul principal */
    --success: #28a745;      /* Verde para éxito */
    --danger: #dc3545;       /* Rojo para peligro */
    --warning: #ffc107;      /* Amarillo para advertencia */
    --light: #f8f9fa;        /* Gris claro */
    --dark: #343a40;         /* Gris oscuro */
}
```

## 🔧 **Comandos Útiles**

### **Instalación:**
```bash
npm install
```

### **Ejecutar el proyecto:**
```bash
npm start
```

### **Insertar datos de prueba:**
```bash
npm run mock:all
```

### **Ejecutar solo categorías:**
```bash
npm run mock:categories
```

## 📝 **Estructura de Archivos Importantes**

### **Archivos de Configuración:**
- `package.json` - Dependencias y scripts
- `index.js` - Servidor principal
- `config.js` - Variables de entorno
- `db.js` - Conexión a MongoDB

### **Archivos de Modelos:**
- `src/models/userModel.js` - Esquema de usuario
- `src/models/categoryModel.js` - Esquema de categoría
- `src/models/productModel.js` - Esquema de producto

### **Archivos de Controladores:**
- `src/controllers/userController.js` - Lógica de usuarios
- `src/controllers/categoryController.js` - Lógica de categorías
- `src/controllers/productController.js` - Lógica de productos

### **Archivos de Vistas:**
- `src/views/layouts/main.handlebars` - Plantilla principal
- `src/views/user/` - Vistas de usuarios
- `src/views/category/` - Vistas de categorías
- `src/views/product/` - Vistas de productos

## 🎯 **Conceptos Clave para Entender**

### **1. CRUD Operations:**
- **Create:** Crear nuevos registros
- **Read:** Leer/ver registros existentes
- **Update:** Actualizar registros existentes
- **Delete:** Eliminar registros

### **2. MVC Pattern:**
- **Model:** Estructura de datos (esquemas)
- **View:** Interfaz de usuario (templates)
- **Controller:** Lógica de la aplicación

### **3. HTTP Methods:**
- **GET:** Obtener datos
- **POST:** Crear datos
- **PUT/PATCH:** Actualizar datos
- **DELETE:** Eliminar datos

### **4. Database Relations:**
- **One-to-Many:** Una categoría puede tener muchos productos
- **Optional Relations:** Productos pueden no tener categoría

## 🚀 **Próximos Pasos**

### **Para Estudiantes:**
1. **Entender el flujo:** Request → Controller → Service → Model → Database
2. **Practicar:** Crear nuevas funcionalidades
3. **Experimentar:** Modificar estilos y funcionalidades
4. **Aprender:** Leer el código y entender cada parte

### **Para Profesores:**
1. **Explicar paso a paso:** Cada archivo y su función
2. **Mostrar ejemplos:** Cómo funciona cada operación
3. **Practicar juntos:** Crear funcionalidades en clase
4. **Evaluar:** Probar el sistema completo

## 📞 **Soporte y Ayuda**

### **Errores Comunes:**
1. **MongoDB no conecta:** Verificar que MongoDB esté ejecutándose
2. **Variables de entorno:** Verificar archivo `.env`
3. **Dependencias:** Ejecutar `npm install`
4. **Puerto ocupado:** Cambiar puerto en `.env`

### **Debugging:**
1. **Revisar consola:** Ver errores en terminal
2. **Verificar rutas:** Comprobar que las URLs sean correctas
3. **Revisar datos:** Verificar que los datos se envíen correctamente
4. **Probar paso a paso:** Ir función por función

---

## 🎉 **¡Felicidades!**

Has creado un sistema CRUD completo con:
- ✅ **Autenticación** funcional
- ✅ **Tres entidades** relacionadas
- ✅ **Interfaz web** simple y clara
- ✅ **Código educativo** y bien comentado

**¡Ahora puedes enseñar y aprender desarrollo web de manera práctica y efectiva!** 🚀
