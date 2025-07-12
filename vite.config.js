import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // or vue() if using Vue

export default defineConfig({
  plugins: [react()], // or vue()
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Group React-related dependencies
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "vendor-react";
          }

          // Group other large dependencies
          if (id.includes("node_modules")) {
            return "vendor"; // general vendor chunk
          }

          // Optional: Create separate chunks for specific features
          if (id.includes("src/components/")) {
            return "components";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust warning limit if needed
  },
});
