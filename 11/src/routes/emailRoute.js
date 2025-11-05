import express from 'express'
import { sendContact } from '../controllers/emailController.js'

export const emailRoute = express.Router()

emailRoute.post("/contact", sendContact)