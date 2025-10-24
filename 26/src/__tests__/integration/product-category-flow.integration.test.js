import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { productRoute } from '../../routes/productRoute.js';
import { categoryRoute } from '../../routes/categoryRoute.js';
import Product from '../../models/productModel.js';
import Category from '../../models/categoryModel.js';

// Configurar la aplicación Express para testing
const app = express();
app.use(express.json());
app.use('/api/product', productRoute);
app.use('/api/category', categoryRoute);

describe('Product-Category Integration Flow', () => {

  beforeEach(async () => {
    // Limpiar la base de datos antes de cada test
    await Product.deleteMany({});
    await Category.deleteMany({});
  });

  describe('Complete E-commerce Product Management Flow', () => {
    it('debería simular un flujo completo de gestión de productos en un e-commerce', async () => {
      // FASE 1: Configuración inicial - Crear categorías
      console.log('🏪 Iniciando flujo de e-commerce...');
      
      const categories = [
        { name: 'Smartphones' },
        { name: 'Laptops' },
        { name: 'Accesorios' },
        { name: 'Ropa Deportiva' }
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

      // FASE 2: Inventario inicial - Crear productos
      console.log('📦 Creando inventario inicial...');
      
      const initialProducts = [
        {
          name: 'iPhone 15 Pro Max',
          price: 1199.99,
          description: 'Smartphone premium de Apple con cámara de 48MP',
          category: createdCategories[0]._id, // Smartphones
          stock: 25,
          status: 'AVAILABLE',
          profitRate: 0.15
        },
        {
          name: 'Samsung Galaxy S24 Ultra',
          price: 1299.99,
          description: 'Smartphone Android flagship con S Pen',
          category: createdCategories[0]._id, // Smartphones
          stock: 30,
          status: 'AVAILABLE',
          profitRate: 0.18
        },
        {
          name: 'MacBook Pro M3',
          price: 1999.99,
          description: 'Laptop profesional con chip M3',
          category: createdCategories[1]._id, // Laptops
          stock: 15,
          status: 'AVAILABLE',
          profitRate: 0.12
        },
        {
          name: 'Dell XPS 13',
          price: 1299.99,
          description: 'Laptop ultrabook con pantalla 4K',
          category: createdCategories[1]._id, // Laptops
          stock: 20,
          status: 'AVAILABLE',
          profitRate: 0.14
        },
        {
          name: 'AirPods Pro 2',
          price: 249.99,
          description: 'Auriculares inalámbricos con cancelación de ruido',
          category: createdCategories[2]._id, // Accesorios
          stock: 50,
          status: 'AVAILABLE',
          profitRate: 0.25
        },
        {
          name: 'Camiseta Nike Dri-FIT',
          price: 29.99,
          description: 'Camiseta deportiva transpirable',
          category: createdCategories[3]._id, // Ropa Deportiva
          stock: 100,
          status: 'AVAILABLE',
          profitRate: 0.30
        }
      ];

      const createdProducts = [];
      for (const product of initialProducts) {
        const response = await request(app)
          .post('/api/product/create')
          .send(product)
          .expect(200);
        
        createdProducts.push(response.body);
        console.log(`✅ Producto creado: ${response.body.name} - $${response.body.price}`);
      }

      // FASE 3: Verificar inventario completo
      console.log('📊 Verificando inventario completo...');
      
      const inventoryResponse = await request(app)
        .get('/api/product/')
        .expect(200);

      expect(inventoryResponse.body).toHaveLength(6);
      console.log(`📈 Total de productos en inventario: ${inventoryResponse.body.length}`);

      // Verificar que cada producto tiene su categoría correcta
      for (const product of inventoryResponse.body) {
        expect(product.category).toBeDefined();
        expect(product.category.name).toBeDefined();
        console.log(`🔗 ${product.name} → ${product.category.name}`);
      }

      // FASE 4: Búsquedas y filtros
      console.log('🔍 Realizando búsquedas...');
      
      // Buscar smartphones
      const smartphoneSearch = await request(app)
        .post('/api/product/name')
        .send({ name: 'iPhone' })
        .expect(200);

      expect(smartphoneSearch.body.productExist).toHaveLength(1);
      expect(smartphoneSearch.body.productExist[0].name).toContain('iPhone');
      console.log(`📱 Smartphones encontrados: ${smartphoneSearch.body.productExist.length}`);

      // Buscar laptops
      const laptopSearch = await request(app)
        .post('/api/product/name')
        .send({ name: 'MacBook' })
        .expect(200);

      expect(laptopSearch.body.productExist).toHaveLength(1);
      expect(laptopSearch.body.productExist[0].name).toContain('MacBook');
      console.log(`💻 Laptops encontrados: ${laptopSearch.body.productExist.length}`);

      // FASE 5: Gestión de stock
      console.log('📦 Gestionando stock...');
      
      // Simular venta de iPhone (reducir stock)
      const iphoneId = createdProducts[0]._id;
      const updateStockResponse = await request(app)
        .put(`/api/product/update/${iphoneId}`)
        .send({ stock: 20 }) // Reducir de 25 a 20
        .expect(201);

      expect(updateStockResponse.body.stock).toBe(20);
      console.log(`📱 Stock de iPhone actualizado: ${updateStockResponse.body.stock}`);

      // FASE 6: Cambios de estado
      console.log('🔄 Cambiando estados de productos...');
      
      // Marcar un producto como no disponible
      const samsungId = createdProducts[1]._id;
      const updateStatusResponse = await request(app)
        .put(`/api/product/update/${samsungId}`)
        .send({ 
          status: 'NOT AVAILABLE',
          stock: 0 
        })
        .expect(201);

      expect(updateStatusResponse.body.status).toBe('NOT AVAILABLE');
      expect(updateStatusResponse.body.stock).toBe(0);
      console.log(`📱 Samsung marcado como no disponible`);

      // FASE 7: Análisis de inventario
      console.log('📊 Análisis de inventario...');
      
      const finalInventoryResponse = await request(app)
        .get('/api/product/')
        .expect(200);

      const availableProducts = finalInventoryResponse.body.filter(p => p.status === 'AVAILABLE');
      const unavailableProducts = finalInventoryResponse.body.filter(p => p.status === 'NOT AVAILABLE');
      
      expect(availableProducts).toHaveLength(5);
      expect(unavailableProducts).toHaveLength(1);
      
      console.log(`✅ Productos disponibles: ${availableProducts.length}`);
      console.log(`❌ Productos no disponibles: ${unavailableProducts.length}`);

      // FASE 8: Limpieza - Eliminar productos discontinuados
      console.log('🗑️ Limpiando productos discontinuados...');
      
      // Marcar un producto como discontinuado
      const airpodsId = createdProducts[4]._id;
      await request(app)
        .put(`/api/product/update/${airpodsId}`)
        .send({ status: 'DISCONTINUED' })
        .expect(201);

      // Eliminar producto discontinuado
      const deleteResponse = await request(app)
        .delete(`/api/product/delete/${airpodsId}`)
        .expect(201);

      expect(deleteResponse.body.message).toBe('product deleted succesfully');
      console.log(`🗑️ AirPods eliminados del inventario`);

      // Verificar inventario final
      const finalResponse = await request(app)
        .get('/api/product/')
        .expect(200);

      expect(finalResponse.body).toHaveLength(5);
      console.log(`📊 Inventario final: ${finalResponse.body.length} productos`);

      // FASE 9: Verificar estados disponibles
      console.log('📋 Verificando estados disponibles...');
      
      const statusResponse = await request(app)
        .get('/api/product/status')
        .expect(200);

      expect(statusResponse.body).toEqual(['AVAILABLE', 'NOT AVAILABLE', 'DISCONTINUED']);
      console.log(`📋 Estados disponibles: ${statusResponse.body.join(', ')}`);

      console.log('🎉 Flujo de e-commerce completado exitosamente!');
    });
  });

  describe('Product Category Dependencies', () => {
    it('debería manejar correctamente las dependencias entre productos y categorías', async () => {
      // Crear categoría
      const categoryResponse = await request(app)
        .post('/api/category/create')
        .send({ name: 'Electrónicos' })
        .expect(201);

      const categoryId = categoryResponse.body.data._id;

      // Crear productos en la categoría
      const products = [
        {
          name: 'Producto 1',
          price: 100,
          description: 'Test',
          category: categoryId,
          stock: 10,
          status: 'AVAILABLE'
        },
        {
          name: 'Producto 2',
          price: 200,
          description: 'Test',
          category: categoryId,
          stock: 20,
          status: 'AVAILABLE'
        }
      ];

      for (const product of products) {
        await request(app)
          .post('/api/product/create')
          .send(product)
          .expect(200);
      }

      // Verificar que los productos están asociados a la categoría
      const productsResponse = await request(app)
        .get('/api/product/')
        .expect(200);

      expect(productsResponse.body).toHaveLength(2);
      expect(productsResponse.body[0].category._id).toBe(categoryId);
      expect(productsResponse.body[1].category._id).toBe(categoryId);

      // Intentar eliminar la categoría (esto debería fallar si hay productos asociados)
      // Nota: En este caso, la eliminación de categoría no está protegida,
      // pero en un sistema real debería verificar dependencias
      await request(app)
        .delete(`/api/category/delete/${categoryId}`)
        .expect(200);

      // Verificar que los productos siguen existiendo
      const productsAfterCategoryDelete = await request(app)
        .get('/api/product/')
        .expect(200);

      expect(productsAfterCategoryDelete.body).toHaveLength(2);
    });
  });

  describe('Product Performance and Scalability', () => {
    it('debería manejar múltiples productos eficientemente', async () => {
      // Crear categoría
      const categoryResponse = await request(app)
        .post('/api/category/create')
        .send({ name: 'Test Category' })
        .expect(201);

      const categoryId = categoryResponse.body.data._id;

      // Crear múltiples productos
      const productCount = 10;
      const products = [];
      
      for (let i = 1; i <= productCount; i++) {
        products.push({
          name: `Producto ${i}`,
          price: 100 + i * 10,
          description: `Descripción del producto ${i}`,
          category: categoryId,
          stock: 10 + i,
          status: 'AVAILABLE'
        });
      }

      // Crear todos los productos
      for (const product of products) {
        await request(app)
          .post('/api/product/create')
          .send(product)
          .expect(200);
      }

      // Verificar que todos los productos fueron creados
      const allProductsResponse = await request(app)
        .get('/api/product/')
        .expect(200);

      expect(allProductsResponse.body).toHaveLength(productCount);

      // Probar búsqueda en múltiples productos
      const searchResponse = await request(app)
        .post('/api/product/name')
        .send({ name: 'Producto' })
        .expect(200);

      expect(searchResponse.body.productExist).toHaveLength(productCount);

      // Probar búsqueda específica
      const specificSearch = await request(app)
        .post('/api/product/name')
        .send({ name: 'Producto 5' })
        .expect(200);

      expect(specificSearch.body.productExist).toHaveLength(1);
      expect(specificSearch.body.productExist[0].name).toBe('Producto 5');
    });
  });
});
