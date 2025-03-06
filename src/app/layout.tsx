import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from 'next/font/google';
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Load the Montserrat font with specific subsets and weights
const montserrat = Montserrat({
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

// Load the Geist Mono font for monospace text (optional)
const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: {
    default: "Next.js Starter Pro",
    template: "%s | Next.js Starter Pro",
  },
  description: "A professional Next.js starter template with modern features.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Starter Template", "Professional"],
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "Next.js Starter Pro",
    description: "A professional Next.js starter template with modern features.",
    url: "https://yourwebsite.com",
    siteName: "Next.js Starter Pro",
    images: [
      {
        url: "https://yourwebsite.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next.js Starter Pro",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Starter Pro",
    description: "A professional Next.js starter template with modern features.",
    images: ["https://yourwebsite.com/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header */}
        <Header />
        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
