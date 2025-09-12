import express from 'express'
import { createCategory, deleteCategory, getCategories } from '../controllers/categoryController.js'

export const categoryRoute = express.Router()

categoryRoute.post("/create", createCategory)
categoryRoute.get("/getCategories", getCategories)
categoryRoute.delete("/delete/:id", deleteCategory)