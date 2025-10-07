import Product from '../models/productModel.js'
import { dbFirebase } from '../../firebase.js'
import { collection, addDoc, getDocs, query, where, orderBy, doc, getDoc } from 'firebase/firestore'

// Crear una nueva compra
export const createPurchaseService = async (purchaseData) => {
    // Validar y actualizar stock de productos en MongoDB
    for (const item of purchaseData.items) {
        const product = await Product.findById(item.productId)
        
        if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`)
        }
        
        if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`)
        }
        
        // Usar el método decreaseStock del modelo Product
        await product.decreaseStock(item.quantity)
    }
    
    // Crear la compra en Firebase
    const purchaseDataWithTimestamp = {
        ...purchaseData,
        purchaseDate: new Date(),
        status: "COMPLETED",
        timestamp: new Date()
    }
    
    const docRef = await addDoc(collection(dbFirebase, 'purchases'), purchaseDataWithTimestamp)
    
    return {
        id: docRef.id,
        ...purchaseDataWithTimestamp
    }
}

// Obtener compras por usuario
export const getPurchasesByUserService = async (userId) => {
    const q = query(
        collection(dbFirebase, 'purchases'),
        where('userId', '==', userId),
        orderBy('purchaseDate', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    const purchases = []
    
    querySnapshot.forEach((doc) => {
        purchases.push({
            id: doc.id,
            ...doc.data()
        })
    })
    
    if (purchases.length === 0) {
        const error = new Error("No purchases found for this user")
        error.statusCode = 204
        throw error
    }
    
    return purchases
}

// Obtener compra por ID
export const getPurchaseByIdService = async (purchaseId) => {
    const docRef = doc(dbFirebase, 'purchases', purchaseId)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
        const error = new Error("Purchase not found")
        error.statusCode = 404
        throw error
    }
    
    return {
        id: docSnap.id,
        ...docSnap.data()
    }
}

// Obtener todas las compras
export const getAllPurchasesService = async () => {
    const q = query(
        collection(dbFirebase, 'purchases'),
        orderBy('purchaseDate', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    const purchases = []
    
    querySnapshot.forEach((doc) => {
        purchases.push({
            id: doc.id,
            ...doc.data()
        })
    })
    
    if (purchases.length === 0) {
        const error = new Error("No purchases found")
        error.statusCode = 204
        throw error
    }
    
    return purchases
}