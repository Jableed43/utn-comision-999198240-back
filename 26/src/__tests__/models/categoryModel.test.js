import { describe, it, expect, beforeEach } from '@jest/globals';
import Category from '../../models/categoryModel.js';

// Describe -> Describe brevemente de que se trata el test - Agrupa los tests
describe('Category Model', () => {
  // beforeEach -> Se ejecuta antes de cada test
  beforeEach(async () => {
    // deleteMany -> Elimina todos los documentos de la colección - Logica de limpieza
    await Category.deleteMany({});
  });

  describe('Validaciones de Campos', () => {
    // it -> Es el test en si mismo

    it('debería crear una categoría con datos válidos', async () => {
      const categoryData = {
        name: 'Electrónicos'
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      // expect -> Es el resultado que se espera del test
      expect(savedCategory._id).toBeDefined();
      expect(savedCategory.name).toBe('electrónicos'); // lowercase automático
    });

    it('debería fallar sin nombre', async () => {
      const category = new Category({});
      // Verifica si el test falla cuando se intenta guardar sin nombre
      await expect(category.save()).rejects.toThrow();
    });

    it('debería fallar con nombre muy corto', async () => {
      const categoryData = {
        name: 'A' // Muy corto
      };

      const category = new Category(categoryData);
      await expect(category.save()).rejects.toThrow();
    });

    it('debería fallar con nombre muy largo', async () => {
      const categoryData = {
        name: 'A'.repeat(31) // Muy largo
      };

      const category = new Category(categoryData);
      await expect(category.save()).rejects.toThrow();
    });
  });

  describe('Timestamps', () => {
    it('debería crear timestamps automáticamente', async () => {
      const categoryData = {
        name: 'Electrónicos'
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      expect(savedCategory.createdAt).toBeDefined();
      expect(savedCategory.updatedAt).toBeDefined();
    });
  });

  describe('Nombre Único', () => {
    it('debería fallar con nombre duplicado', async () => {
      const categoryData1 = {
        name: 'Electrónicos'
      };

      const categoryData2 = {
        name: 'electrónicos' // Mismo nombre (case insensitive)
      };

      const category1 = new Category(categoryData1);
      await category1.save();

      const category2 = new Category(categoryData2);
      await expect(category2.save()).rejects.toThrow();
    });
  });

  describe('Transformaciones', () => {
    it('debería convertir a lowercase automáticamente', async () => {
      const categoryData = {
        name: 'ELECTRÓNICOS'
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      expect(savedCategory.name).toBe('electrónicos');
    });

    it('debería hacer trim automáticamente', async () => {
      const categoryData = {
        name: '  Electrónicos  '
      };

      const category = new Category(categoryData);
      const savedCategory = await category.save();

      expect(savedCategory.name).toBe('electrónicos');
    });
  });
});
