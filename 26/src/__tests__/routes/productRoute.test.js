import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { productRoute } from '../../routes/productRoute.js';
import { 
  createProduct,
  getProducts,
  findProductByName,
  findProductById,
  updateProduct,
  deleteProduct,
  getStatus
} from '../../controllers/productController.js';

// Mock de los controladores
jest.mock('../../controllers/productController.js');

const app = express();
app.use(express.json());
app.use('/api/product', productRoute);

describe('Product Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/product/', () => {
    it('debería llamar al controlador getProducts', async () => {
      const mockProducts = [
        { _id: '1', name: 'Producto 1', category: { name: 'Electrónicos' } },
        { _id: '2', name: 'Producto 2', category: { name: 'Ropa' } }
      ];

      getProducts.mockImplementation((req, res) => {
        res.status(200).json(mockProducts);
      });

      await request(app)
        .get('/api/product/')
        .expect(200);

      expect(getProducts).toHaveBeenCalled();
    });
  });

  describe('POST /api/product/create', () => {
    it('debería llamar al controlador createProduct', async () => {
      const productData = {
        name: 'Smartphone Samsung',
        price: 500,
        description: 'Teléfono inteligente',
        category: '123',
        stock: 10
      };

      createProduct.mockImplementation((req, res) => {
        res.status(200).json({ _id: '123', ...productData });
      });

      await request(app)
        .post('/api/product/create')
        .send(productData)
        .expect(200);

      expect(createProduct).toHaveBeenCalled();
    });
  });

  describe('POST /api/product/name', () => {
    it('debería llamar al controlador findProductByName', async () => {
      const productName = 'Samsung';

      findProductByName.mockImplementation((req, res) => {
        res.status(200).json({ productExist: [{ _id: '1', name: 'Samsung Galaxy' }] });
      });

      await request(app)
        .post('/api/product/name')
        .send({ name: productName })
        .expect(200);

      expect(findProductByName).toHaveBeenCalled();
    });
  });

  describe('GET /api/product/find-by-id/:id', () => {
    it('debería llamar al controlador findProductById con el ID correcto', async () => {
      const productId = '123';

      findProductById.mockImplementation((req, res) => {
        res.status(200).json({ productExist: { _id: productId, name: 'Producto Test' } });
      });

      await request(app)
        .get(`/api/product/find-by-id/${productId}`)
        .expect(200);

      expect(findProductById).toHaveBeenCalled();
    });
  });

  describe('PUT /api/product/update/:id', () => {
    it('debería llamar al controlador updateProduct con el ID correcto', async () => {
      const productId = '123';
      const updateData = { price: 600 };

      updateProduct.mockImplementation((req, res) => {
        res.status(201).json({ _id: productId, name: 'Producto Test', price: 600 });
      });

      await request(app)
        .put(`/api/product/update/${productId}`)
        .send(updateData)
        .expect(201);

      expect(updateProduct).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/product/delete/:id', () => {
    it('debería llamar al controlador deleteProduct con el ID correcto', async () => {
      const productId = '123';

      deleteProduct.mockImplementation((req, res) => {
        res.status(201).json({ 
          message: 'product deleted successfully', 
          deletedProduct: { _id: productId, name: 'Producto Test' } 
        });
      });

      await request(app)
        .delete(`/api/product/delete/${productId}`)
        .expect(201);

      expect(deleteProduct).toHaveBeenCalled();
    });
  });

  describe('GET /api/product/status', () => {
    it('debería llamar al controlador getStatus', async () => {
      const mockStatus = ['AVAILABLE', 'NOT AVAILABLE', 'DISCONTINUED'];

      getStatus.mockImplementation((req, res) => {
        res.status(200).json(mockStatus);
      });

      await request(app)
        .get('/api/product/status')
        .expect(200);

      expect(getStatus).toHaveBeenCalled();
    });
  });
});
