'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Book, 
  Newspaper, 
  Award, 
  Briefcase, 
  Filter, 
  ArrowDown, 
  ArrowUp 
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { smoothScroll } from '@/lib/utils'

// Types for different content categories
type ContentCategory = 'blog' | 'publications' | 'impact' | 'tenders' | 'careers'

type ContentItem = {
  id: string
  title: string
  date: string
  category: ContentCategory
  author?: string
  summary: string
  imageUrl: string
  link: string
  isFeatured?: boolean
}

const CONTENT_ITEMS: ContentItem[] = [
  // Featured Content
  {
    id: 'featured-1',
    title: 'Sustainable Agriculture: Feeding the Future',
    date: 'June 15, 2023',
    category: 'blog',
    author: 'Emily Green',
    summary: 'Exploring innovative farming techniques that protect our planet and ensure food security.',
    imageUrl: '/images/hero.webp',
    link: '/blog/sustainable-agriculture',
    isFeatured: true
  },
  {
    id: 'featured-2',
    title: 'Annual Impact Report 2022',
    date: 'January 10, 2023',
    category: 'publications',
    summary: 'Comprehensive report on G4L\'s environmental initiatives and global impact.',
    imageUrl: '/our-work/agriculture.webp',
    link: '/publications/annual-report-2022',
    isFeatured: true
  },
  // Blog Posts
  {
    id: 'blog-1',
    title: 'Community-Led Conservation: A Success Story',
    date: 'May 22, 2023',
    category: 'blog',
    author: 'Michael Okonkwo',
    summary: 'How local communities are driving environmental protection and restoration.',
    imageUrl: '/our-work/research.webp',
    link: '/blog/community-conservation'
  },
  // Publications
  {
    id: 'pub-1',
    title: 'Climate Resilience Handbook',
    date: 'March 5, 2023',
    category: 'publications',
    summary: 'A guide to building climate-resilient communities.',
    imageUrl: '/our-work/climate-adaptation.webp',
    link: '/publications/climate-resilience-handbook'
  },
  // Impact Stories
  {
    id: 'impact-1',
    title: 'Transforming Lives Through Reforestation',
    date: 'April 5, 2023',
    category: 'impact',
    summary: 'How our tree-planting initiatives have changed communities in Brazil.',
    imageUrl: '/our-work/coffee.webp',
    link: '/impact/brazil-reforestation'
  },
  // Tenders
  {
    id: 'tender-1',
    title: 'Community Development Project Tender',
    date: 'July 1, 2023',
    category: 'tenders',
    summary: 'Open tender for sustainable community development initiatives.',
    imageUrl: '/our-work/green-energy4.webp',
    link: '/tenders/community-development'
  },
  // Careers
  {
    id: 'career-1',
    title: 'Climate Resilience Specialist',
    date: 'June 20, 2023',
    category: 'careers',
    summary: 'Join our team and make a global impact in climate adaptation strategies.',
    imageUrl: '/our-work/green-energy.webp',
    link: '/careers/climate-resilience-specialist'
  }
]

export default function NewsResources() {
  const [activeCategory, setActiveCategory] = useState<ContentCategory>('blog')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const handleCategoryChange = (category: ContentCategory) => {
    setActiveCategory(category);
    smoothScroll(`#${category}-section`, 80);
  };

  // Filter and search content
  const filteredContent = CONTENT_ITEMS.filter(item => 
    item.category === activeCategory && 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort content by date
  const sortedContent = filteredContent.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
  })

  // Featured content
  const featuredContent = CONTENT_ITEMS.filter(item => item.isFeatured)

  // Category icons mapping
  const categoryIcons = {
    blog: <Newspaper className="mr-2 w-6 h-6" />,
    publications: <Book className="mr-2 w-6 h-6" />,
    impact: <Award className="mr-2 w-6 h-6" />,
    tenders: <Filter className="mr-2 w-6 h-6" />,
    careers: <Briefcase className="mr-2 w-6 h-6" />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-800 mb-6"
          >
            News & Resources
          </motion.h1>
          <p className="max-w-3xl mx-auto text-lg text-green-700">
            Stay informed about our latest initiatives, impact stories, 
            and opportunities to create positive environmental change.
          </p>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-green-800 mb-8">Featured Content</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredContent.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                width={600} 
                height={400} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{item.date}</span>
                  {item.author && (
                    <span className="mx-2">•</span>
                  )}
                  {item.author && (
                    <span>By {item.author}</span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  {item.title}
                </h2>
                <p className="text-gray-700 mb-4">
                  {item.summary}
                </p>
                <Link 
                  href={item.link} 
                  className="text-green-600 hover:text-green-800 font-semibold"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Content Navigation */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4">
            {Object.keys(categoryIcons).map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category as ContentCategory)}
                className={`
                  flex items-center px-4 py-2 rounded-full transition-all
                  ${activeCategory === category 
                    ? 'bg-primary text-gray-900 font-medium shadow-lg' 
                    : 'bg-green-50 text-green-700 font-medium hover:bg-green-100'
                  }
                `}
              >
                {categoryIcons[category as ContentCategory]}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full hover:bg-green-100"
          >
            {sortOrder === 'asc' ? (
              <>
                <ArrowUp className="mr-2 w-4 h-4" />
                Oldest First
              </>
            ) : (
              <>
                <ArrowDown className="mr-2 w-4 h-4" />
                Newest First
              </>
            )}
          </Button>
        </div>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-8">
          <input 
            type="text"
            placeholder={`Search ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-green-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-800"
          />
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 px-4">
          {sortedContent.map((item) => (
            <motion.div 
              key={item.id}
              id={`${item.category}-section`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Image 
                src={item.imageUrl} 
                alt={item.title} 
                width={400} 
                height={250} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{item.date}</span>
                  {item.author && (
                    <span className="mx-2">•</span>
                  )}
                  {item.author && (
                    <span>By {item.author}</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-green-800 mb-4">
                  {item.title}
                </h2>
                <p className="text-gray-700 mb-4">
                  {item.summary}
                </p>
                <Link 
                  href={item.link} 
                  className="text-green-600 hover:text-green-800 font-semibold"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}