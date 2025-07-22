import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/shoppingreact/paradise-nursery-shopping-cart-app/',
  plugins: [react()],
});
