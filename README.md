# RestoApp - E-commerce Completo con React y Firebase

## 📋 Descripción

RestoApp es una aplicación e-commerce completa desarrollada con React, React Router y Firebase/Firestore. Permite a los usuarios navegar por un catálogo de productos de restaurante, filtrar por categorías, ver detalles de productos, agregar items al carrito y realizar compras.

## ✨ Funcionalidades Implementadas

### 🚀 Navegación (React Router)
- ✅ SPA funcional sin recargas de página
- ✅ Rutas dinámicas para categorías (`/category/:categoryId`)
- ✅ Rutas dinámicas para detalle de producto (`/item/:id`)
- ✅ Uso correcto de `useParams()` y `useEffect()` para detectar cambios
- ✅ Uso de `NavLink` para indicar la ruta activa con estilos
- ✅ Redirección para rutas inexistentes (404)

### 📦 Catálogo y Detalle de Productos
- ✅ Lectura de datos desde Firebase/Firestore
- ✅ Funciones correctas: `getDoc()`, `getDocs()`, `query()`
- ✅ Filtrado por categoría usando `useParams()`
- ✅ Renderizado condicional con loaders mientras cargan los datos
- ✅ Ocultar `ItemCount` después de agregar un producto al carrito

### 🛒 Carrito (CartContext / CartProvider)
- ✅ Implementación completa de `CartContext` con Provider
- ✅ Estado global para el carrito de compras
- ✅ Funciones para agregar, eliminar y vaciar el carrito
- ✅ `CartWidget` muestra la cantidad total de productos
- ✅ Sin elementos de UI en el contexto (solo lógica)
- ✅ Persistencia de datos durante la navegación

### 📝 Formulario de Compra (Checkout)
- ✅ Validación completa de campos (nombre, email, teléfono, dirección)
- ✅ Feedback visual de errores
- ✅ Feedback visual tras confirmar la compra
- ✅ Generación de orden en Firestore
- ✅ Limpieza del carrito después de generar la orden
- ✅ Muestra número de orden generado

### 🏗️ Estructura y Organización
- ✅ Separación clara entre componentes contenedores y presentacionales
- ✅ Nombres consistentes y props bien estructuradas
- ✅ Código limpio sin `console.log` ni código sin uso
- ✅ Buenas prácticas de React

## 🛣️ Rutas Implementadas

```
/                    - Página principal (todos los productos)
/category/:categoryId - Productos filtrados por categoría
/item/:id           - Vista detallada de un producto
/cart               - Vista del carrito de compras
/checkout           - Formulario de compra
/*                  - Página 404 para rutas no encontradas
```

## 📦 Librerías Utilizadas

- **React** (^18.3.1) - Biblioteca para construir interfaces de usuario
- **React DOM** (^18.3.1) - Renderizado de React en el navegador
- **React Router DOM** (^7.9.4) - Enrutamiento para aplicaciones React
- **Firebase** (latest) - Backend como servicio (Firestore, Storage, etc.)
- **Vite** (^5.4.8) - Build tool y servidor de desarrollo

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Cuenta de Firebase con proyecto configurado

### Pasos de Instalación

1. **Clonar el repositorio** (o descargar el código):
```bash
git clone <url-del-repositorio>
cd reactjs-entrega-final
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
   
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   
```env
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

   Para obtener estos valores:
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Selecciona tu proyecto
   - Ve a Configuración del proyecto (⚙️) > Configuración general
   - En "Tus aplicaciones", selecciona la web app o crea una nueva
   - Copia los valores de configuración

4. **Configurar Firestore**:
   
   En Firebase Console:
   - Ve a Firestore Database
   - Crea una base de datos en modo de prueba
   - Crea las siguientes colecciones:
     - `products` - Documentos con campos: `title`, `price`, `description`, `category`, `image`, `stock`
     - `categories` - Documentos con campos: `name`, `description`
     - `orders` - Se creará automáticamente al realizar compras

5. **Ejecutar en modo desarrollo**:
```bash
npm run dev
```

6. **Abrir en el navegador**: `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── Component/
│   ├── Cart.jsx              # Componente del carrito de compras
│   ├── CartWidget.jsx        # Widget del carrito en navbar
│   ├── Checkout.jsx          # Formulario de compra
│   ├── ItemCount.jsx         # Selector de cantidad
│   ├── ItemDetail.jsx        # Vista detallada del producto (presentacional)
│   ├── ItemDetailContainer.jsx # Contenedor del detalle (lógica)
│   ├── ItemList.jsx          # Lista de productos (presentacional)
│   ├── ItemListConteiner.jsx # Contenedor de lista (lógica)
│   ├── Navbar.jsx            # Barra de navegación
│   └── NotFound.jsx          # Página 404
├── context/
│   └── CartContext.jsx       # Context y Provider del carrito
├── firebase/
│   └── config.js             # Configuración de Firebase
├── services/
│   └── firestoreService.js   # Servicios para Firestore
├── App.jsx                   # Componente principal con rutas
└── main.jsx                  # Punto de entrada
```

## 📸 Capturas de Pantalla

*(Agrega aquí capturas de pantalla o GIFs del funcionamiento de tu aplicación)*

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run deploy` - Despliega a GitHub Pages (si está configurado)

## 🎯 Características Técnicas

### Componentes Contenedores vs Presentacionales
- **Contenedores**: `ItemListContainer`, `ItemDetailContainer` - Manejan lógica y estado
- **Presentacionales**: `ItemList`, `ItemDetail`, `Cart`, `Checkout` - Solo renderizan UI

### Context API
- `CartContext` provee estado global del carrito
- Funciones: `addItem`, `removeItem`, `clearCart`, `getTotalQuantity`, `getTotalPrice`
- Sin lógica de UI en el contexto

### Firebase/Firestore
- Lectura de productos con `getDocs()` y `query()` para filtros
- Lectura de producto individual con `getDoc()`
- Escritura de órdenes con `addDoc()` y `serverTimestamp()`

## 🌐 Deploy

Para hacer deploy, puedes usar:

- **Vercel**: `vercel`
- **Netlify**: Arrastra la carpeta `dist` después de `npm run build`
- **Firebase Hosting**: `firebase deploy`
- **GitHub Pages**: `npm run deploy`

## 📝 Notas

- Asegúrate de configurar las reglas de seguridad en Firestore según tus necesidades
- En producción, configura las reglas para proteger tus datos
- Las variables de entorno deben estar configuradas en tu plataforma de deploy también

## 👨‍💻 Autor

Proyecto desarrollado como entrega final del curso de React de Coderhouse.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
