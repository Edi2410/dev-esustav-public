import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    tsconfigPaths(), // Add the import and use the tsconfigPaths plugin
  ],
  server: {
    host: true,
    port: 5173,
    hmr: {
      overlay: false,
    },
    
  },
});
