import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { 
  createProduct,
  getProducts,
  findProductByName,
  findProductById,
  updateProduct,
  deleteProduct,
  getStatus
} from '../../controllers/productController.js';
import { 
  createProductService,
  getProductsService,
  findProductByNameService,
  findProductByIdService,
  updateProductService,
  deleteProductService,
  getStatusService
} from '../../services/productService.js';

// Mock de los servicios
jest.mock('../../services/productService.js');

describe('Product Controller', () => {
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

  describe('createProduct', () => {
    it('debería crear producto exitosamente', async () => {
      const productData = {
        name: 'Smartphone Samsung',
        price: 500,
        description: 'Teléfono inteligente',
        category: '123',
        stock: 10
      };
      req.body = productData;

      const mockProduct = { _id: '123', ...productData };
      createProductService.mockResolvedValue(mockProduct);

      await createProduct(req, res);

      expect(createProductService).toHaveBeenCalledWith(productData);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('debería manejar error del servicio', async () => {
      const productData = { name: 'Producto Test' };
      req.body = productData;

      const error = new Error('Validation error');
      createProductService.mockRejectedValue(error);

      await createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "internal server error",
        error: error.message
      });
    });
  });

  describe('getProducts', () => {
    it('debería retornar productos exitosamente', async () => {
      const mockProducts = [
        { _id: '1', name: 'Producto 1', category: { name: 'Electrónicos' } },
        { _id: '2', name: 'Producto 2', category: { name: 'Ropa' } }
      ];

      getProductsService.mockResolvedValue(mockProducts);

      await getProducts(req, res);

      expect(getProductsService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it('debería manejar error 204 (no content)', async () => {
      const error = new Error('There are no products');
      error.statusCode = 204;
      getProductsService.mockRejectedValue(error);

      await getProducts(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it('debería manejar error 400', async () => {
      const error = new Error('Bad request');
      error.statusCode = 400;
      getProductsService.mockRejectedValue(error);

      await getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('debería manejar error interno del servidor', async () => {
      const error = new Error('Database error');
      getProductsService.mockRejectedValue(error);

      await getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "internal server error",
        error: error.message
      });
    });
  });

  describe('findProductByName', () => {
    it('debería encontrar producto por nombre exitosamente', async () => {
      const productName = 'Samsung';
      req.body = { name: productName };

      const mockResult = { productExist: [{ _id: '1', name: 'Samsung Galaxy' }] };
      findProductByNameService.mockResolvedValue(mockResult);

      await findProductByName(req, res);

      expect(findProductByNameService).toHaveBeenCalledWith(productName);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('debería manejar error 400 (producto no encontrado)', async () => {
      const productName = 'Inexistente';
      req.body = { name: productName };

      const error = new Error('Product not found');
      error.statusCode = 400;
      findProductByNameService.mockRejectedValue(error);

      await findProductByName(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('debería manejar error interno del servidor', async () => {
      const productName = 'Samsung';
      req.body = { name: productName };

      const error = new Error('Database error');
      findProductByNameService.mockRejectedValue(error);

      await findProductByName(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });

  describe('findProductById', () => {
    it('debería encontrar producto por ID exitosamente', async () => {
      const productId = '123';
      req.params.id = productId;

      const mockResult = { productExist: { _id: productId, name: 'Producto Test' } };
      findProductByIdService.mockResolvedValue(mockResult);

      await findProductById(req, res);

      expect(findProductByIdService).toHaveBeenCalledWith(productId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('debería manejar error 400 (producto no encontrado)', async () => {
      const productId = '123';
      req.params.id = productId;

      const error = new Error('Product not found');
      error.statusCode = 400;
      findProductByIdService.mockRejectedValue(error);

      await findProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('debería manejar error interno del servidor', async () => {
      const productId = '123';
      req.params.id = productId;

      const error = new Error('Database error');
      findProductByIdService.mockRejectedValue(error);

      await findProductById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });

  describe('updateProduct', () => {
    it('debería actualizar producto exitosamente', async () => {
      const productId = '123';
      const updateData = { price: 600 };
      req.params.id = productId;
      req.body = updateData;

      const mockUpdatedProduct = { _id: productId, name: 'Producto Test', price: 600 };
      updateProductService.mockResolvedValue(mockUpdatedProduct);

      await updateProduct(req, res);

      expect(updateProductService).toHaveBeenCalledWith(productId, updateData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedProduct);
    });

    it('debería manejar error 400 (producto no encontrado)', async () => {
      const productId = '123';
      const updateData = { price: 600 };
      req.params.id = productId;
      req.body = updateData;

      const error = new Error('Product not found');
      error.statusCode = 400;
      updateProductService.mockRejectedValue(error);

      await updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('debería manejar error interno del servidor', async () => {
      const productId = '123';
      const updateData = { price: 600 };
      req.params.id = productId;
      req.body = updateData;

      const error = new Error('Database error');
      updateProductService.mockRejectedValue(error);

      await updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });

  describe('deleteProduct', () => {
    it('debería eliminar producto exitosamente', async () => {
      const productId = '123';
      req.params.id = productId;

      const mockResponse = { 
        message: "product deleted succesfully", 
        deletedProduct: { _id: productId, name: 'Producto Test' } 
      };
      deleteProductService.mockResolvedValue(mockResponse);

      await deleteProduct(req, res);

      expect(deleteProductService).toHaveBeenCalledWith(productId);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('debería manejar error 400 (producto no encontrado)', async () => {
      const productId = '123';
      req.params.id = productId;

      const error = new Error('Product not found');
      error.statusCode = 400;
      deleteProductService.mockRejectedValue(error);

      await deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('debería manejar error interno del servidor', async () => {
      const productId = '123';
      req.params.id = productId;

      const error = new Error('Database error');
      deleteProductService.mockRejectedValue(error);

      await deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });

  describe('getStatus', () => {
    it('debería retornar estados disponibles exitosamente', async () => {
      const mockStatus = ['AVAILABLE', 'NOT AVAILABLE', 'DISCONTINUED'];
      getStatusService.mockResolvedValue(mockStatus);

      await getStatus(req, res);

      expect(getStatusService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockStatus);
    });

    it('debería manejar error del servicio', async () => {
      const error = new Error('Service error');
      getStatusService.mockRejectedValue(error);

      await getStatus(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });
});
