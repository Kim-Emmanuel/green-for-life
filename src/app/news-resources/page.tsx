import NewsResources from '@/components/NewsResources';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Resources | Green For Life Updates and Insights',
  description: 'Stay updated with Green For Life’s latest news, blog posts, publications, impact stories, and career opportunities. Explore our resources and insights.',
  keywords: 'Green For Life, News, Resources, blog, publications, impact stories, tenders, careers, nonprofit, charity, sustainability updates',
  
  openGraph: {
    title: 'News & Resources | Green For Life Updates and Insights',
    description: 'Stay updated with Green For Life’s latest news, blog posts, publications, impact stories, and career opportunities. Explore our resources and insights.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.greenforlife.org/news-resources',
    siteName: 'Green For Life',
    images: [
      {
        url: 'https://www.greenforlife.org/images/news-resources-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Green For Life News & Resources - Updates and Insights',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'News & Resources | Green For Life Updates and Insights',
    description: 'Stay updated with Green For Life’s latest news, blog posts, publications, impact stories, and career opportunities. Explore our resources and insights.',
    site: '@greenforlife',
    // images: 'https://www.greenforlife.org/images/news-resources-twitter-image.jpg', // Update with a relevant image URL
  },
};

export default function NewsResourcesPage() {
  return (
    <main>
      <NewsResources />
    </main>
  )
}