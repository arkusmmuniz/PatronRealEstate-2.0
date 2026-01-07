/**
 * Application-wide constants
 */

// IDX Broker URLs
export const IDX_ADVANCED_SEARCH_URL =
  "https://patronrealestateservices.idxbroker.com/idx/search/advanced";

// IDX Broker Rental Search URLs
// These URLs are filtered to show only rental listings (Residential Lease)
export const IDX_RENTALS_URL_EN =
  process.env.NEXT_PUBLIC_IDX_RENTALS_URL_EN ||
  "https://patronrealestateservices.idxbroker.com/idx/search/advanced?pt=Residential%20Lease";

export const IDX_RENTALS_URL_ES =
  process.env.NEXT_PUBLIC_IDX_RENTALS_URL_ES ||
  "https://patronrealestateservices.idxbroker.com/idx/search/advanced?pt=Residential%20Lease";

// Broker Information
export const BROKER_INFO = {
  name: "Fabiola Patron",
  role: "Broker",
  phone: "(323) 350-3137",
  phoneFormatted: "+13233503137",
  email: "patronrealestateservices@gmail.com",
  dreLicense: "02178767",
  imageUrl: "https://patronrealestateservices.com/fabiola-patron-updated.jpg",
  imageUrlFallback: "/fabiola-patron-updated.jpg",
} as const;

// Color constants matching IDX Broker middleware design
export const PATRON_COLORS = {
  lime500: "#84cc16", // Tailwind lime-500
  lime600: "#65a30d", // Tailwind lime-600
} as const;



