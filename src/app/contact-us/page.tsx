import Contact from '@/components/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with Green For Life',
  description: 'Reach out to Green For Life for inquiries, partnerships, or support. Connect with us via email, phone, or our contact form.',
  keywords: 'Green For Life, Contact Us, inquiries, partnerships, support, email, phone, contact form, nonprofit, charity',
  
  openGraph: {
    title: 'Contact Us | Get in Touch with Green For Life',
    description: 'Reach out to Green For Life for inquiries, partnerships, or support. Connect with us via email, phone, or our contact form.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.greenforlife.org/contact-us',
    siteName: 'Green For Life',
    images: [
      {
        url: 'https://www.greenforlife.org/images/contact-us-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Green For Life Contact Us - Get in Touch',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Get in Touch with Green For Life',
    description: 'Reach out to Green For Life for inquiries, partnerships, or support. Connect with us via email, phone, or our contact form.',
    site: '@greenforlife',
    // images: 'https://www.greenforlife.org/images/contact-us-twitter-image.jpg', // Update with a relevant image URL
  },
};

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  )
}