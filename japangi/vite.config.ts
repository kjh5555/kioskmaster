import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use Emotion's automatic JSX runtime so `css` prop works without per-file pragmas.
  plugins: [react({ jsxImportSource: "@emotion/react" })],
});
