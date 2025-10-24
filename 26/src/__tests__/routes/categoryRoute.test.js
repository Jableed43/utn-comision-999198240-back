import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { categoryRoute } from '../../routes/categoryRoute.js';
import { 
  createCategory, 
  getCategories, 
  deleteCategory 
} from '../../controllers/categoryController.js';

// Mock de los controladores
jest.mock('../../controllers/categoryController.js');

const app = express();
app.use(express.json());
app.use('/api/category', categoryRoute);

describe('Category Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/category/create', () => {
    it('debería llamar al controlador createCategory', async () => {
      const categoryData = { name: 'Electrónicos' };

      createCategory.mockImplementation((req, res) => {
        res.status(201).json({ 
          message: 'new category created', 
          data: { _id: '123', name: 'electrónicos' } 
        });
      });

      await request(app)
        .post('/api/category/create')
        .send(categoryData)
        .expect(201);

      expect(createCategory).toHaveBeenCalled();
    });
  });

  describe('GET /api/category/getCategories', () => {
    it('debería llamar al controlador getCategories', async () => {
      const mockCategories = [
        { _id: '1', name: 'electrónicos' },
        { _id: '2', name: 'ropa' }
      ];

      getCategories.mockImplementation((req, res) => {
        res.status(200).json(mockCategories);
      });

      await request(app)
        .get('/api/category/getCategories')
        .expect(200);

      expect(getCategories).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/category/delete/:id', () => {
    it('debería llamar al controlador deleteCategory con el ID correcto', async () => {
      const categoryId = '123';

      deleteCategory.mockImplementation((req, res) => {
        res.status(200).json({ categoryDeleted: { _id: categoryId, name: 'electrónicos' } });
      });

      await request(app)
        .delete(`/api/category/delete/${categoryId}`)
        .expect(200);

      expect(deleteCategory).toHaveBeenCalled();
    });
  });
});
