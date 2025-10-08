import Product from '../models/productModel.js'
import { dbFirebase } from '../../firebase.js'
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'

//Crear una nueva compra
export const createPurchaseService = async (purchaseData) => {
    // Validar y actualizar el stock de productos en mongoDB

//     {
//   "userId": "68d32b9c91e089dd2164eb25",
//   "items": [
//     {
//       "productId": "68d33a3491e089dd2164eb3e",
//       "quantity": 2,
//       "price": 8.5
//     },
//    {
//       "productId": "68d33a3491e089dd2164eb3a",
//       "quantity": 2,
//       "price": 10
//     }
//   ],
//   "totalAmount": 37
// }

    for(const item of purchaseData.items){
       const product = await Product.findById(item.productId)

       // Validamos la existencia del producto en la db
       if(!product){
        throw new Error(`Product with Id ${item.productId} is not found`)
       }

       // Validar si tenemos stock suficiente
       if(product.stock < item.quantity){
        throw new Error(`Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested ${item.quantity} `)
       }
       // Si todo salio ok, le restamos al producto en su stock lo que nos piden
       await product.decreaseStock(item.quantity)
    }

    // Crear la compra en firebase
    const purchaseDataWithTimestamp = {
        ...purchaseData,
        purchaseDate: new Date(),
        status: "COMPLETED",
        timeStamp: new Date()
    }

    // Añadimos a la coleccion de firebase la venta
    const docRef = await addDoc(collection(dbFirebase, "purchases"), purchaseDataWithTimestamp)
    console.log({docRef})
    return {
        id: docRef.id,
        ...purchaseDataWithTimestamp
    }
}


// Obtener compras por usuario
export const getPurchasesByUserService = async (userId) => {
    const q = query(
        collection(dbFirebase, "purchases"),
        where("userId", "==", userId),
        orderBy("purchaseDate", "desc")
    )

    // Es una captura de la respuesta de la consulta
    const querySnapshot = await getDocs(q)
    const purchases = []

    querySnapshot.forEach((doc) => {
        purchases.push({
            id: doc.id,
            ...doc.data()
        })
    })

    if(purchases.length === 0){
        const error = new Error("No purchases found this user")
        error.statusCode = 204
        throw error
    }

    return purchases

}

// Obtener compras por id de compra
export const getPurchaseByIdService = async(purchaseId) => {
    const docRef = doc(dbFirebase, "purchases", purchaseId)
    const docSnap = await getDoc(docRef)

    if(!docSnap.exists()){
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
        collection(dbFirebase, "purchases"),
        orderBy("purchaseDate", "desc")
    )

    const querySnapshot = await getDocs(q)
    const purchases = []

    querySnapshot.forEach((doc) => {
        purchases.push({
            id: doc.id,
            ...doc.data()
        })
    })

    if(purchases.length === 0){
        const error = new Error("No purchases found")
        error.statusCode = 204
        throw error
    }
    return purchases
}