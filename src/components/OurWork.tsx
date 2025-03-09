'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  TreePine, 
  Leaf, 
  CloudSun,
  PanelTop as SolarPanel,
  FlaskConical
} from 'lucide-react'
import { Button } from './ui/button'
import { smoothScroll } from "@/lib/utils"

type WorkArea = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  image: string
  highlights: string[]
  keyProjects: Array<{
    name: string
    location: string
    impact: string
  }>
}

const WORK_AREAS: WorkArea[] = [
  {
    id: 'agriculture',
    title: 'Agriculture & Forestry',
    description: `With a double aim to build livelihoods and conserve the environment, G4L promotes sustainable agriculture practices which are climate smart and environmentally sensitive. This involves venturing into crops which protect the soils, nurtures forest, and reduces erosion and other benefits. G4L also promotes value chain development of specific crops and integrated livelihoods/farming (beekeeping, shea butter, gum Arabic) with high market potentials.

    G4L aims to promote afforestation and reafforestation programs in South Sudan which has faced depletion of many forests due to lumbering and charcoal burning. Through the tree planting initiative, G4L prioritizes the propagation of desired and/or endangered species.`,
    icon: <TreePine className="w-12 h-12 text-green-600" />,
    image: '/our-work/agriculture.webp',
    highlights: [
      'Climate-resilient crop systems',
      'Integrated agroforestry models',
      'Endangered species preservation'
    ],
    keyProjects: [
      {
        name: 'Green Corridor Initiative',
        location: 'Amazon Rainforest, Brazil',
        impact: '500,000 trees planted, 1,000 local farmers trained'
      },
      {
        name: 'Sustainable Smallholder Program',
        location: 'Kenya',
        impact: '250 farmers adopted climate-resilient farming methods'
      }
    ]
  },
  {
    id: 'climate',
    title: 'Climate Change Adaptation & Resilience',
    description: `Globally, the effects of climate change are not only getting rampart, but the severity is increasing, and tends to hit the poor harder. Many communities in South Sudan are already facing serious effects of climate variability including flooding, heat waves, erratic rainfall patterns, dry spells, etc. These factors affect the lives and livelihoods of communities in many ways, adding to the already difficult living conditions. 

    G4L works in the climate action spaces to 1) sensitize communities on climate variabilities and climate action, 2) establish early warning systems to mitigate the vulnerability of the people to climatic hazards, 3) promote adaptative response systems and innovative technologies, and 4) promote practices which reduce human contribution to negative effects of climate change.`,
    icon: <CloudSun className="w-12 h-12 text-blue-600" />,
    image: '/our-work/climate-adaptation.webp',
    highlights: [
      'Early warning systems deployment',
      'Flood-resistant infrastructure',
      'Community climate literacy programs'
    ],
    keyProjects: [
      {
        name: 'Coastal Resilience Project',
        location: 'Bangladesh',
        impact: '50,000 people protected from sea-level rise'
      },
      {
        name: 'Urban Green Infrastructure',
        location: 'India',
        impact: '10 cities developed climate adaptation plans'
      }
    ]
  },
  {
    id: 'environment',
    title: 'Environment and Biodiversity',
    description: `G4L aims to promote conservation of the environment, biodiversity and local ecosystem by addressing harmful human factors. G4L promotes sustainable livelihood practices like climate smart agriculture practices which not only reduces harm on the environment, but nourishes the environment to flourish. 

    Emphasis will be placed on minimizing environmental degradation, through sustainable land management practices to prevent excessive deforestation and wetlands drainage, promoting responsible disposals of wastes, and minimizing pollution.`,
    icon: <Leaf className="w-12 h-12 text-emerald-600" />,
    image: '/our-work/coffee.webp',
    highlights: [
      'Ecosystem restoration programs',
      'Sustainable waste management',
      'Biodiversity hotspots protection'
    ],
    keyProjects: [
      {
        name: 'Wetlands Conservation Initiative',
        location: 'Sudd Region, South Sudan',
        impact: '200,000 hectares protected'
      },
      {
        name: 'Urban Air Quality Program',
        location: 'Nigeria',
        impact: '30% PM2.5 reduction in target cities'
      }
    ]
  },
  {
    id: 'green',
    title: 'Green Energy',
    description: `Less than 10% of the population of South Sudan have access to electricity, way below the sub-Saharan average of 48.5%. Despite the low access, South Sudan has significant potential for renewable energy sources like hydropower and solar power. Majority of the population rely on traditional energy sources (wood and charcoal) that involve cutting trees which is destructive to the environment.

    G4L is committed to enhancing the access of population to renewal energy and reduce destruction of forests for firewood. G4L explores and promotes sustainable sources of energy and work to increase the access of the population to clean energy.`,
    icon: <SolarPanel className="w-12 h-12 text-amber-600" />,
    image: '/our-work/green-energy4.webp',
    highlights: [
      'Solar microgrid installations',
      'Clean cooking solutions',
      'Energy entrepreneurship training'
    ],
    keyProjects: [
      {
        name: 'Sunlight for All',
        location: 'Greater Equatoria',
        impact: '5,000 households solar-powered'
      },
      {
        name: 'River Hydropower Pilot',
        location: 'Nile Basin',
        impact: '3 communities with clean energy access'
      }
    ]
  },
  {
    id: 'research',
    title: 'Research and Development',
    description: `G4L aims to explore new knowledge on many facets of the key pillars of 1) agriculture and forestry, 2) climate change adaptation and resilience, 3) environment and biodiversity, and 4) green energy.

    G4L will be collaborating with mission-aligned agencies in research and development in these areas focused on reduction of undesirable outcomes and promotion of improved practices.`,
    icon: <FlaskConical className="w-12 h-12 text-purple-600" />,
    image: '/our-work/research.webp',
    highlights: [
      'Agri-tech innovation',
      'Renewable energy storage R&D',
      'AI environmental monitoring'
    ],
    keyProjects: [
      {
        name: 'Climate Resilience Analytics',
        location: 'Regional Hub, Nairobi',
        impact: '50+ municipalities using our prediction models'
      },
      {
        name: 'Biochar Production Study',
        location: 'Uganda',
        impact: 'Carbon sequestration increased by 40%'
      }
    ]
  }
]

