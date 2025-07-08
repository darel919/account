// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      backendUrl: process.env.BACKEND_URL || 'https://api.darelisme.my.id',
      authUrl: process.env.AUTH_URL || '/auth/v2',
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
