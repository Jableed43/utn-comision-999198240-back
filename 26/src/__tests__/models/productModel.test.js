import { describe, it, expect, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
import Product, { statusEnum } from '../../models/productModel.js';
import Category from '../../models/categoryModel.js';

describe('Product Model', () => {
  let category;

  beforeEach(async () => {
    await Product.deleteMany({});
    await Category.deleteMany({});
    
    // Crear una categoría para las pruebas
    category = new Category({ name: 'Electrónicos' });
    await category.save();
  });

  describe('Validaciones de Campos', () => {
    it('debería crear un producto con datos válidos', async () => {
      const productData = {
        name: 'Smartphone Samsung',
        price: 500,
        description: 'Teléfono inteligente de última generación',
        status: 'AVAILABLE',
        category: category._id,
        stock: 10,
        highlighted: true
      };

      const product = new Product(productData);
      const savedProduct = await product.save();

      expect(savedProduct._id).toBeDefined();
      expect(savedProduct.name).toBe('smartphone samsung');
      expect(savedProduct.price).toBe(500);
      expect(savedProduct.profitRate).toBe(1.30); // Valor por defecto
      expect(savedProduct.stock).toBe(10);
      expect(savedProduct.highlighted).toBe(true);
    });

    it('debería fallar sin nombre', async () => {
      const productData = {
        price: 500,
        category: category._id
      };

      const product = new Product(productData);
      await expect(product.save()).rejects.toThrow();
    });

    it('debería fallar con precio inválido', async () => {
      const productData = {
        name: 'Producto Test',
        price: 0, // Precio inválido
        category: category._id
      };

      const product = new Product(productData);
      await expect(product.save()).rejects.toThrow();
    });

    it('debería fallar con estado inválido', async () => {
      const productData = {
        name: 'Producto Test',
        price: 100,
        status: 'INVALID_STATUS',
        category: category._id
      };

      const product = new Product(productData);
      await expect(product.save()).rejects.toThrow();
    });

    it('debería fallar con stock negativo', async () => {
      const productData = {
        name: 'Producto Test',
        price: 100,
        stock: -1,
        category: category._id
      };

      const product = new Product(productData);
      await expect(product.save()).rejects.toThrow();
    });
  });

  describe('Propiedades Virtuales', () => {
    it('debería calcular priceWithProfitRate correctamente', async () => {
      const productData = {
        name: 'Producto Test',
        price: 100,
        profitRate: 1.5,
        category: category._id
      };

      const product = new Product(productData);
      const savedProduct = await product.save();

      expect(savedProduct.priceWithProfitRate).toBe(150); // 100 * 1.5
    });

    it('debería usar profitRate por defecto', async () => {
      const productData = {
        name: 'Producto Test',
        price: 100,
        category: category._id
      };

      const product = new Product(productData);
      const savedProduct = await product.save();

      expect(savedProduct.priceWithProfitRate).toBe(130); // 100 * 1.30
    });
  });

  describe('Métodos de Instancia', () => {
    it('debería disminuir stock correctamente', async () => {
      const productData = {
        name: 'Producto Test',
        price: 100,
        stock: 10,
        category: category._id
      };

      const product = new Product(productData);
      const savedProduct = await product.save();

      await savedProduct.decreaseStock(3);
      await savedProduct.save();

      const updatedProduct = await Product.findById(savedProduct._id);
      expect(updatedProduct.stock).toBe(7);
    });

    it('debería fallar al disminuir stock insuficiente', async () => {
      const productData = {
        name: 'Producto Test',
        price: 100,
        stock: 5,
        category: category._id
      };

      const product = new Product(productData);
      const savedProduct = await product.save();

      await expect(savedProduct.decreaseStock(10)).rejects.toThrow('Not enough quantity');
    });

    it('debería fallar con cantidad negativa', async () => {
      const productData = {
        name: 'Producto Test',
        price: 100,
        stock: 10,
        category: category._id
      };

      const product = new Product(productData);
      const savedProduct = await product.save();

      await expect(savedProduct.decreaseStock(-1)).rejects.toThrow('Amount has to be a positive value');
    });
  });

  describe('Valores por Defecto', () => {
    it('debería usar valores por defecto', async () => {
      const productData = {
        name: 'Producto Test',
        price: 100,
        category: category._id
      };

      const product = new Product(productData);
      const savedProduct = await product.save();

      expect(savedProduct.profitRate).toBe(1.30);
      expect(savedProduct.stock).toBe(0);
      expect(savedProduct.highlighted).toBe(false);
    });
  });

  describe('Timestamps', () => {
    it('debería crear timestamps automáticamente', async () => {
      const productData = {
        name: 'Producto Test',
        price: 100,
        category: category._id
      };

      const product = new Product(productData);
      const savedProduct = await product.save();

      expect(savedProduct.createdAt).toBeDefined();
      expect(savedProduct.updatedAt).toBeDefined();
    });
  });

  describe('Enum de Estados', () => {
    it('debería aceptar todos los estados válidos', async () => {
      for (const status of statusEnum) {
        const productData = {
          name: `Producto ${status}`,
          price: 100,
          status: status,
          category: category._id
        };

        const product = new Product(productData);
        const savedProduct = await product.save();

        expect(savedProduct.status).toBe(status);
      }
    });
  });
});
