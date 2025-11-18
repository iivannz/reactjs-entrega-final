import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  // En desarrollo usar '/' y en producción '/reactjs-entrega2/'
  const base = command === 'build' ? '/reactjs-entrega2/' : '/';
  
  return {
    plugins: [react()],
    base: base,
    server: {
      // Configurar para manejar todas las rutas en desarrollo
      fs: {
        strict: false,
      },
    },
  };
})
