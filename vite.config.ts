import { defineConfig } from 'vite';
export default defineConfig({
    root: __dirname,
    base: './',
    
    server: {
        port: 8080,
        open: "index.html"
    }
});