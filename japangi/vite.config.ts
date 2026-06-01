import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use Emotion's automatic JSX runtime so `css` prop works without per-file pragmas.
  plugins: [react({ jsxImportSource: "@emotion/react" })],
  // Dev-only same-origin proxy so the local Vite server can call the Railway
  // backend without tripping CORS. To use it, set `VITE_API_BASE_URL=` (empty
  // string) in `.env.development.local` so `lib/api.ts` issues relative
  // requests like `/api/categories`. Production builds keep using the full
  // Railway URL from `.env` and bypass this proxy entirely.
  server: {
    proxy: {
      "/api": {
        target: "https://kioskmaster-production.up.railway.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
