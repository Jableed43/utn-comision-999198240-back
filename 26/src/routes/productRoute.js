import express from 'express'
import { createProduct, deleteProduct, findProductById, findProductByName, getProducts, getStatus, updateProduct } from '../controllers/productController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'

export const productRoute = express.Router()

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos del sistema
 */

/**
 * @swagger
 * /api/product/:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Product'
 *                   - type: object
 *                     properties:
 *                       category:
 *                         $ref: '#/components/schemas/Category'
 *             example:
 *               - _id: "507f1f77bcf86cd799439013"
 *                 name: "Smartphone Samsung Galaxy S23"
 *                 price: 899.99
 *                 description: "Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas"
 *                 category:
 *                   _id: "507f1f77bcf86cd799439012"
 *                   name: "electrónicos"
 *                 stock: 50
 *                 status: "AVAILABLE"
 *                 profitRate: 0.2
 *                 createdAt: "2023-10-23T20:04:00.000Z"
 *                 updatedAt: "2023-10-23T20:04:00.000Z"
 *       204:
 *         description: No hay productos registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: []
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
productRoute.get("/", getProducts)

/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - category
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: Smartphone Samsung Galaxy S23
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Precio del producto
 *                 example: 899.99
 *               description:
 *                 type: string
 *                 description: Descripción del producto
 *                 example: Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas
 *               category:
 *                 type: string
 *                 description: ID de la categoría del producto
 *                 example: 507f1f77bcf86cd799439012
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *                 description: Cantidad en stock
 *                 example: 50
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, NOT AVAILABLE, DISCONTINUED]
 *                 description: Estado del producto
 *                 example: AVAILABLE
 *               profitRate:
 *                 type: number
 *                 description: Tasa de ganancia (opcional, por defecto 0.2)
 *                 example: 0.2
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
productRoute.post("/create", verifyTokenMiddleware, createProduct)

/**
 * @swagger
 * /api/product/name:
 *   post:
 *     summary: Buscar productos por nombre
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre o parte del nombre del producto a buscar
 *                 example: Samsung
 *     responses:
 *       200:
 *         description: Productos encontrados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productExist:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *             example:
 *               productExist:
 *                 - _id: "507f1f77bcf86cd799439013"
 *                   name: "Smartphone Samsung Galaxy S23"
 *                   price: 899.99
 *                   description: "Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas"
 *                   category: "507f1f77bcf86cd799439012"
 *                   stock: 50
 *                   status: "AVAILABLE"
 *                   profitRate: 0.2
 *                   createdAt: "2023-10-23T20:04:00.000Z"
 *                   updatedAt: "2023-10-23T20:04:00.000Z"
 *       400:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product Samsung doesn't exist
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
productRoute.post("/name", findProductByName)

/**
 * @swagger
 * /api/product/find-by-id/{id}:
 *   get:
 *     summary: Buscar un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a buscar
 *         example: 507f1f77bcf86cd799439013
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productExist:
 *                   $ref: '#/components/schemas/Product'
 *             example:
 *               productExist:
 *                 _id: "507f1f77bcf86cd799439013"
 *                 name: "Smartphone Samsung Galaxy S23"
 *                 price: 899.99
 *                 description: "Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas"
 *                 category: "507f1f77bcf86cd799439012"
 *                 stock: 50
 *                 status: "AVAILABLE"
 *                 profitRate: 0.2
 *                 createdAt: "2023-10-23T20:04:00.000Z"
 *                 updatedAt: "2023-10-23T20:04:00.000Z"
 *       400:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product 507f1f77bcf86cd799439013 doesn't exist
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
productRoute.get("/find-by-id/:id", findProductById)

/**
 * @swagger
 * /api/product/update/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a actualizar
 *         example: 507f1f77bcf86cd799439013
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del producto
 *                 example: Smartphone Samsung Galaxy S23 Ultra
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Nuevo precio del producto
 *                 example: 1099.99
 *               description:
 *                 type: string
 *                 description: Nueva descripción del producto
 *                 example: Teléfono inteligente premium con pantalla AMOLED de 6.8 pulgadas
 *               category:
 *                 type: string
 *                 description: Nueva categoría del producto
 *                 example: 507f1f77bcf86cd799439012
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *                 description: Nueva cantidad en stock
 *                 example: 25
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, NOT AVAILABLE, DISCONTINUED]
 *                 description: Nuevo estado del producto
 *                 example: AVAILABLE
 *               profitRate:
 *                 type: number
 *                 description: Nueva tasa de ganancia
 *                 example: 0.25
 *     responses:
 *       201:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The product you're trying to update does not exist
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
productRoute.put("/update/:id", verifyTokenMiddleware, updateProduct)

/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a eliminar
 *         example: 507f1f77bcf86cd799439013
 *     responses:
 *       201:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: product deleted succesfully
 *                 deletedProduct:
 *                   $ref: '#/components/schemas/Product'
 *             example:
 *               message: "product deleted succesfully"
 *               deletedProduct:
 *                 _id: "507f1f77bcf86cd799439013"
 *                 name: "Smartphone Samsung Galaxy S23"
 *                 price: 899.99
 *                 description: "Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas"
 *                 category: "507f1f77bcf86cd799439012"
 *                 stock: 50
 *                 status: "AVAILABLE"
 *                 profitRate: 0.2
 *                 createdAt: "2023-10-23T20:04:00.000Z"
 *                 updatedAt: "2023-10-23T20:04:00.000Z"
 *       400:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The product you're trying to update does not exist
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
productRoute.delete("/delete/:id", verifyTokenMiddleware, deleteProduct)

/**
 * @swagger
 * /api/product/status:
 *   get:
 *     summary: Obtener estados disponibles para productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Estados obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 enum: [AVAILABLE, NOT AVAILABLE, DISCONTINUED]
 *             example: ["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"]
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
productRoute.get("/status", getStatus)