import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { 
  createProductService,
  getProductsService,
  findProductByNameService,
  findProductByIdService,
  updateProductService,
  deleteProductService,
  getStatusService
} from '../../services/productService.js';
import Product, { statusEnum } from '../../models/productModel.js';

// Mock del modelo
jest.mock('../../models/productModel.js');

describe('Product Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createProductService', () => {
    it('debería crear un producto exitosamente', async () => {
      const productData = {
        name: 'Smartphone Samsung',
        price: 500,
        description: 'Teléfono inteligente',
        category: '123',
        stock: 10
      };

      const mockProduct = {
        _id: '123',
        ...productData,
        save: jest.fn().mockResolvedValue(productData)
      };

      Product.mockImplementation(() => mockProduct);

      const result = await createProductService(productData);

      expect(Product).toHaveBeenCalledWith(productData);
      expect(mockProduct.save).toHaveBeenCalled();
      expect(result).toEqual(productData);
    });
  });

  describe('getProductsService', () => {
    it('debería retornar lista de productos con categorías', async () => {
      const mockProducts = [
        { _id: '1', name: 'Producto 1', category: { name: 'Electrónicos' } },
        { _id: '2', name: 'Producto 2', category: { name: 'Ropa' } }
      ];

      Product.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockProducts)
      });

      const result = await getProductsService();

      expect(Product.find).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });

    it('debería lanzar error si no hay productos', async () => {
      Product.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue([])
      });

      await expect(getProductsService()).rejects.toThrow(' There are no products ');
    });
  });

  describe('findProductByNameService', () => {
    it('debería encontrar productos por nombre', async () => {
      const productName = 'Samsung';
      const mockProducts = [
        { _id: '1', name: 'Samsung Galaxy' },
        { _id: '2', name: 'Samsung TV' }
      ];

      Product.find.mockResolvedValue(mockProducts);

      const result = await findProductByNameService(productName);

      expect(Product.find).toHaveBeenCalledWith({
        name: { $regex: productName, $options: 'i' }
      });
      expect(result).toEqual({ productExist: mockProducts });
    });

    it('debería lanzar error si no encuentra productos', async () => {
      const productName = 'Inexistente';

      Product.find.mockResolvedValue(null);

      await expect(findProductByNameService(productName)).rejects.toThrow(`Product ${productName} doesn't exist`);
    });
  });

  describe('findProductByIdService', () => {
    it('debería encontrar producto por ID', async () => {
      const productId = '123';
      const mockProduct = { _id: productId, name: 'Producto Test' };

      Product.findOne.mockResolvedValue(mockProduct);

      const result = await findProductByIdService(productId);

      expect(Product.findOne).toHaveBeenCalledWith({ _id: productId });
      expect(result).toEqual({ productExist: mockProduct });
    });

    it('debería lanzar error si no encuentra el producto', async () => {
      const productId = '123';

      Product.findOne.mockResolvedValue(null);

      await expect(findProductByIdService(productId)).rejects.toThrow(`Product ${productId} doesn't exist`);
    });
  });

  describe('updateProductService', () => {
    it('debería actualizar producto exitosamente', async () => {
      const productId = '123';
      const updateData = { price: 600 };
      const mockProduct = { _id: productId, name: 'Producto Test', price: 600 };

      Product.findOne.mockResolvedValue(mockProduct);
      Product.findByIdAndUpdate.mockResolvedValue(mockProduct);

      const result = await updateProductService(productId, updateData);

      expect(Product.findOne).toHaveBeenCalledWith({ _id: productId });
      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        { _id: productId },
        updateData,
        { new: true }
      );
      expect(result).toEqual(mockProduct);
    });

    it('debería lanzar error si el producto no existe', async () => {
      const productId = '123';
      const updateData = { price: 600 };

      Product.findOne.mockResolvedValue(null);

      await expect(updateProductService(productId, updateData)).rejects.toThrow("The product you're trying to update does not exist");
    });
  });

  describe('deleteProductService', () => {
    it('debería eliminar producto exitosamente', async () => {
      const productId = '123';
      const mockProduct = { _id: productId, name: 'Producto Test' };

      Product.findOne.mockResolvedValue(mockProduct);
      Product.findByIdAndDelete.mockResolvedValue(mockProduct);

      const result = await deleteProductService(productId);

      expect(Product.findOne).toHaveBeenCalledWith({ _id: productId });
      expect(Product.findByIdAndDelete).toHaveBeenCalledWith(productId);
      expect(result).toEqual({ 
        message: "product deleted succesfully", 
        deletedProduct: mockProduct 
      });
    });

    it('debería lanzar error si el producto no existe', async () => {
      const productId = '123';

      Product.findOne.mockResolvedValue(null);

      await expect(deleteProductService(productId)).rejects.toThrow("The product you're trying to update does not exist");
    });
  });

  describe('getStatusService', () => {
    it('debería retornar los estados disponibles', async () => {
      const result = await getStatusService();

      expect(result).toEqual(statusEnum);
    });
  });
});
