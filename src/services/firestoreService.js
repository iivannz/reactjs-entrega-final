import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

const productsCollection = collection(db, 'products');
const categoriesCollection = collection(db, 'categories');
const ordersCollection = collection(db, 'orders');

export const getProducts = async (categoryId = null) => {
  try {
    let q;
    if (categoryId) {
      q = query(productsCollection, where('category', '==', categoryId));
    } else {
      q = productsCollection;
    }
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    throw new Error('Error al obtener productos: ' + error.message);
  }
};

export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Producto no encontrado');
    }
  } catch (error) {
    throw new Error('Error al obtener producto: ' + error.message);
  }
};

export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(categoriesCollection);
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return categories;
  } catch (error) {
    throw new Error('Error al obtener categorías: ' + error.message);
  }
};

export const createOrder = async (orderData) => {
  try {
    const orderWithTimestamp = {
      ...orderData,
      date: serverTimestamp()
    };
    const docRef = await addDoc(ordersCollection, orderWithTimestamp);
    return docRef.id;
  } catch (error) {
    throw new Error('Error al crear la orden: ' + error.message);
  }
};

