import express from 'express'
import { createCategory, deleteCategory, getCategories } from '../controllers/categoryController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'

export const categoryRoute = express.Router()

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestión de categorías de productos
 */

/**
 * @swagger
 * /api/category/create:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
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
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: Nombre de la categoría
 *                 example: Electrónicos
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: new category created
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
categoryRoute.post("/create", verifyTokenMiddleware, createCategory)

/**
 * @swagger
 * /api/category/getCategories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *             example:
 *               - _id: "507f1f77bcf86cd799439012"
 *                 name: "electrónicos"
 *                 createdAt: "2023-10-23T20:04:00.000Z"
 *                 updatedAt: "2023-10-23T20:04:00.000Z"
 *               - _id: "507f1f77bcf86cd799439013"
 *                 name: "ropa"
 *                 createdAt: "2023-10-23T20:04:00.000Z"
 *                 updatedAt: "2023-10-23T20:04:00.000Z"
 *       204:
 *         description: No hay categorías registradas
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
categoryRoute.get("/getCategories", getCategories)

/**
 * @swagger
 * /api/category/delete/{id}:
 *   delete:
 *     summary: Eliminar una categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a eliminar
 *         example: 507f1f77bcf86cd799439012
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryDeleted:
 *                   $ref: '#/components/schemas/Category'
 *             example:
 *               categoryDeleted:
 *                 _id: "507f1f77bcf86cd799439012"
 *                 name: "electrónicos"
 *                 createdAt: "2023-10-23T20:04:00.000Z"
 *                 updatedAt: "2023-10-23T20:04:00.000Z"
 *       400:
 *         description: Categoría no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category with 507f1f77bcf86cd799439012 doesn't exist
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
categoryRoute.delete("/delete/:id", verifyTokenMiddleware, deleteCategory)