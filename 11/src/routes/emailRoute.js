import express from 'express';
import { sendContact } from '../controllers/emailController.js';

// Creamos el enrutador para las rutas de email
export const emailRoute = express.Router();

// Endpoint para enviar consultas de contacto
// POST /api/email/contact
emailRoute.post("/contact", sendContact);

