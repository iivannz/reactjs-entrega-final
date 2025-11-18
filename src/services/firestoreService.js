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
import { db, isFirebaseConfigured } from '../firebase/config';
import * as mockData from '../data/mockData';

// Collections solo si Firebase está configurado
let productsCollection = null;
let categoriesCollection = null;
let ordersCollection = null;

if (isFirebaseConfigured && db) {
  productsCollection = collection(db, 'products');
  categoriesCollection = collection(db, 'categories');
  ordersCollection = collection(db, 'orders');
}

export const getProducts = async (categoryId = null) => {
  // Si Firebase no está configurado, usar datos mock
  if (!isFirebaseConfigured || !db) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (categoryId) {
          const filteredProducts = mockData.products.filter(product => product.category === categoryId);
          resolve(filteredProducts);
        } else {
          resolve(mockData.products);
        }
      }, 1000);
    });
  }

  // Usar Firebase si está configurado
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
  // Si Firebase no está configurado, usar datos mock
  if (!isFirebaseConfigured || !db) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = mockData.products.find(p => p.id === parseInt(productId) || p.id === productId);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Producto no encontrado'));
        }
      }, 1000);
    });
  }

  // Usar Firebase si está configurado
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
  // Si Firebase no está configurado, usar datos mock
  if (!isFirebaseConfigured || !db) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData.categories);
      }, 500);
    });
  }

  // Usar Firebase si está configurado
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
  // Si Firebase no está configurado, simular creación de orden
  if (!isFirebaseConfigured || !db) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generar un ID simulado
        const orderId = 'mock-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        resolve(orderId);
      }, 1000);
    });
  }

  // Usar Firebase si está configurado
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

