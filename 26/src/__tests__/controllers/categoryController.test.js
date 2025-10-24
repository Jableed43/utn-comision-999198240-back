import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { 
  createCategory, 
  getCategories, 
  deleteCategory 
} from '../../controllers/categoryController.js';
import { 
  createCategoryService, 
  getCategoriesService, 
  deleteCategoryService 
} from '../../services/categoryService.js';

// Mock de los servicios
jest.mock('../../services/categoryService.js');

describe('Category Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('debería crear categoría exitosamente', async () => {
      const categoryData = { name: 'Electrónicos' };
      req.body = categoryData;

      const mockCategory = {
        _id: '123',
        name: 'electrónicos',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      createCategoryService.mockResolvedValue(mockCategory);

      await createCategory(req, res);

      expect(createCategoryService).toHaveBeenCalledWith(categoryData.name);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "new category created",
        data: mockCategory
      });
    });

    it('debería manejar error del servicio', async () => {
      const categoryData = { name: 'Electrónicos' };
      req.body = categoryData;

      const error = new Error('Validation error');
      createCategoryService.mockRejectedValue(error);

      await createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });

  describe('getCategories', () => {
    it('debería retornar categorías exitosamente', async () => {
      const mockCategories = [
        { _id: '1', name: 'electrónicos' },
        { _id: '2', name: 'ropa' }
      ];

      getCategoriesService.mockResolvedValue(mockCategories);

      await getCategories(req, res);

      expect(getCategoriesService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCategories);
    });

    it('debería manejar error 204 (no content)', async () => {
      const error = new Error('There are no categories');
      error.statusCode = 204;
      getCategoriesService.mockRejectedValue(error);

      await getCategories(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it('debería manejar error interno del servidor', async () => {
      const error = new Error('Database error');
      getCategoriesService.mockRejectedValue(error);

      await getCategories(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });

  describe('deleteCategory', () => {
    it('debería eliminar categoría exitosamente', async () => {
      const categoryId = '123';
      req.params.id = categoryId;

      const mockResponse = { categoryDeleted: { _id: categoryId, name: 'electrónicos' } };
      deleteCategoryService.mockResolvedValue(mockResponse);

      await deleteCategory(req, res);

      expect(deleteCategoryService).toHaveBeenCalledWith(categoryId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('debería manejar error 400 (categoría no encontrada)', async () => {
      const categoryId = '123';
      req.params.id = categoryId;

      const error = new Error('Category not found');
      error.statusCode = 400;
      deleteCategoryService.mockRejectedValue(error);

      await deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('debería manejar error interno del servidor', async () => {
      const categoryId = '123';
      req.params.id = categoryId;

      const error = new Error('Database error');
      deleteCategoryService.mockRejectedValue(error);

      await deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });
});
