import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        react() // Enables React and JSX support
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // Alias for the `src` directory
        },
    },
    server: {
        port: 3000, // Default port for development
        open: true, // Automatically open the browser
        proxy: {
            '/api': {
                target: 'http://localhost:8000', // Proxy API requests to a backend server
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    build: {
        outDir: 'dist', // Output directory for the production build
        rollupOptions: {
            input: path.resolve(__dirname, 'src/index.tsx'), // Main entry point of the application
        },
    },
});
