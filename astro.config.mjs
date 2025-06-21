import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import path from "path";
import vercelServerless from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  security: {
    checkOrigin: true,
  },
  output: "server",
  adapter: vercelServerless({
    webAnalytics: { enabled: true },
  }),
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
