import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  // Inline the production CSS and JavaScript so this works on any static host.
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: {
    // Publish the browser-ready HTML/CSS/JS output at the project root.
    outDir: path.resolve(__dirname, ".."),
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
