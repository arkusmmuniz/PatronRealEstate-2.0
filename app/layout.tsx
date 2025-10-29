import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ConditionalLayout } from "@/components/conditional-layout";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Patron Real Estate Services - Your Trusted Real Estate Partner",
  description:
    "Professional real estate services for buying, selling, and property management. Expert agents helping you find your dream home in Miami.",
  generator: "v0.app",
  icons: {
    icon: '/croped patron icon.png',
    apple: '/croped patron icon.png',
  },
  other: {
    'Content-Security-Policy': "img-src 'self' data: blob: https: http:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; style-src 'self' 'unsafe-inline' https: http:;"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      suppressHydrationWarning={true}
    >
      <body className="font-sans bg-background text-foreground" suppressHydrationWarning={true}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
