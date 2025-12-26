import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync } from "fs";

// Плагин для копирования .htaccess в dist
const copyHtaccess = () => ({
  name: "copy-htaccess",
  closeBundle() {
    try {
      copyFileSync(".htaccess", "dist/.htaccess");
      console.log("✓ .htaccess copied to dist/");
    } catch (err) {
      console.warn("⚠ Could not copy .htaccess:", err);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    copyHtaccess(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
