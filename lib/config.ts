// IDXBroker API Configuration
export const IDXBROKER_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  BASE_URL: "https://middleware.idxbroker.com/mls",
  // Replace with your actual IDXBroker domain when you have real data
  WEBSITE_URL: "https://www.idxbroker.com",
  DEFAULT_LIMIT: 20,
  CAROUSEL_LIMIT: 18
} as const;

// Environment-based configuration
export const getApiKey = () => {
  // Returns the API key from environment variables
  return process.env.NEXT_PUBLIC_API_KEY || IDXBROKER_CONFIG.API_KEY;
};
