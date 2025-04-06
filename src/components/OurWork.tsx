"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// import {
// 	TreePine,
// 	Leaf,
// 	CloudSun,
// 	PanelTop as SolarPanel,
// 	FlaskConical,
// } from "lucide-react";
import { Button } from "./ui/button";
import { smoothScroll } from "@/lib/utils";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

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
		title: "Agriculture & Forestry",
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
		title: "Climate Change Adaptation & Resilience",
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

export default function OurWork() {
	const [activeArea, setActiveArea] = useState<string>("agriculture");
	const [isAnimating, setIsAnimating] = useState(false);

	const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
		e.preventDefault();
		const areaId = href.replace("#", "");
		if (isAnimating || activeArea === areaId) return;

		setIsAnimating(true);
		setActiveArea(areaId);
		smoothScroll(href);
		setTimeout(() => setIsAnimating(false), 500);
	};

	const renderWorkAreaContent = () => {
		const area = WORK_AREAS.find((a) => a.id === activeArea);
		if (!area) return null;

		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={activeArea}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
					className="grid lg:grid-cols-[1.2fr_1fr] gap-8 xl:gap-20 items-start"
				>
					{/* Text Content */}
					<div className="space-y-12">
						<motion.header
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-gray-200/60"
						>
							<motion.div
								whileHover={{ scale: 1.05 }}
								className="p-3 bg-white rounded-2xl backdrop-blur-lg border border-green-300 shadow-xs hover:shadow-sm transition-all duration-300"
							>
								<div className="p-3 bg-white rounded-xl">
									<Image
										src={area.icon}
										alt={area.title}
										width={72}
										height={72}
										className="w-16 h-16 sm:w-16 sm:h-16 object-contain object-center"
										loading="lazy"
										style={{ transform: "translateZ(0)" }}
									/>
								</div>
							</motion.div>

							<div className="space-y-2">
								<h2 className="text-[clamp(2rem,4vw,2.75rem)] font-bold text-gray-900 leading-tight tracking-tight">
									<span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
										{area.title.split(" ")[0]}
									</span>
									<span className="text-gray-800 ml-2">
										{area.title.split(" ").slice(1).join(" ")}
									</span>
								</h2>
								{/* <p className="text-lg text-green-700/90 font-medium">
            {area.subtitle || "Strategic Development Focus"}
          </p> */}
							</div>
						</motion.header>

						<div className="prose-xl text-gray-600 space-y-10">
							{area.description.split("\n\n").map((para, i) => (
								<motion.p
									key={i}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.15 + 0.2 }}
									className="text-[clamp(1rem,1.25vw,1.25rem)] text-gray-700/90 font-medium leading-relaxed tracking-wide"
								>
									{para}
								</motion.p>
							))}
						</div>

						{/* Highlights Section */}
						<motion.section
							initial={{ y: 20 }}
							animate={{ y: 0 }}
							className="space-y-8"
						>
							<div className="bg-green-50/50 p-8 rounded-3xl border border-green-200/60 shadow-sm backdrop-blur-sm">
								<div className="flex items-center gap-4 mb-8">
									<div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
										<SparklesIcon className="w-5 h-5 text-white" />
									</div>
									<h3 className="text-2xl font-bold text-green-900">
										Strategic Highlights
									</h3>
								</div>
								<ul className="grid md:grid-cols-2 gap-4">
									{area.highlights.map((highlight, index) => (
										<motion.li
											key={index}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.15 + 0.3 }}
											className="p-5 bg-white/90 rounded-xl shadow-xs hover:shadow-sm transition-all duration-300 border border-green-100/80 group hover:border-green-200"
										>
											<div className="flex gap-4 items-start">
												<div className="flex-shrink-0 w-8 h-8 bg-green-100/80 rounded-lg flex items-center justify-center transition-all group-hover:bg-green-200/50">
													<span className="w-2 h-2 bg-green-600 rounded-full transition-transform group-hover:scale-150" />
												</div>
												<p className="text-[clamp(.875rem,1.25vw,1rem)] leading-relaxed text-gray-700/90 font-medium">
													{highlight}
												</p>
											</div>
										</motion.li>
									))}
								</ul>
							</div>
						</motion.section>

						{/* Image Section */}
						<motion.div
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.2 }}
							className="lg:hidden sticky top-24 h-[60vh] rounded-xl overflow-hidden bg-gray-50 border border-gray-200/60 shadow-sm"
						>
							<Image
								src={area.image}
								alt={area.title}
								fill
								priority
								className="object-cover object-center"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
							<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
								<span className="text-xl font-semibold text-white/95 tracking-wide block mb-2">
									{area.title} Initiatives
								</span>
								{/* <span className="text-green-300/90 font-medium">
            {area.projectsCount}+ Successful Projects
          </span> */}
							</div>
						</motion.div>
					</div>

					{/* Desktop Image Section */}
					<motion.div
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						className="hidden lg:block sticky top-24 h-[85vh] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200/60 shadow-lg"
					>
						<Image
							src={area.image}
							alt={area.title}
							fill
							priority
							className="object-cover object-center"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
						<div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
							<div className="max-w-[600px] space-y-3">
								<h2 className="text-2xl font-bold text-white/95 tracking-tight">
									Transforming {area.title} Initiatives
								</h2>
								{/* <p className="text-green-200/90 leading-relaxed">
            {area.imageCaption || "Sustainable development through innovative solutions"}
          </p> */}
								<div className="flex gap-4 mt-4">
									<button className="px-5 py-2.5 bg-green-600/90 hover:bg-green-700 text-white rounded-lg font-medium transition-all flex items-center gap-2">
										<ArrowRightIcon className="w-4 h-4" />
										View Projects
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		);
	};

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
										Environmental Action •
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
							className="max-w-2xl mx-auto text-xl text-green-800 leading-relaxed mb-10 font-medium px-4 sm:px-0"
						>
							<span className="text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed">
								Pioneering sustainable solutions through integrated ecological
								strategies
							</span>
						</motion.p>
					</motion.div>
				</div>

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
									Climate Action • Sustainability Reports • Green Technologies •
									Conservation Efforts •
								</span>
							))}
						</motion.div>
					</div>
				)}
			</section>

			{/* Sticky Navigation - Modern Enhanced */}
			<nav className="bg-white border-b border-gray-200 shadow-sm">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="relative">
						<div className="flex overflow-x-auto pb-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
							<div className="grid grid-flow-col auto-cols-max items-center gap-4 md:gap-5 lg:gap-6 py-1">
								{WORK_AREAS.map((area) => (
									<Button
										key={area.id}
										onClick={(e) => handleNavClick(e, `#${area.id}`)}
										variant="ghost"
										className={`
                px-4 py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 
                text-sm sm:text-base md:text-[15px] lg:text-base 
                rounded-xl md:rounded-2xl 
                font-medium transition-all duration-300 
                flex-shrink-0 
                min-w-[120px] md:min-w-[140px] lg:min-w-[160px] 
                group relative
                ${
									activeArea === area.id
										? "text-primary bg-white shadow-sm ring-2 ring-green-600 ring-inset"
										: "text-gray-600 hover:text-green-700 hover:bg-green-50/80 active:bg-green-100/60"
								}
              `}
									>
										{activeArea === area.id && (
											<motion.span
												layoutId="nav-underline"
												className="absolute inset-0 rounded-xl md:rounded-2xl bg-green-100/40"
												transition={{
													type: "spring",
													bounce: 0.25,
													duration: 0.6,
												}}
											/>
										)}
										<span className="relative z-10 whitespace-nowrap px-1.5">
											{area.title.split(" ").map((word, i, arr) => (
												<span
													key={i}
													className="inline-block transition-transform duration-200 group-hover:scale-105 group-hover:text-green-800"
												>
													{word}
													{i !== arr.length - 1 && "\u00A0"}
												</span>
											))}
										</span>
									</Button>
								))}
							</div>
						</div>
						{/* Scroll indicator gradient */}
						<div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white pointer-events-none"></div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="mx-auto">{renderWorkAreaContent()}</div>
			</main>
			<section className="relative h-[500px] flex items-center justify-center mb-20">
				{/* Background image with overlay */}
				<div className="absolute inset-0 z-0">
					<div
						className="w-full h-full bg-cover bg-center"
						style={{ backgroundImage: "url(/images/team-bg.webp)" }}
					>
						<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
					</div>
				</div>

				{/* Content container */}
				<div className="relative z-10 max-w-6xl container mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
					<div className="md:max-w-[50%] space-y-6 text-white">
						<h1 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-tight">
							Shape the Future With Us
						</h1>
						<p className="text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed">
							Join a community of changemakers driving real impact. Whether
							you&apos;re contributing time, expertise, or resources, your
							participation creates lasting change. Start your journey today.
						</p>
						<div className="flex flex-col md:flex-row gap-4">
							<a
								href="/signup"
								className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
							>
								Join Our Volunteer Team
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
