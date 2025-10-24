import express from 'express'
import { createUser, deleteUser, getUsers, updateUser, validate } from '../controllers/userController.js'
import {verifyTokenMiddleware} from '../middlewares/verifyTokenMiddleware.js'
// Creamos el enrutador
// Controla el conjunto de las rutas
// Orienta a una entidad

export const userRoute = express.Router()

// Los endpoints -> http://localhost:3000/api/user/create

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios del sistema
 */

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastName
 *               - email
 *               - age
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Juan
 *               lastName:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *                 example: juan.perez@example.com
 *               age:
 *                 type: integer
 *                 minimum: 16
 *                 description: Edad del usuario
 *                 example: 25
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 12
 *                 description: Contraseña del usuario (mínimo 6 caracteres, máximo 12, debe contener al menos una mayúscula, una minúscula y un número)
 *                 example: Password123
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRoute.post("/create", createUser)

/**
 * @swagger
 * /api/user/getUsers:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - _id: "507f1f77bcf86cd799439011"
 *                 name: "Juan"
 *                 lastName: "Pérez"
 *                 email: "juan.perez@example.com"
 *                 age: 25
 *                 createdAt: "2023-10-23T20:04:00.000Z"
 *                 updatedAt: "2023-10-23T20:04:00.000Z"
 *               - _id: "507f1f77bcf86cd799439012"
 *                 name: "María"
 *                 lastName: "González"
 *                 email: "maria.gonzalez@example.com"
 *                 age: 30
 *                 createdAt: "2023-10-23T20:04:00.000Z"
 *                 updatedAt: "2023-10-23T20:04:00.000Z"
 *       204:
 *         description: No hay usuarios registrados
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
userRoute.get("/getUsers", verifyTokenMiddleware, getUsers)

/**
 * @swagger
 * /api/user/deleteUser/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted succesfully
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRoute.delete("/deleteUser/:id", verifyTokenMiddleware, deleteUser)

/**
 * @swagger
 * /api/user/updateUser/{id}:
 *   patch:
 *     summary: Actualizar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del usuario
 *                 example: Juan Carlos
 *               lastName:
 *                 type: string
 *                 description: Nuevo apellido del usuario
 *                 example: Pérez García
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Nuevo email del usuario
 *                 example: juan.carlos@example.com
 *               age:
 *                 type: integer
 *                 minimum: 16
 *                 description: Nueva edad del usuario
 *                 example: 26
 *     responses:
 *       201:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRoute.patch("/updateUser/:id", updateUser)

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Autenticar usuario (login)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *                 example: juan.perez@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in
 *                 token:
 *                   type: string
 *                   description: JWT token para autenticación
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Credenciales inválidas o campos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User or password are incorrect
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRoute.post("/login", validate)
