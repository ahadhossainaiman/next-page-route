export const Env = {
  // Base
  webTitle: process.env.NEXT_PUBLIC_WEB_TITLE,
  webDescription: process.env.NEXT_PUBLIC_WEB_DESCRIPTION,

  // Configuration
  internalApiUrl: process.env.NEXT_PUBLIC_INTERNAL_API_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  webMode: process.env.NEXT_PUBLIC_WEB_MODE,
  webHostUrl: process.env.NEXT_PUBLIC_WEB_HOST_URL,
  storageUrl: process.env.NEXT_PUBLIC_STORAGE_URL,

  // Flag
  isDevelopment: process.env.NEXT_PUBLIC_WEB_MODE === 'development',
  isStaging: process.env.NEXT_PUBLIC_WEB_MODE === 'staging',
  isProduction: process.env.NEXT_PUBLIC_WEB_MODE === 'production',
  isEnableRBAC: process.env.NEXT_PUBLIC_ENABLE_RBAC,
};
