"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion} from "framer-motion";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { smoothScroll } from "@/lib/utils";
import {
	ArrowRightIcon,
	SparklesIcon,
	// LeafIcon,
	// GlobeIcon,
	// SunIcon,
	// FlaskConicalIcon,
	ChevronDown,
	HandshakeIcon,
	ArrowRight,
	ExternalLink,
	ShieldCheck,
	Globe,
	BarChart,
	SparkleIcon,
} from "lucide-react";

type WorkArea = {
	id: string;
	title: string;
	description: string;
	icon: string;
	image: string;
	highlights: string[];
	keyProjects: Array<{
		name: string;
		location: string;
		impact: string;
	}>;
};

const WORK_AREAS: WorkArea[] = [
	{
		id: "agriculture",
		title: "Agriculture and Forestry",
		description: `With a double aim to build livelihoods and conserve the environment, G4L promotes sustainable agriculture practices which are climate smart and environmentally sensitive. This involves venturing into crops which protect the soils, nurtures forest, and reduces erosion and other benefits. G4L also promotes value chain development of specific crops and integrated livelihoods/farming (beekeeping, shea butter, gum Arabic) with high market potentials.
	
	    G4L aims to promote afforestation and reafforestation programs in South Sudan which has faced depletion of many forests due to lumbering and charcoal burning. Through the tree planting initiative, G4L prioritizes the propagation of desired and/or endangered species.`,
		icon: "/our-work/agriculture-and-forestry-icon.png",
		image: "/our-work/agriculture-and-forestry.jpg",
		highlights: [
			"Climate-resilient crop systems",
			"Integrated agroforestry models",
			"Endangered species preservation",
		],
		keyProjects: [
			{
				name: "Green Corridor Initiative",
				location: "Amazon Rainforest, Brazil",
				impact: "500,000 trees planted, 1,000 local farmers trained",
			},
			{
				name: "Sustainable Smallholder Program",
				location: "Kenya",
				impact: "250 farmers adopted climate-resilient farming methods",
			},
		],
	},
	{
		id: "climate",
		title: "Climate Change Adaptation and Resilience",
		description: `Globally, the effects of climate change are not only getting rampart, but the severity is increasing, and tends to hit the poor harder. Many communities in South Sudan are already facing serious effects of climate variability including flooding, heat waves, erratic rainfall patterns, dry spells, etc. These factors affect the lives and livelihoods of communities in many ways, adding to the already difficult living conditions. 
	
	    G4L works in the climate action spaces to 1) sensitize communities on climate variabilities and climate action, 2) establish early warning systems to mitigate the vulnerability of the people to climatic hazards, 3) promote adaptative response systems and innovative technologies, and 4) promote practices which reduce human contribution to negative effects of climate change.`,
		icon: "/our-work/climate-change-icon.png",
		image: "/our-work/climate-change.jpg",
		highlights: [
			"Early warning systems deployment",
			"Flood-resistant infrastructure",
			"Community climate literacy programs",
		],
		keyProjects: [
			{
				name: "Coastal Resilience Project",
				location: "Bangladesh",
				impact: "50,000 people protected from sea-level rise",
			},
			{
				name: "Urban Green Infrastructure",
				location: "India",
				impact: "10 cities developed climate adaptation plans",
			},
		],
	},
	{
		id: "environment",
		title: "Environment and Biodiversity",
		description: `G4L aims to promote conservation of the environment, biodiversity and local ecosystem by addressing harmful human factors. G4L promotes sustainable livelihood practices like climate smart agriculture practices which not only reduces harm on the environment, but nourishes the environment to flourish. 
	
	    Emphasis will be placed on minimizing environmental degradation, through sustainable land management practices to prevent excessive deforestation and wetlands drainage, promoting responsible disposals of wastes, and minimizing pollution.`,
		icon: "/our-work/environment-and-bio-icon.png",
		image: "/our-work/environment-and-bio.webp",
		highlights: [
			"Ecosystem restoration programs",
			"Sustainable waste management",
			"Biodiversity hotspots protection",
		],
		keyProjects: [
			{
				name: "Wetlands Conservation Initiative",
				location: "Sudd Region, South Sudan",
				impact: "200,000 hectares protected",
			},
			{
				name: "Urban Air Quality Program",
				location: "Nigeria",
				impact: "30% PM2.5 reduction in target cities",
			},
		],
	},
	{
		id: "green",
		title: "Green Energy",
		description: `Less than 10% of the population of South Sudan have access to electricity, way below the sub-Saharan average of 48.5%. Despite the low access, South Sudan has significant potential for renewable energy sources like hydropower and solar power. Majority of the population rely on traditional energy sources (wood and charcoal) that involve cutting trees which is destructive to the environment.
	
	    G4L is committed to enhancing the access of population to renewal energy and reduce destruction of forests for firewood. G4L explores and promotes sustainable sources of energy and work to increase the access of the population to clean energy.`,
		icon: "/our-work/green-energy-icon.png",
		image: "/our-work/green-energy.webp",
		highlights: [
			"Solar microgrid installations",
			"Clean cooking solutions",
			"Energy entrepreneurship training",
		],
		keyProjects: [
			{
				name: "Sunlight for All",
				location: "Greater Equatoria",
				impact: "5,000 households solar-powered",
			},
			{
				name: "River Hydropower Pilot",
				location: "Nile Basin",
				impact: "3 communities with clean energy access",
			},
		],
	},
	{
		id: "research",
		title: "Research and Development",
		description: `G4L aims to explore new knowledge on many facets of the key pillars of 1) agriculture and forestry, 2) climate change adaptation and resilience, 3) environment and biodiversity, and 4) green energy.
	
	    G4L will be collaborating with mission-aligned agencies in research and development in these areas focused on reduction of undesirable outcomes and promotion of improved practices.`,
		icon: "/our-work/research-and-development-icon.png",
		image: "/our-work/research-and-development.webp",
		highlights: [
			"Agri-tech innovation",
			"Renewable energy storage R&D",
			"AI environmental monitoring",
		],
		keyProjects: [
			{
				name: "Climate Resilience Analytics",
				location: "Regional Hub, Nairobi",
				impact: "50+ municipalities using our prediction models",
			},
			{
				name: "Biochar Production Study",
				location: "Uganda",
				impact: "Carbon sequestration increased by 40%",
			},
		],
	},
];

