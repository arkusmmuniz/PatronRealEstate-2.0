// IDXBroker API Configuration
export const IDXBROKER_CONFIG = {
  API_KEY: "gR0ugo0diM8tTC3cFpSPgZ",
  BASE_URL: "https://middleware.idxbroker.com/mls",
  DEFAULT_LIMIT: 20,
  CAROUSEL_LIMIT: 18
} as const;

// Environment-based configuration
export const getApiKey = () => {
  // In production, you might want to use environment variables
  return process.env.NEXT_PUBLIC_IDXBROKER_API_KEY || IDXBROKER_CONFIG.API_KEY;
};
