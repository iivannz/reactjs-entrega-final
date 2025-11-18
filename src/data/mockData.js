// Mock data for the restaurant app
export const products = [
  {
    id: 1,
    title: "Pizza Margarita",
    price: 18000,
    description: "Deliciosa pizza con tomate, mozzarella fresca y albahaca",
    category: "pizzas",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400",
    stock: 10
  },
  {
    id: 2,
    title: "Pizza Pepperoni",
    price: 24000,
    description: "Pizza con pepperoni, mozzarella y salsa de tomate",
    category: "pizzas",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
    stock: 8
  },
  {
    id: 3,
    title: "Hamburguesa Clásica",
    price: 18000,
    description: "Hamburguesa con carne, lechuga, tomate y salsa especial",
    category: "hamburguesas",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    stock: 15
  },
  {
    id: 4,
    title: "Hamburguesa BBQ",
    price: 20000,
    description: "Hamburguesa con salsa BBQ, cebolla caramelizada y bacon",
    category: "hamburguesas",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400",
    stock: 12
  },
  {
    id: 5,
    title: "Ensalada César",
    price: 10000,
    description: "Ensalada fresca con lechuga, crutones, parmesano y aderezo césar",
    category: "ensaladas",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    stock: 20
  },
  {
    id: 6,
    title: "Ensalada Mediterránea",
    price: 11000,
    description: "Ensalada con tomate, pepino, aceitunas y queso feta",
    category: "ensaladas",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    stock: 18
  },
  {
    id: 7,
    title: "Pasta Carbonara",
    price: 16000,
    description: "Pasta con salsa carbonara, panceta y parmesano",
    category: "pastas",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
    stock: 14
  },
  {
    id: 8,
    title: "Pasta Bolognesa",
    price: 15000,
    description: "Pasta con salsa bolognesa tradicional",
    category: "pastas",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400",
    stock: 16
  }
];

export const categories = [
  { id: "pizzas", name: "Pizzas", description: "Deliciosas pizzas artesanales" },
  { id: "hamburguesas", name: "Hamburguesas", description: "Hamburguesas gourmet" },
  { id: "ensaladas", name: "Ensaladas", description: "Ensaladas frescas y saludables" },
  { id: "pastas", name: "Pastas", description: "Pastas italianas auténticas" }
];

// Simulate API calls with delays
export const getProducts = (categoryId = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (categoryId) {
        const filteredProducts = products.filter(product => product.category === categoryId);
        resolve(filteredProducts);
      } else {
        resolve(products);
      }
    }, 1000); // 1 second delay
  });
};

export const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, 1000); // 1 second delay
  });
};

export const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 500); // 0.5 second delay
  });
};
