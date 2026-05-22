import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "japangi",
  brand: {
    displayName: "자판기 어렵지않아요",
    primaryColor: "#3182F6", // Toss Blue
    icon: "", // M4에서 실제 아이콘 교체 예정
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: {
      dev: "vite dev",
      build: "vite build",
    },
  },
  permissions: [],
  outdir: "dist",
});
