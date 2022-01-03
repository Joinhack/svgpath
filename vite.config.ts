import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
export default defineConfig({
    plugins: [viteSingleFile()],
    root: __dirname,
    base: './',

    build: {
        rollupOptions: {
			inlineDynamicImports: true,
			output: {
				manualChunks: () => "svgpath.js",
			},
		}
    },
    
    server: {
        port: 8080,
        open: "index.html"
    }
});