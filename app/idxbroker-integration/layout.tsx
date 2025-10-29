import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IDXBroker Integration - Patron Real Estate Services",
  description: "Discover properties and virtual showings with our IDXBroker integration",
  other: {
    // Disable CSP for this page to allow all images
    'Content-Security-Policy': '',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Cross-Origin-Embedder-Policy': 'unsafe-none',
    'Cross-Origin-Opener-Policy': 'unsafe-none',
    'Cross-Origin-Resource-Policy': 'cross-origin',
  }
};

export default function IDXBrokerIntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Meta tags to disable image security checks */}
      <head>
        <meta httpEquiv="Content-Security-Policy" content="" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="Cross-Origin-Embedder-Policy" content="unsafe-none" />
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="unsafe-none" />
        <meta httpEquiv="Cross-Origin-Resource-Policy" content="cross-origin" />
      </head>
      {children}
    </>
  );
}
