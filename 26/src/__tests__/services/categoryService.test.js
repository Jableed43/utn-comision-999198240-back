import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { 
  createCategoryService, 
  getCategoriesService, 
  deleteCategoryService 
} from '../../services/categoryService.js';
import Category from '../../models/categoryModel.js';

// Mock del modelo
jest.mock('../../models/categoryModel.js');

describe('Category Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCategoryService', () => {
    it('debería crear una categoría exitosamente', async () => {
      const categoryName = 'Electrónicos';
      const mockCategory = {
        _id: '123',
        name: 'electrónicos',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockCategoryInstance = {
        save: jest.fn().mockResolvedValue(mockCategory)
      };

      Category.mockImplementation(() => mockCategoryInstance);

      const result = await createCategoryService(categoryName);

      expect(Category).toHaveBeenCalledWith({ name: categoryName });
      expect(mockCategoryInstance.save).toHaveBeenCalled();
      expect(result).toEqual(mockCategory);
    });
  });

  describe('getCategoriesService', () => {
    it('debería retornar lista de categorías', async () => {
      const mockCategories = [
        { _id: '1', name: 'electrónicos' },
        { _id: '2', name: 'ropa' }
      ];

      Category.find.mockResolvedValue(mockCategories);

      const result = await getCategoriesService();

      expect(Category.find).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });

    it('debería lanzar error si no hay categorías', async () => {
      Category.find.mockResolvedValue([]);

      await expect(getCategoriesService()).rejects.toThrow('There are no categories');
    });
  });

  describe('deleteCategoryService', () => {
    it('debería eliminar categoría exitosamente', async () => {
      const categoryId = '123';
      const mockCategory = { _id: categoryId, name: 'electrónicos' };

      Category.findOne.mockResolvedValue(mockCategory);
      Category.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const result = await deleteCategoryService(categoryId);

      expect(Category.findOne).toHaveBeenCalledWith({ _id: categoryId });
      expect(Category.deleteOne).toHaveBeenCalledWith({ _id: categoryId });
      expect(result).toEqual({ categoryDeleted: mockCategory });
    });

    it('debería lanzar error si la categoría no existe', async () => {
      const categoryId = '123';

      Category.findOne.mockResolvedValue(null);

      await expect(deleteCategoryService(categoryId)).rejects.toThrow(`Category with ${categoryId} doesn't exist`);
    });
  });
});
