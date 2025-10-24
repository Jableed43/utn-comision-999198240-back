import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { productRoute } from '../../routes/productRoute.js';
import { categoryRoute } from '../../routes/categoryRoute.js';
import { userRoute } from '../../routes/userRoute.js';
import Product from '../../models/productModel.js';
import Category from '../../models/categoryModel.js';
import User from '../../models/userModel.js';

// Configurar la aplicación Express para testing
const app = express();
app.use(express.json());
app.use('/api/product', productRoute);
app.use('/api/category', categoryRoute);
app.use('/api/user', userRoute);

describe('Product Authentication Integration Flow', () => {
  let authToken;
  let categoryId;
  let productId;

  beforeEach(async () => {
    // Limpiar la base de datos antes de cada test
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
  });

  describe('Complete User-Product Management Flow', () => {
    it('debería simular un flujo completo de usuario autenticado gestionando productos', async () => {
      // FASE 1: Registro de usuario
      console.log('👤 Registrando usuario...');
      
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        age: 25,
        password: 'Password123'
      };

      const userResponse = await request(app)
        .post('/api/user/create')
        .send(userData)
        .expect(201);

      expect(userResponse.body.message).toBe('User created');
      console.log('✅ Usuario registrado exitosamente');

      // FASE 2: Autenticación
      console.log('🔐 Autenticando usuario...');
      
      const loginData = {
        email: 'juan.perez@example.com',
        password: 'Password123'
      };

      const loginResponse = await request(app)
        .post('/api/user/login')
        .send(loginData)
        .expect(200);

      expect(loginResponse.body.message).toBe('Logged in');
      expect(loginResponse.body.token).toBeDefined();
      authToken = loginResponse.body.token;
      console.log('✅ Usuario autenticado exitosamente');

      // FASE 3: Crear categorías (como administrador)
      console.log('📂 Creando categorías...');
      
      const categories = [
        { name: 'Electrónicos' },
        { name: 'Ropa' },
        { name: 'Hogar' }
      ];

      const createdCategories = [];
      for (const category of categories) {
        const response = await request(app)
          .post('/api/category/create')
          .send(category)
          .expect(201);
        
        createdCategories.push(response.body.data);
        console.log(`✅ Categoría creada: ${response.body.data.name}`);
      }

      categoryId = createdCategories[0]._id;

      // FASE 4: Gestión de productos
      console.log('📦 Gestionando productos...');
      
      // Crear producto
      const productData = {
        name: 'Smartphone Samsung Galaxy S23',
        price: 899.99,
        description: 'Teléfono inteligente con pantalla AMOLED',
        category: categoryId,
        stock: 50,
        status: 'AVAILABLE',
        profitRate: 0.2
      };

      const createProductResponse = await request(app)
        .post('/api/product/create')
        .send(productData)
        .expect(200);

      expect(createProductResponse.body.name).toBe(productData.name);
      expect(createProductResponse.body.category).toBe(categoryId);
      productId = createProductResponse.body._id;
      console.log(`✅ Producto creado: ${createProductResponse.body.name}`);

      // FASE 5: Operaciones de consulta
      console.log('🔍 Realizando consultas...');
      
      // Obtener todos los productos
      const getProductsResponse = await request(app)
        .get('/api/product/')
        .expect(200);

      expect(getProductsResponse.body).toHaveLength(1);
      expect(getProductsResponse.body[0].category.name).toBe('electrónicos');
      console.log(`📊 Total de productos: ${getProductsResponse.body.length}`);

      // Buscar producto por ID
      const getByIdResponse = await request(app)
        .get(`/api/product/find-by-id/${productId}`)
        .expect(200);

      expect(getByIdResponse.body.productExist._id).toBe(productId);
      console.log(`🔍 Producto encontrado por ID: ${getByIdResponse.body.productExist.name}`);

      // Buscar producto por nombre
      const searchResponse = await request(app)
        .post('/api/product/name')
        .send({ name: 'Samsung' })
        .expect(200);

      expect(searchResponse.body.productExist).toHaveLength(1);
      expect(searchResponse.body.productExist[0].name).toContain('Samsung');
      console.log(`🔍 Productos encontrados por nombre: ${searchResponse.body.productExist.length}`);

      // FASE 6: Gestión de inventario
      console.log('📦 Gestionando inventario...');
      
      // Simular venta (reducir stock)
      const updateStockResponse = await request(app)
        .put(`/api/product/update/${productId}`)
        .send({ stock: 45 }) // Reducir de 50 a 45
        .expect(201);

      expect(updateStockResponse.body.stock).toBe(45);
      console.log(`📦 Stock actualizado: ${updateStockResponse.body.stock}`);

      // Cambiar estado del producto
      const updateStatusResponse = await request(app)
        .put(`/api/product/update/${productId}`)
        .send({ status: 'NOT AVAILABLE' })
        .expect(201);

      expect(updateStatusResponse.body.status).toBe('NOT AVAILABLE');
      console.log(`🔄 Estado actualizado: ${updateStatusResponse.body.status}`);

      // FASE 7: Análisis de datos
      console.log('📊 Analizando datos...');
      
      // Obtener estados disponibles
      const statusResponse = await request(app)
        .get('/api/product/status')
        .expect(200);

      expect(statusResponse.body).toEqual(['AVAILABLE', 'NOT AVAILABLE', 'DISCONTINUED']);
      console.log(`📋 Estados disponibles: ${statusResponse.body.join(', ')}`);

      // Verificar inventario final
      const finalInventoryResponse = await request(app)
        .get('/api/product/')
        .expect(200);

      const unavailableProducts = finalInventoryResponse.body.filter(p => p.status === 'NOT AVAILABLE');
      expect(unavailableProducts).toHaveLength(1);
      console.log(`📊 Productos no disponibles: ${unavailableProducts.length}`);

      // FASE 8: Limpieza
      console.log('🗑️ Limpiando datos...');
      
      // Eliminar producto
      const deleteResponse = await request(app)
        .delete(`/api/product/delete/${productId}`)
        .expect(201);

      expect(deleteResponse.body.message).toBe('product deleted succesfully');
      console.log(`🗑️ Producto eliminado exitosamente`);

      // Verificar que el producto fue eliminado
      const getAfterDeleteResponse = await request(app)
        .get('/api/product/')
        .expect(204);

      console.log('🎉 Flujo de gestión de productos completado exitosamente!');
    });
  });

  describe('Product Management with Multiple Users', () => {
    it('debería manejar múltiples usuarios gestionando productos', async () => {
      // Crear múltiples usuarios
      const users = [
        {
          name: 'Admin',
          lastName: 'User',
          email: 'admin@example.com',
          age: 30,
          password: 'Admin123'
        },
        {
          name: 'Manager',
          lastName: 'User',
          email: 'manager@example.com',
          age: 28,
          password: 'Manager123'
        }
      ];

      const userTokens = [];
      for (const user of users) {
        // Crear usuario
        await request(app)
          .post('/api/user/create')
          .send(user)
          .expect(201);

        // Autenticar usuario
        const loginResponse = await request(app)
          .post('/api/user/login')
          .send({
            email: user.email,
            password: user.password
          })
          .expect(200);

        userTokens.push(loginResponse.body.token);
        console.log(`✅ Usuario ${user.name} autenticado`);
      }

      // Crear categoría
      const categoryResponse = await request(app)
        .post('/api/category/create')
        .send({ name: 'Test Category' })
        .expect(201);

      const categoryId = categoryResponse.body.data._id;

      // Cada usuario crea productos
      const productsPerUser = 3;
      for (let i = 0; i < users.length; i++) {
        for (let j = 1; j <= productsPerUser; j++) {
          const productData = {
            name: `Producto ${users[i].name} ${j}`,
            price: 100 + (i * 100) + (j * 10),
            description: `Producto creado por ${users[i].name}`,
            category: categoryId,
            stock: 10 + j,
            status: 'AVAILABLE'
          };

          await request(app)
            .post('/api/product/create')
            .send(productData)
            .expect(200);
        }
      }

      // Verificar que todos los productos fueron creados
      const allProductsResponse = await request(app)
        .get('/api/product/')
        .expect(200);

      expect(allProductsResponse.body).toHaveLength(users.length * productsPerUser);
      console.log(`📊 Total de productos creados: ${allProductsResponse.body.length}`);

      // Verificar que cada usuario puede ver todos los productos
      for (const token of userTokens) {
        const userProductsResponse = await request(app)
          .get('/api/product/')
          .expect(200);

        expect(userProductsResponse.body).toHaveLength(users.length * productsPerUser);
      }

      console.log('✅ Múltiples usuarios pueden gestionar productos correctamente');
    });
  });

  describe('Product Data Integrity', () => {
    it('debería mantener la integridad de los datos de productos', async () => {
      // Crear usuario
      const userData = {
        name: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        age: 25,
        password: 'Test123'
      };

      await request(app)
        .post('/api/user/create')
        .send(userData)
        .expect(201);

      // Autenticar
      const loginResponse = await request(app)
        .post('/api/user/login')
        .send({
          email: 'test@example.com',
          password: 'Test123'
        })
        .expect(200);

      // Crear categoría
      const categoryResponse = await request(app)
        .post('/api/category/create')
        .send({ name: 'Test Category' })
        .expect(201);

      const categoryId = categoryResponse.body.data._id;

      // Crear producto
      const productData = {
        name: 'Producto Test',
        price: 100.50,
        description: 'Descripción del producto',
        category: categoryId,
        stock: 25,
        status: 'AVAILABLE',
        profitRate: 0.15
      };

      const createResponse = await request(app)
        .post('/api/product/create')
        .send(productData)
        .expect(200);

      const productId = createResponse.body._id;

      // Verificar integridad de datos
      const getResponse = await request(app)
        .get(`/api/product/find-by-id/${productId}`)
        .expect(200);

      const product = getResponse.body.productExist;
      
      // Verificar que todos los campos se mantienen correctamente
      expect(product.name).toBe(productData.name);
      expect(product.price).toBe(productData.price);
      expect(product.description).toBe(productData.description);
      expect(product.category).toBe(categoryId);
      expect(product.stock).toBe(productData.stock);
      expect(product.status).toBe(productData.status);
      expect(product.profitRate).toBe(productData.profitRate);
      expect(product.createdAt).toBeDefined();
      expect(product.updatedAt).toBeDefined();

      console.log('✅ Integridad de datos verificada correctamente');
    });
  });
});
