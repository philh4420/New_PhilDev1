import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __WS_TOKEN__: '""', // shim for dev-only token if needed
  },
  build: {
    target: "es2017", // JS output target for build
  },
  esbuild: {
    target: "es2017", // Target for dev (esbuild transform)
  },
}));