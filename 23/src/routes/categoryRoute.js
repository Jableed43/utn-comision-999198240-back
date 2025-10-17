import express from 'express'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController.js'

export const categoryRoute = express.Router()

// Endpoint
categoryRoute.post("/create", createCategory)
categoryRoute.delete("/delete/:id", deleteCategory)
categoryRoute.patch("/update/:id", updateCategory)
categoryRoute.get("/", getCategories)