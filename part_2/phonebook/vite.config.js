import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/main.jsx', // Set the entry point to your JavaScript/TypeScript file
    },
  },
});
