import { describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
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

describe('Simple Product Integration Tests', () => {
  let authToken;

  beforeEach(async () => {
    // Limpiar la base de datos antes de cada test
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    // Crear usuario de prueba y obtener token
    const userData = {
      name: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      age: 25,
      password: 'Test123'
    };

    // Crear usuario
    await request(app)
      .post('/api/user/create')
      .send(userData)
      .expect(201);

    // Autenticar usuario
    const loginResponse = await request(app)
      .post('/api/user/login')
      .send({
        email: 'test@example.com',
        password: 'Test123'
      })
      .expect(200);

    authToken = loginResponse.body.token;
  });

  describe('Basic Product Operations', () => {
    it('debería crear una categoría y luego un producto correctamente', async () => {
      // 1. Crear categoría
      const categoryData = {
        name: 'Electrónicos'
      };

      const categoryResponse = await request(app)
        .post('/api/category/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send(categoryData)
        .expect(201);

      expect(categoryResponse.body.message).toBe('new category created');
      const categoryId = categoryResponse.body.data._id;

      // 2. Crear producto
      const productData = {
        name: 'Smartphone Samsung Galaxy S23',
        price: 899.99,
        description: 'Teléfono inteligente con pantalla AMOLED',
        category: categoryId,
        stock: 50,
        status: 'AVAILABLE'
      };

      const createResponse = await request(app)
        .post('/api/product/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData)
        .expect(200);

      expect(createResponse.body.name).toBe(productData.name.toLowerCase());
      expect(createResponse.body.price).toBe(productData.price);
      expect(createResponse.body.category).toBe(categoryId);
    });

    it('debería obtener todos los productos', async () => {
      // Crear categoría
      const categoryResponse = await request(app)
        .post('/api/category/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test Category' })
        .expect(201);

      const categoryId = categoryResponse.body.data._id;

      // Crear producto
      const productData = {
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        category: categoryId,
        stock: 10,
        status: 'AVAILABLE'
      };

      await request(app)
        .post('/api/product/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData)
        .expect(200);

      // Obtener todos los productos
      const getProductsResponse = await request(app)
        .get('/api/product/')
        .expect(200);

      expect(getProductsResponse.body).toHaveLength(1);
      expect(getProductsResponse.body[0].name).toBe(productData.name.toLowerCase());
    });

    it('debería manejar búsqueda de productos por nombre', async () => {
      // Crear categoría
      const categoryResponse = await request(app)
        .post('/api/category/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test Category' })
        .expect(201);

      const categoryId = categoryResponse.body.data._id;

      // Crear productos
      const products = [
        {
          name: 'Samsung Galaxy S23',
          price: 899.99,
          description: 'Smartphone Samsung',
          category: categoryId,
          stock: 10,
          status: 'AVAILABLE'
        },
        {
          name: 'iPhone 15',
          price: 999.99,
          description: 'Smartphone Apple',
          category: categoryId,
          stock: 5,
          status: 'AVAILABLE'
        }
      ];

      for (const product of products) {
        await request(app)
          .post('/api/product/create')
          .set('Authorization', `Bearer ${authToken}`)
          .send(product)
          .expect(200);
      }

      // Buscar productos que contengan "Samsung"
      const searchResponse = await request(app)
        .post('/api/product/name')
        .send({ name: 'Samsung' })
        .expect(200);

      expect(searchResponse.body.productExist).toHaveLength(1);
      expect(searchResponse.body.productExist[0].name).toContain('samsung');
    });

    it('debería obtener estados disponibles', async () => {
      const statusResponse = await request(app)
        .get('/api/product/status')
        .expect(200);

      expect(statusResponse.body).toEqual(['AVAILABLE', 'NOT AVAILABLE', 'DISCONTINUED']);
    });
  });

  describe('Product Error Handling', () => {
    it('debería manejar búsquedas de productos inexistentes', async () => {
      // Buscar producto por ID inexistente
      const fakeId = '507f1f77bcf86cd799439999';
      await request(app)
        .get(`/api/product/find-by-id/${fakeId}`)
        .expect(400);

      // Buscar producto por nombre inexistente (devuelve 200 con array vacío)
      const searchResponse = await request(app)
        .post('/api/product/name')
        .send({ name: 'ProductoInexistente' })
        .expect(200);

      expect(searchResponse.body.productExist).toHaveLength(0);
    });

    it('debería manejar actualización de producto inexistente', async () => {
      const fakeId = '507f1f77bcf86cd799439999';
      await request(app)
        .put(`/api/product/update/${fakeId}`)
        .send({ name: 'Nuevo Nombre' })
        .expect(400);
    });

    it('debería manejar eliminación de producto inexistente', async () => {
      const fakeId = '507f1f77bcf86cd799439999';
      await request(app)
        .delete(`/api/product/delete/${fakeId}`)
        .expect(400);
    });
  });
});
