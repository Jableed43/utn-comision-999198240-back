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

describe('Product Integration Tests', () => {
  let categoryId;
  let productId;
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

  describe('Product CRUD Flow', () => {
    it('debería crear una categoría, luego un producto, y realizar operaciones CRUD completas', async () => {
      // 1. Crear una categoría primero
      const categoryData = {
        name: 'Electrónicos'
      };

      const categoryResponse = await request(app)
        .post('/api/category/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send(categoryData)
        .expect(201);

      expect(categoryResponse.body.message).toBe('new category created');
      expect(categoryResponse.body.data.name).toBe('electrónicos');
      categoryId = categoryResponse.body.data._id;

      // 2. Crear un producto
      const productData = {
        name: 'Smartphone Samsung Galaxy S23',
        price: 899.99,
        description: 'Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas',
        category: categoryId,
        stock: 50,
        status: 'AVAILABLE',
        profitRate: 1.2
      };

      const createResponse = await request(app)
        .post('/api/product/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData)
        .expect(200);

      expect(createResponse.body.name).toBe(productData.name.toLowerCase());
      expect(createResponse.body.price).toBe(productData.price);
      expect(createResponse.body.category).toBe(categoryId);
      productId = createResponse.body._id;

      // 3. Obtener todos los productos
      const getProductsResponse = await request(app)
        .get('/api/product/')
        .expect(200);

      expect(getProductsResponse.body).toHaveLength(1);
      expect(getProductsResponse.body[0].name).toBe(productData.name.toLowerCase());
      expect(getProductsResponse.body[0].category.name).toBe('electrónicos');

      // 4. Buscar producto por ID
      const getByIdResponse = await request(app)
        .get(`/api/product/find-by-id/${productId}`)
        .expect(200);

      expect(getByIdResponse.body.productExist._id).toBe(productId);
      expect(getByIdResponse.body.productExist.name).toBe(productData.name.toLowerCase());

      // 5. Buscar producto por nombre
      const searchResponse = await request(app)
        .post('/api/product/name')
        .send({ name: 'Samsung' })
        .expect(200);

      expect(searchResponse.body.productExist).toHaveLength(1);
      expect(searchResponse.body.productExist[0].name).toContain('samsung');

      // 6. Actualizar producto
      const updateData = {
        name: 'Smartphone Samsung Galaxy S23 Ultra Pro Max',
        price: 1099.99,
        stock: 25
      };

      const updateResponse = await request(app)
        .put(`/api/product/update/${productId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(201);

      expect(updateResponse.body.name).toBe(updateData.name.toLowerCase());
      expect(updateResponse.body.price).toBe(updateData.price);
      expect(updateResponse.body.stock).toBe(updateData.stock);

      // 7. Obtener estados disponibles
      const statusResponse = await request(app)
        .get('/api/product/status')
        .expect(200);

      expect(statusResponse.body).toEqual(['AVAILABLE', 'NOT AVAILABLE', 'DISCONTINUED']);

      // 8. Eliminar producto
      const deleteResponse = await request(app)
        .delete(`/api/product/delete/${productId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(201);

      expect(deleteResponse.body.message).toBe('product deleted succesfully');
      expect(deleteResponse.body.deletedProduct._id).toBe(productId);

      // 9. Verificar que el producto fue eliminado
      const getAfterDeleteResponse = await request(app)
        .get('/api/product/')
        .expect(204);
    });
  });

  describe('Product-Category Relationships', () => {
    it('debería manejar correctamente las relaciones entre productos y categorías', async () => {
      // Crear múltiples categorías
      const categories = [
        { name: 'Electrónicos' },
        { name: 'Ropa' },
        { name: 'Hogar' }
      ];

      const createdCategories = [];
      for (const category of categories) {
        const response = await request(app)
          .post('/api/category/create')
          .set('Authorization', `Bearer ${authToken}`)
          .send(category)
          .expect(201);
        createdCategories.push(response.body.data);
      }

      // Crear productos en diferentes categorías
      const products = [
        {
          name: 'Smartphone iPhone 15',
          price: 999.99,
          description: 'Teléfono inteligente Apple',
          category: createdCategories[0]._id, // Electrónicos
          stock: 30,
          status: 'AVAILABLE'
        },
        {
          name: 'Camiseta Nike',
          price: 29.99,
          description: 'Camiseta deportiva',
          category: createdCategories[1]._id, // Ropa
          stock: 100,
          status: 'AVAILABLE'
        },
        {
          name: 'Sofá 3 plazas',
          price: 599.99,
          description: 'Sofá cómodo para sala',
          category: createdCategories[2]._id, // Hogar
          stock: 5,
          status: 'AVAILABLE'
        }
      ];

      const createdProducts = [];
      for (const product of products) {
        const response = await request(app)
          .post('/api/product/create')
          .set('Authorization', `Bearer ${authToken}`)
          .send(product)
          .expect(200);
        createdProducts.push(response.body);
      }

      // Obtener todos los productos con sus categorías
      const getProductsResponse = await request(app)
        .get('/api/product/')
        .expect(200);

      expect(getProductsResponse.body).toHaveLength(3);

      // Verificar que cada producto tiene su categoría correcta
      const productsWithCategories = getProductsResponse.body;
      expect(productsWithCategories[0].category.name).toBe('electrónicos');
      expect(productsWithCategories[1].category.name).toBe('ropa');
      expect(productsWithCategories[2].category.name).toBe('hogar');
    });
  });

  describe('Product Validation and Error Handling', () => {
    it('debería manejar errores de validación correctamente', async () => {
      // Crear una categoría primero
      const categoryResponse = await request(app)
        .post('/api/category/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test Category' })
        .expect(201);

      const categoryId = categoryResponse.body.data._id;

      // Intentar crear producto sin campos requeridos
      const invalidProduct = {
        name: '', // Nombre vacío
        price: -100, // Precio negativo
        description: 'Test',
        category: categoryId,
        stock: -5 // Stock negativo
      };

      // Este test debería fallar en la validación de Mongoose
      const response = await request(app)
        .post('/api/product/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidProduct)
        .expect(500);

      // Verificar que se devolvió un error de validación
      expect(response.body.message).toContain('internal server error');
    });

    it('debería manejar búsquedas de productos inexistentes', async () => {
      // Buscar producto por ID inexistente
      const fakeId = '507f1f77bcf86cd799439999';
      await request(app)
        .get(`/api/product/find-by-id/${fakeId}`)
        .expect(400);

      // Buscar producto por nombre inexistente
      const searchResponse = await request(app)
        .post('/api/product/name')
        .send({ name: 'ProductoInexistente' })
        .expect(200);
      
      // Verificar que se devuelve un array vacío
      expect(searchResponse.body.productExist).toHaveLength(0);

      // Actualizar producto inexistente
      await request(app)
        .put(`/api/product/update/${fakeId}`)
        .send({ name: 'Nuevo Nombre' })
        .expect(400);

      // Eliminar producto inexistente
      await request(app)
        .delete(`/api/product/delete/${fakeId}`)
        .expect(400);
    });
  });

  describe('Product Status Management', () => {
    it('debería manejar diferentes estados de productos', async () => {
      // Crear categoría
      const categoryResponse = await request(app)
        .post('/api/category/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test Category' })
        .expect(201);

      const categoryId = categoryResponse.body.data._id;

      // Crear productos con diferentes estados
      const products = [
        {
          name: 'Producto Disponible',
          price: 100,
          description: 'Producto disponible para venta',
          category: categoryId,
          stock: 10,
          status: 'AVAILABLE'
        },
        {
          name: 'Producto No Disponible',
          price: 200,
          description: 'Producto temporalmente no disponible',
          category: categoryId,
          stock: 0,
          status: 'NOT AVAILABLE'
        },
        {
          name: 'Producto Discontinuado',
          price: 300,
          description: 'Producto discontinuado del mercado',
          category: categoryId,
          stock: 0,
          status: 'DISCONTINUED'
        }
      ];

      for (const product of products) {
        await request(app)
          .post('/api/product/create')
          .set('Authorization', `Bearer ${authToken}`)
          .send(product)
          .expect(200);
      }

      // Obtener todos los productos
      const response = await request(app)
        .get('/api/product/')
        .expect(200);

      expect(response.body).toHaveLength(3);

      // Verificar que cada producto tiene su estado correcto
      const productsWithStatus = response.body;
      expect(productsWithStatus[0].status).toBe('AVAILABLE');
      expect(productsWithStatus[1].status).toBe('NOT AVAILABLE');
      expect(productsWithStatus[2].status).toBe('DISCONTINUED');
    });
  });

  describe('Product Search and Filtering', () => {
    it('debería permitir búsquedas parciales y filtrado de productos', async () => {
      // Crear categoría
      const categoryResponse = await request(app)
        .post('/api/category/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Electrónicos' })
        .expect(201);

      const categoryId = categoryResponse.body.data._id;

      // Crear productos con nombres similares
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
          name: 'Samsung Galaxy S24',
          price: 999.99,
          description: 'Smartphone Samsung más nuevo',
          category: categoryId,
          stock: 5,
          status: 'AVAILABLE'
        },
        {
          name: 'iPhone 15 Pro',
          price: 1099.99,
          description: 'Smartphone Apple',
          category: categoryId,
          stock: 8,
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
      const samsungSearch = await request(app)
        .post('/api/product/name')
        .send({ name: 'Samsung' })
        .expect(200);

      expect(samsungSearch.body.productExist).toHaveLength(2);
      expect(samsungSearch.body.productExist[0].name).toContain('samsung');
      expect(samsungSearch.body.productExist[1].name).toContain('samsung');

      // Buscar productos que contengan "Galaxy"
      const galaxySearch = await request(app)
        .post('/api/product/name')
        .send({ name: 'Galaxy' })
        .expect(200);

      expect(galaxySearch.body.productExist).toHaveLength(2);
      expect(galaxySearch.body.productExist[0].name).toContain('galaxy');
      expect(galaxySearch.body.productExist[1].name).toContain('galaxy');

      // Buscar productos que contengan "iPhone"
      const iphoneSearch = await request(app)
        .post('/api/product/name')
        .send({ name: 'iPhone' })
        .expect(200);

      expect(iphoneSearch.body.productExist).toHaveLength(1);
      expect(iphoneSearch.body.productExist[0].name).toContain('iphone');
    });
  });
});
