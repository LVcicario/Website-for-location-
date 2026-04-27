import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

import { LOCALES, DEFAULT_LOCALE } from "./src/i18n/config";

export default defineConfig({
  site: "https://larbois.example",
  output: "static",
  adapter: vercel(),
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: {
          fr: "fr-FR",
          en: "en-US",
          it: "it-IT",
          de: "de-DE",
          es: "es-ES",
          ru: "ru-RU",
          ar: "ar-SA",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
    fallback: {
      it: "en",
      de: "en",
      es: "en",
      ru: "en",
      ar: "en",
    },
  },
  image: {
    domains: [],
  },
});
