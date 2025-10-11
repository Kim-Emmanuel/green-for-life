import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from 'next/font/google';
import { Toaster } from "sonner";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Load the Montserrat font with specific subsets and weights
const montserrat = Montserrat({
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

// Load the Geist Mono font for monospace text (optional)
const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: true,
  fallback: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
});

<meta name="apple-mobile-web-app-title" content="Green For Life" />

export const metadata: Metadata = {
  title: "Green For Life | Empowering Sustainable Communities",
  description: "Join Green For Life in creating a sustainable future through community-driven environmental initiatives. Support our mission through donations, volunteering, or subscribing to our impact newsletter.",
  keywords: [
    "sustainable communities", 
    "climate action", 
    "environmental nonprofit",
    "green energy solutions",
    "community empowerment",
    "eco-friendly initiatives",
    "environmental charity",
    "sustainability programs",
    "carbon reduction",
    "ecological preservation"
  ],
  authors: [{ 
    name: "Green For Life Team", 
    url: "https://greenforlife.africa" 
  }],
  openGraph: {
    title: "Green For Life | Sustainable Community Development",
    description: "Driving meaningful environmental change through community-led sustainability programs and green energy initiatives.",
    url: "https://greenforlife.africa",
    siteName: "Green For Life",
    images: [
      {
        url: "https://greenforlife.africa/og-banner.jpg",
        width: 1920,
        height: 1080,
        alt: "Green For Life community sustainability project",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Green Revolution @GreenForLife",
    description: "Follow our journey in building sustainable communities and reducing environmental impact worldwide 🌱",
    // images: ["https://greenforlife.org/twitter-card.jpg"],
    site: "@GreenForLife",
    creator: "@GFLCampaigns",
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
    icon: "/favicon.ico",
    shortcut: "/web-app-manifest-512x512.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
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
        <Toaster position="top-right" />
        {/* Header */}
        <Header />
        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>
        {/* Footer */}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