const SectionNav = ({ activeSection }: { activeSection: string }) => {
	return (
		<motion.nav
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<div className="max-w-3xl mx-auto">
					<Select
						value={activeSection}
						onValueChange={(value) => {
							smoothScroll(`#${value}`, 800, () => {}, -100);
						}}
					>
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="w-full"
						>
							<SelectTrigger className="w-full h-14 px-6 bg-white/90 border border-green-700 hover:border-green-600 rounded-2xl shadow-sm hover:shadow-md transition-all">
								<div className="flex items-center gap-3">
									<span className="text-green-600">
										<ChevronDown className="w-5 h-5" />
									</span>
									<SelectValue placeholder="Select focus area" />
								</div>
							</SelectTrigger>
						</motion.div>

						<SelectContent className="border-0 shadow-xl rounded-2xl mt-2 py-2">
							{WORK_AREAS.map((area) => (
								<SelectItem
									key={area.id}
									value={area.id}
									className="px-6 py-4 text-lg hover:bg-green-50/50 transition-colors cursor-pointer"
								>
									<div className="flex items-center gap-4">
										<div className="w-8 h-8 bg-green-100/50 rounded-lg flex items-center justify-center">
											<Image
												src={area.icon}
												alt={area.title}
												width={24}
												height={24}
												className="w-5 h-5 object-contain"
											/>
										</div>
										<span className="text-gray-800 font-medium">
											{area.title}
										</span>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</motion.nav>
	);
};

const WorkSection = ({ area }: { area: WorkArea }) => {
	return (
		<section id={area.id} className="scroll-mt-24 py-20">
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "0px 0px -100px 0px" }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="container mx-auto px-4 sm:px-6 lg:px-8"
			>
				<div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 xl:gap-16 items-start">
					{/* Text Content */}
					<div className="space-y-8">
						<header className="flex flex-col sm:flex-row items-start gap-6 pb-8 border-b border-gray-200">
							<div className="p-2 bg-white rounded-2xl border border-green-200 shadow-xs">
								<div className="p-3 bg-green-50/50 rounded-xl">
									<Image
										src={area.icon}
										alt={area.title}
										width={72}
										height={72}
										className="w-14 h-14 object-contain object-center"
										loading="lazy"
									/>
								</div>
							</div>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
								<span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
									{area.title.split(" ")[0]}
								</span>
								<span className="text-gray-800 ml-2">
									{area.title.split(" ").slice(1).join(" ")}
								</span>
							</h2>
						</header>

						<div className="space-y-8">
							{area.description.split("\n\n").map((para, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.15 + 0.2 }}
									className="text-gray-700/90 leading-relaxed text-lg"
								>
									{para.split("\n").map((line, lineIndex) => (
										<p
											key={lineIndex}
											className={`
            mb-5 last:mb-0 className="text-[clamp(1rem,1.25vw,1.25rem)] text-gray-700/90 font-medium leading-relaxed tracking-wide"
            ${
							lineIndex === 0
								? "first-line:font-medium first-line:text-gray-900"
								: ""
						}
          `}
										>
											{line}
										</p>
									))}
								</motion.div>
							))}
						</div>

						{/* Highlights Section */}
						<div className="bg-green-50 p-6 rounded-2xl border border-green-200">
							<div className="flex items-center gap-4 mb-6">
								<div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
									<SparklesIcon className="w-5 h-5 text-white" />
								</div>
								<h3 className="text-xl font-bold text-green-900">
									Key Focus Areas
								</h3>
							</div>
							<ul className="grid md:grid-cols-2 gap-3">
								{area.highlights.map((highlight, index) => (
									<motion.li
										key={index}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 + 0.3 }}
										className="p-4 bg-white/90 rounded-lg shadow-xs hover:shadow-sm transition-all duration-300 border border-green-100"
									>
										<div className="flex gap-3 items-start">
											<div className="flex-shrink-0 w-6 h-6 bg-green-100/80 rounded-md flex items-center justify-center mt-1">
												<span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
											</div>
											<p className="text-gray-700/90 font-medium">
												{highlight}
											</p>
										</div>
									</motion.li>
								))}
							</ul>
						</div>

						{/* Key Projects */}
						{/* <div className="mt-12 space-y-6">
							<h3 className="text-xl font-bold text-green-900 flex items-center gap-3">
								<GlobeIcon className="w-6 h-6 text-green-600" />
								Featured Projects
							</h3>
							<div className="grid gap-4">
								{area.keyProjects.map((project, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 + 0.4 }}
										className="p-5 bg-white rounded-xl border border-gray-100 hover:border-green-200 transition-all"
									>
										<h4 className="text-lg font-semibold text-gray-900 mb-2">
											{project.name}
										</h4>
										<div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
											<span className="text-green-600">📍</span>
											{project.location}
										</div>
										<p className="text-sm text-green-700/90">
											{project.impact}
										</p>
									</motion.div>
								))}
							</div>
						</div> */}
					</div>

					{/* Image Section */}
					<motion.div
						initial={{ opacity: 0, scale: 0.98 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className="sticky top-24 hidden lg:block h-[80vh] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200/60 shadow-lg"
					>
						<Image
							src={area.image}
							alt={area.title}
							fill
							priority
							className="object-cover object-center"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
						<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
							<div className="max-w-[600px] space-y-2">
								<h2 className="text-2xl font-bold text-white/95">
									Innovation in {area.title}
								</h2>
								<Button className="mt-4 bg-green-600/90 hover:bg-green-700 text-white">
									<ArrowRightIcon className="w-4 h-4 mr-2" />
									Explore Initiatives
								</Button>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
};

export default function OurWork() {
	const [activeSection, setActiveSection] = useState(WORK_AREAS[0].id);
	
	useEffect(() => {
		const handleScroll = () => {
			const sections = WORK_AREAS.map(area => {
				const el = document.getElementById(area.id);
				return { id: area.id, top: el?.getBoundingClientRect().top || 0 };
			});
	
			// Find section entering viewport with 100px offset
			const visibleSection = sections.find(s => s.top <= window.innerHeight * 0.3 && s.top >= -100);
			
			if (visibleSection) {
				setActiveSection(visibleSection.id);
			}
		};
	
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-green-25 to-green-50">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-b from-emerald-50/95 to-green-50/70 py-28 overflow-hidden">
				{/* Modern Particle Background */}
				<div className="absolute flex items-center justify-center inset-0 z-0">
					{[...Array(30)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute bg-emerald-200/40 rounded-full"
							initial={{
								scale: 0,
								opacity: 0,
								x: Math.random() * 100 - 50 + "%",
								y: Math.random() * 100 - 50 + "%",
							}}
							animate={{
								scale: [0, Math.random() * 0.5 + 0.5, 0],
								opacity: [0, 0.4, 0],
								rotate: [0, 180],
							}}
							transition={{
								duration: Math.random() * 4 + 6,
								repeat: Infinity,
								ease: "easeInOut",
								delay: Math.random() * 2,
							}}
							style={{
								width: `${Math.random() * 20 + 10}px`,
								height: `${Math.random() * 20 + 10}px`,
							}}
						/>
					))}
				</div>

				{/* Dynamic Grid Pattern */}
				<div className="absolute inset-0 z-0">
					<motion.div
						className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
						animate={{ x: [0, -24], y: [0, 24] }}
						transition={{
							duration: 20,
							repeat: Infinity,
							ease: "linear",
						}}
					/>
				</div>

				<div className="mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
					{/* Modern Scrolling Text */}
					<div className="overflow-hidden absolute top-8 left-0 w-full">
						<motion.div
							className="flex whitespace-nowrap"
							animate={{ x: ["100%", "-100%"] }}
							transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
						>
							{[...Array(4)].map((_, i) => (
								<span
									key={i}
									className="text-5xl font-black text-emerald-900/5 mx-8"
								>
									<span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700/20 to-green-900/20">
										Thematic Areas •
									</span>
								</span>
							))}
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<motion.h1
							initial={{ letterSpacing: "1.5rem", opacity: 0 }}
							animate={{ letterSpacing: "0.3rem", opacity: 1 }}
							transition={{ duration: 1.2, delay: 0.3 }}
							className="text-[clamp(2.75rem,8vw,4.75rem)] font-black bg-gradient-to-r from-green-900 to-emerald-800 bg-clip-text text-transparent mb-8 tracking-tight"
						>
							Cultivating{" "}
							<span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
								Green Innovation
							</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							className="max-w-2xl mx-auto text-[clamp(1rem,1.5vw,1.25rem)] text-green-800 leading-relaxed mb-10 font-medium px-4 sm:px-0"
						>
							Pioneering sustainable solutions through integrated ecological
							strategies
						</motion.p>
					</motion.div>
				</div>

				{/* Modern Scroll Indicator */}
				<motion.div
					className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.2 }}
				>
					<div className="w-px h-12 bg-gradient-to-b from-emerald-600/80 to-transparent" />
					<motion.div
						animate={{ y: [0, 10], opacity: [1, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="w-2.5 h-2.5 bg-emerald-700 rounded-full"
					/>
				</motion.div>

				{/* Client-side only bottom marquee */}
				{typeof window !== "undefined" && (
					<div className="absolute bottom-8 left-0 w-full overflow-hidden">
						<motion.div
							className="flex whitespace-nowrap"
							initial={{ x: "-100%" }}
							animate={{
								x: "100%",
								transition: {
									duration: 30,
									repeat: Infinity,
									ease: "linear",
								},
							}}
						>
							{[...Array(2)].map((_, i) => (
								<span
									key={i}
									className="text-lg font-medium text-green-800/30 mx-6"
								>
									Thematic Areas • Sustainability Reports • Green Technologies •
									Conservation Efforts •
								</span>
							))}
						</motion.div>
					</div>
				)}
			</section>

			<SectionNav activeSection={activeSection} />

			{/* Work Sections */}
			<main className="relative z-10">
				{WORK_AREAS.map((area) => (
					<WorkSection key={area.id} area={area} />
				))}
			</main>

			{/* Modern Minimal CTA Section */}
			<section className="relative bg-white py-24">
				{/* Geometric Background Elements */}
				<div className="absolute inset-0 z-0 overflow-hidden">
					<div className="absolute inset-y-0 left-1/2 w-full bg-gradient-to-r from-green-50/40 to-transparent -skew-x-12" />
					<div className="absolute bottom-0 left-0 right-0 h-32 bg-[url(/svg/abstract-grid.svg)] bg-center opacity-10" />
				</div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "0px 0px -100px 0px" }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="max-w-4xl mx-auto text-center"
					>
						{/* Impact Statement */}
						<div className="mb-10 inline-flex items-center gap-2.5 bg-green-100/60 backdrop-blur-sm px-5 py-2 rounded-lg">
							<SparkleIcon className="w-5 h-5 text-green-600" />
							<span className="text-sm font-medium text-green-700">
								🌍 15+ Environmental Projects Completed
							</span>
						</div>

						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
							Drive Environmental
							<br />
							<span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
								Innovation Forward
							</span>
						</h2>

						<p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-12">
							Collaborate with global experts to create measurable ecological
							impact. Choose your path to sustainable transformation.
						</p>

						{/* Action Cards Grid */}
						<div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
							{/* Volunteer Card */}
							<motion.div
								whileHover={{ y: -4 }}
								className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-md transition-all"
							>
								<div className="space-y-4">
									<div className="flex items-center gap-4">
										<div className="p-3 bg-green-100 rounded-lg">
											<HandshakeIcon className="w-6 h-6 text-green-700" />
										</div>
										<h3 className="text-lg font-semibold text-gray-900">
											Take Direct Action
										</h3>
									</div>
									<p className="text-gray-600 text-sm mb-6">
										Join field initiatives and community conservation programs
									</p>
									<Button className="w-full text-white">
										Start Volunteering
										<ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
									</Button>
								</div>
							</motion.div>

							{/* Partner Card */}
							<motion.div
								whileHover={{ y: -4 }}
								className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-md transition-all"
							>
								<div className="space-y-4">
									<div className="flex items-center gap-4">
										<div className="p-3 bg-green-100 rounded-lg">
											<HandshakeIcon className="w-6 h-6 text-green-700" />
										</div>
										<h3 className="text-lg font-semibold text-gray-900">
											Strategic Partnership
										</h3>
									</div>
									<p className="text-gray-600 text-sm mb-6">
										Leverage resources and expertise for scalable solutions
									</p>
									<Button
										variant="outline"
										className="w-full border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-700"
									>
										Explore Partnerships
										<ExternalLink className="ml-2 w-4 h-4" />
									</Button>
								</div>
							</motion.div>
						</div>

						{/* Trust Badges */}
						<div className="mt-14 flex flex-wrap items-center justify-center gap-5 text-gray-500">
							<div className="flex items-center gap-2.5 px-4 py-2 bg-gray-50 rounded-lg">
								<Globe className="w-5 h-5 text-green-700" />
								<span className="text-sm">Active in 68 countries</span>
							</div>
							<div className="flex items-center gap-2.5 px-4 py-2 bg-gray-50 rounded-lg">
								<ShieldCheck className="w-5 h-5 text-green-700" />
								<span className="text-sm">Certified Non-Profit</span>
							</div>
							<div className="flex items-center gap-2.5 px-4 py-2 bg-gray-50 rounded-lg">
								<BarChart className="w-5 h-5 text-green-700" />
								<span className="text-sm">94% Impact Efficiency</span>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
