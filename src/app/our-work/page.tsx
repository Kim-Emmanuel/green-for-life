import OurWork from '@/components/OurWork';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | Green For Life’s Sustainable Initiatives',
  description: 'Explore Green For Life’s impactful projects in agriculture, forestry, climate resilience, and more. Learn how we’re driving sustainable change in communities.',
  keywords: 'Green For Life, Our Work, sustainable initiatives, agriculture, forestry, climate resilience, community projects, environmental impact, nonprofit, charity',
  
  openGraph: {
    title: 'Our Work | Green For Life’s Sustainable Initiatives',
    description: 'Explore Green For Life’s impactful projects in agriculture, forestry, climate resilience, and more. Learn how we’re driving sustainable change in communities.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.greenforlife.org/our-work',
    siteName: 'Green For Life',
    images: [
      {
        url: 'https://www.greenforlife.org/images/our-work-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Green For Life Our Work - Sustainable Initiatives',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work | Green For Life’s Sustainable Initiatives',
    description: 'Explore Green For Life’s impactful projects in agriculture, forestry, climate resilience, and more. Learn how we’re driving sustainable change in communities.',
    site: '@greenforlife',
    // images: 'https://www.greenforlife.org/images/our-work-twitter-image.jpg', // Update with a relevant image URL
  },
};

export default function OurWorkPage() {
  return (
    <main>
      <OurWork />
    </main>
  )
}