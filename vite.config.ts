// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],

  server: {
    allowedHosts: ["anh-billowier-atlas.ngrok-free.dev", "all"],
    cors: true,
    host: true,
    port: 5173,
  },

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});