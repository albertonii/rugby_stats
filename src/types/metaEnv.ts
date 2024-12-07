/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_AUDIENCE: string;
  readonly VITE_AUTH0_REDIRECT_URI: string;
  readonly VITE_AUTH0_CLIENT_SECRET: string;
  // Agrega otras variables de entorno aquí si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
