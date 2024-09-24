import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false,
  },

  build: {
    //   extractCSS: false,
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt"],
  app: {
    head: {
      title:
        "SERVF",
    },
  },
  nitro: {
    serveStatic: true,
  },
  routeRules: {
    '/admin/**': { middleware: ['auth'] } as any
  },
  
  sourcemap: { server: true, client: false },
  devServerHandlers: [],
  hooks: {
    "vite:extendConfig": (config: any) => {
      config.plugins.push(
        vuetify({
          styles: { configFile: resolve("/assets/scss/variables.scss") },
        })
      );
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
    }
  },
});
