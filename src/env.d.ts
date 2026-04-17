/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_AIRBNB_URL?: string;
  readonly RESEND_API_KEY?: string;
  readonly CONCIERGE_TO_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
