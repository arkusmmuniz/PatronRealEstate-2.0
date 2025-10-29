// IDXBroker API Configuration
export const IDXBROKER_CONFIG = {
  API_KEY: "fdw6HWC0av32ts0CvUBvhJ",
  BASE_URL: "https://middleware.idxbroker.com/mls",
  // Replace with your actual IDXBroker domain when you have real data
  WEBSITE_URL: "https://www.idxbroker.com",
  DEFAULT_LIMIT: 20,
  CAROUSEL_LIMIT: 18
} as const;

// Environment-based configuration
export const getApiKey = () => {
  // In production, you might want to use environment variables
  return process.env.NEXT_PUBLIC_IDXBROKER_API_KEY || IDXBROKER_CONFIG.API_KEY;
};
