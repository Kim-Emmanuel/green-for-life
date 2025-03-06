import Home from '@/components/Home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Green For Life | Empowering Sustainable Communities',
  description: 'Join Green For Life in creating a sustainable future. Discover our mission, vision, and impact. Donate, volunteer, or subscribe to our newsletter to support our initiatives.',
  keywords: 'Green For Life, sustainable communities, donate, volunteer, climate action, environmental initiatives, nonprofit, charity, sustainability, green energy, community empowerment',
  
  openGraph: {
    title: 'Green For Life | Empowering Sustainable Communities',
    description: 'Join Green For Life in creating a sustainable future. Discover our mission, vision, and impact. Donate, volunteer, or subscribe to our newsletter to support our initiatives.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.greenforlife.org',
    siteName: 'Green For Life',
    images: [
      {
        url: 'https://www.greenforlife.org/images/home-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Green For Life Home Page - Empowering Sustainable Communities',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Green For Life | Empowering Sustainable Communities',
    description: 'Join Green For Life in creating a sustainable future. Discover our mission, vision, and impact. Donate, volunteer, or subscribe to our newsletter to support our initiatives.',
    site: '@greenforlife',
    // images: 'https://www.greenforlife.org/images/home-twitter-image.jpg', // Twitter does not support multiple images
  },
};

export default function HomePage() {
  return (
    <main>
      <Home />
    </main>
  )
}