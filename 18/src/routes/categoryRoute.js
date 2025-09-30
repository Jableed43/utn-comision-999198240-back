import express from 'express'
import { createCategoryView, createCategory, getAllCategoriesView, deleteCategory } from '../controllers/categoryController.js'

export const categoryRoute = express.Router()

categoryRoute.get("/create", createCategoryView)
categoryRoute.get("/getAll", getAllCategoriesView)
categoryRoute.post("/create", createCategory)
categoryRoute.delete("/delete/:id", deleteCategory)