export default function OurWork() {
  const [activeArea, setActiveArea] = useState<string | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const areaId = href.replace('#', '');
    setActiveArea(areaId);
    smoothScroll(href);
  };

  const renderWorkAreaContent = () => {
    const area = WORK_AREAS.find(a => a.id === activeArea)
    if (!area) return null

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-start"
      >
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">{area.icon}</div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {area.title}
            </h3>
          </div>
          
          <div className="prose-lg text-gray-600 space-y-6">
            {area.description.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-xl">
              <h4 className="text-xl font-semibold text-green-800 mb-4">
                Key Highlights
              </h4>
              <ul className="grid md:grid-cols-2 gap-4">
                {area.highlights.map((highlight, index) => (
                  <li 
                    key={index}
                    className="flex items-center p-3 bg-white rounded-lg shadow-sm"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-green-800 mb-6">
                Featured Projects
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                {area.keyProjects.map((project, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-semibold text-gray-900">{project.name}</h5>
                      <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-md">
                        {project.location}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.impact}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={area.image}
            alt={area.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-green-50 pb-24 pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Pioneering Sustainable Solutions
            </h1>
            <p className="text-xl text-gray-600">
              Transforming environmental challenges into opportunities through innovation 
              and community empowerment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work Areas Navigation */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="flex overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-2 mx-auto flex-wrap sm:gap-3 md:gap-4 mb-4">
            {WORK_AREAS.map((area) => (
              <Button
                key={area.id}
                onClick={(e) => handleNavClick(e, `#${area.id}`)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors
                  ${activeArea === area.id 
                    ? 'bg-primary text-gray-900 shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-green-100 shadow-sm'
                  }`}
              >
                {area.title}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {renderWorkAreaContent()}
        </div>
      </section>
    </div>
  )
}