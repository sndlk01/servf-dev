import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  vite: {
    // ปิดการใช้งาน vite-plugin-inspect โดยตรง
    optimizeDeps: {
      exclude: ['vite-plugin-inspect']
    },
    build: {
      // เพิ่มการตั้งค่าเพื่อข้ามปลั๊กอิน
      rollupOptions: {
        external: ['vite-plugin-inspect']
      }
    }
  },
  typescript: {
    shim: false,
  },
  devtools: { enabled: false },

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
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    // เพิ่มตรงนี้
    moduleSideEffects: ['cookie-es']
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

  compatibilityDate: "2024-10-27",
});