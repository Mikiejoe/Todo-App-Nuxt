// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/supabase"],
  supabase: {
    redirectOptions: {
      login: "/auth/login",
      callback: "/auth/confirm",
      exclude: ["/auth/register"],
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["cookie"], // Don't try to optimize this on the client
      include: ["@supabase/postgrest-js"],
    },
  },
});
