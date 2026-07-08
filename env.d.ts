/// <reference types="vite/client" />

/**
 * Public environment variables for the HushVoting Website.
 * Only variables prefixed with VITE_ (or the framework's public prefix) are
 * available to browser code. All values here are safe for public exposure.
 */
interface ImportMetaEnv {
  /** Base URL of the HushVoting website */
  readonly VITE_PUBLIC_SITE_URL?: string;
  /** Base URL of the HushVoting web client (app.hushvoting.com) */
  readonly VITE_APP_SITE_URL?: string;
  /** Base URL of the HushNetwork API */
  readonly VITE_HUSHSERVERNODE_GRPC_URL?: string;
  /** Base URL for marketing redirects */
  readonly VITE_MARKETING_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
