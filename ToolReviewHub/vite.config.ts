import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Define __dirname for ESM context
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: '/ToolNest/',
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []
    ),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: 'client',
  build: {
    outDir: path.resolve(__dirname, "dist", "public"),
    emptyOutDir: true,
  },
  server: {
    port: 3003,
    fs: {
      strict: true,
      deny: ["**/.*"],
      allow: [path.resolve(__dirname, "client", "src"), path.resolve(__dirname, "client")],
    },
    proxy: {
      '/api': 'http://localhost:5000', // Proxy /api requests to Express server
    },
  },
  optimizeDeps: {
    exclude: ['@tanstack/react-query-devtools'],
  },
});
