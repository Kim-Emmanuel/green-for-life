import GetInvolved from '@/components/GetInvolved';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Involved | Support Green For Life’s Mission',
  description: 'Join Green For Life’s mission to empower communities. Donate, volunteer, partner with us, or subscribe to our newsletter to make a difference.',
  keywords: 'Green For Life, Get Involved, donate, volunteer, partnership, newsletter, support, nonprofit, charity, sustainability, community empowerment',
  
  openGraph: {
    title: 'Get Involved | Support Green For Life’s Mission',
    description: 'Join Green For Life’s mission to empower communities. Donate, volunteer, partner with us, or subscribe to our newsletter to make a difference.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.greenforlife.org/get-involved',
    siteName: 'Green For Life',
    images: [
      {
        url: 'https://www.greenforlife.org/images/get-involved-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Green For Life Get Involved - Support Our Mission',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Get Involved | Support Green For Life’s Mission',
    description: 'Join Green For Life’s mission to empower communities. Donate, volunteer, partner with us, or subscribe to our newsletter to make a difference.',
    site: '@greenforlife',
    // images: 'https://www.greenforlife.org/images/get-involved-twitter-image.jpg', // Update with a relevant image URL
  },
};

export default function GetInvolvedPage() {
  return (
    <main>
      <GetInvolved />
    </main>
  )
}