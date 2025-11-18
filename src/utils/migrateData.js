// Script de utilidad para migrar datos mock a Firestore
// Este archivo puede ser usado temporalmente para poblar Firestore con datos iniciales

import { 
  collection, 
  addDoc, 
  doc, 
  setDoc 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Datos de ejemplo basados en mockData.js
const products = [
  {
    title: "Pizza Margherita",
    price: 1200,
    description: "Deliciosa pizza con tomate, mozzarella fresca y albahaca",
    category: "pizzas",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
    stock: 10
  },
  {
    title: "Pizza Pepperoni",
    price: 1400,
    description: "Pizza con pepperoni, mozzarella y salsa de tomate",
    category: "pizzas",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
    stock: 8
  },
  {
    title: "Hamburguesa Clásica",
    price: 1800,
    description: "Hamburguesa con carne, lechuga, tomate y salsa especial",
    category: "hamburguesas",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    stock: 15
  },
  {
    title: "Hamburguesa BBQ",
    price: 2000,
    description: "Hamburguesa con salsa BBQ, cebolla caramelizada y bacon",
    category: "hamburguesas",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400",
    stock: 12
  },
  {
    title: "Ensalada César",
    price: 1000,
    description: "Ensalada fresca con lechuga, crutones, parmesano y aderezo césar",
    category: "ensaladas",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    stock: 20
  },
  {
    title: "Ensalada Mediterránea",
    price: 1100,
    description: "Ensalada con tomate, pepino, aceitunas y queso feta",
    category: "ensaladas",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    stock: 18
  },
  {
    title: "Pasta Carbonara",
    price: 1600,
    description: "Pasta con salsa carbonara, panceta y parmesano",
    category: "pastas",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
    stock: 14
  },
  {
    title: "Pasta Bolognesa",
    price: 1500,
    description: "Pasta con salsa bolognesa tradicional",
    category: "pastas",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400",
    stock: 16
  }
];

const categories = [
  { 
    name: "Pizzas", 
    description: "Deliciosas pizzas artesanales" 
  },
  { 
    name: "Hamburguesas", 
    description: "Hamburguesas gourmet" 
  },
  { 
    name: "Ensaladas", 
    description: "Ensaladas frescas y saludables" 
  },
  { 
    name: "Pastas", 
    description: "Pastas italianas auténticas" 
  }
];

// Función para migrar productos
export const migrateProducts = async () => {
  const productsCollection = collection(db, 'products');
  const results = [];
  
  for (const product of products) {
    try {
      const docRef = await addDoc(productsCollection, product);
      results.push({ success: true, id: docRef.id, title: product.title });
    } catch (error) {
      results.push({ success: false, title: product.title, error: error.message });
    }
  }
  
  return results;
};

// Función para migrar categorías
export const migrateCategories = async () => {
  const categoriesCollection = collection(db, 'categories');
  const results = [];
  
  for (const category of categories) {
    try {
      // Usar el nombre en minúsculas como ID para que coincida con la categoría del producto
      const categoryId = category.name.toLowerCase();
      const docRef = doc(categoriesCollection, categoryId);
      await setDoc(docRef, category);
      results.push({ success: true, id: categoryId, name: category.name });
    } catch (error) {
      results.push({ success: false, name: category.name, error: error.message });
    }
  }
  
  return results;
};

// Función para migrar todos los datos
export const migrateAllData = async () => {
  console.log('Iniciando migración de datos...');
  
  const categoriesResult = await migrateCategories();
  console.log('Categorías migradas:', categoriesResult);
  
  const productsResult = await migrateProducts();
  console.log('Productos migrados:', productsResult);
  
  return { categories: categoriesResult, products: productsResult };
};

// Para usar este script, ejecutar en la consola del navegador o crear un componente temporal
// Ejemplo: importar y llamar a migrateAllData() desde la consola del navegador

