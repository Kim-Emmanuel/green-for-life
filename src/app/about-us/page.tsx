import About from '@/components/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Green For Life | Empowering Sustainable Communities',
  description: 'Discover how Green For Life is transforming communities through sustainable development, education, and environmental initiatives. Learn about our mission, vision, and impactful projects in underprivileged regions.',
  keywords: 'Green For Life, About Us, sustainable development, community empowerment, environmental initiatives, education, nonprofit organization, charity, underprivileged communities, green energy, climate action, humanitarian aid, mission, vision, values',
  
  // Open Graph / Facebook
  openGraph: {
    title: 'About Green For Life | Empowering Sustainable Communities',
    description: 'Discover how Green For Life is transforming communities through sustainable development, education, and environmental initiatives. Learn about our mission, vision, and impactful projects in underprivileged regions.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.greenforlife.org/about-us',
    siteName: 'Green For Life',
    images: [
      {
        url: 'https://www.greenforlife.org/images/about-us-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Green For Life About Us page image showcasing community empowerment and sustainability projects',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'About Green For Life | Empowering Sustainable Communities',
    description: 'Discover how Green For Life is transforming communities through sustainable development, education, and environmental initiatives. Learn about our mission, vision, and impactful projects in underprivileged regions.',
    site: '@greenforlife',
    images: 'https://www.greenforlife.org/images/about-us-twitter-image.jpg', // Update with a relevant image URL
  },
};

export default function AboutPage() {
  return (
    <main>
      <About />
    </main>
  )
}