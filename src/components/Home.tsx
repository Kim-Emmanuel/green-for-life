"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
	Trees,
	Users,
	Globe,
	Leaf,
	HeartIcon,
	ShieldCheckIcon,
	SparklesIcon,
	Mailbox,
	CircleDollarSign,
} from "lucide-react";
import dynamic from "next/dynamic";
import { smoothScroll } from "@/lib/utils";

const ScrollIndicator = dynamic(() => import("@/components/ScrollIndicator"), {
	ssr: false,
	loading: () => null,
});

// Dynamically import Typewriter with SSR disabled
const Typewriter = dynamic(
	() => import("react-simple-typewriter").then((mod) => mod.Typewriter),
	{ ssr: false, loading: () => <span>Future...</span> }
);

// Create a client-side only particles component
const AnimatedParticles = () => (
	<div className="absolute inset-0 z-10 opacity-40">
		{[...Array(20)].map((_, i) => (
			<motion.div
				key={i}
				initial={{ opacity: 0, scale: 0 }}
				animate={{
					opacity: [0, 0.5, 0],
					scale: [0, 1, 0],
					x: Math.random() * 100 - 50,
				}}
				transition={{
					duration: 4 + Math.random() * 4,
					repeat: Infinity,
					delay: Math.random() * 2,
				}}
				className="absolute w-2 h-2 bg-emerald-300 rounded-full"
				style={{
					left: `${Math.random() * 100}%`,
					top: `${Math.random() * 100}%`,
				}}
			/>
		))}
	</div>
);

// Dynamically import particles with SSR disabled
const ClientOnlyParticles = dynamic(() => Promise.resolve(AnimatedParticles), {
	ssr: false,
});

export default function Home() {
	const handleNavClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		target: string
	) => {
		e.preventDefault();
		smoothScroll(target);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow relative">
				{/* Hero Section */}
				<section className="relative h-[clamp(500px,100dvh,1000px)] min-h-[500px] max-h-[min(1200px,100svh)] lg:h-[clamp(600px,100vh,1200px)] xl:max-h-[1400px] flex items-center justify-center text-white overflow-hidden">
					{/* Dynamic Background */}
					<div className="absolute inset-0 z-0">
						<Image
							src="/images/coffee-hero.webp"
							alt="Coffee Tree"
							fill
							priority
							className="object-cover"
							quality={100}
							sizes="100vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-black/50 to-emerald-900/30" />
						<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900 to-transparent" />
					</div>

					{/* Client-only particles */}
					<ClientOnlyParticles />

					{/* Hero Content */}
					<div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center md:items-start text-center md:text-left max-w-[95%] lg:max-w-3xl xl:max-w-4xl mx-auto">
							<motion.h1
								initial={{ y: 50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
								className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold leading-[1.2] tracking-tight mb-6"
							>
								<span className="bg-gradient-to-r from-[#55B948] to-emerald-400 bg-clip-text text-transparent">
									Greening
								</span>{" "}
								Communities for a Sustainable{" "}
								<span className="inline-block text-[#55B948]">
									<Typewriter
										words={["Future..."]}
										loop={true}
										cursor
										cursorStyle="|"
										typeSpeed={80}
										deleteSpeed={50}
										delaySpeed={1500}
									/>
								</span>
							</motion.h1>

							<motion.p
								initial={{ y: 30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.3, duration: 0.6 }}
								className="text-[clamp(1.1rem,1.5vw,1.3rem)] leading-relaxed text-white/90 max-w-2xl mx-auto lg:mx-0 mb-8"
							>
								Green for Life (G4L) pioneers{" "}
								<span className="font-semibold text-emerald-300">
									eco-innovation{" "}
								</span>
								that bridges community needs with environmental stewardship.
								Join our global movement.
							</motion.p>

							<motion.div
								initial={{ scale: 0.95, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ delay: 0.6, type: "spring" }}
								className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
							>
								{["Learn More"].map((text, index) => (
									<motion.div
										key={text}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="relative inline-block w-full sm:w-auto"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-green-600 to-primary rounded-md blur-lg opacity-50 -z-10 transition-opacity duration-300 group-hover:opacity-60" />
										<button
											onClick={(e) =>
												handleNavClick(
													e,
													index === 0 ? "#introduction" : "#mission"
												)
											}
											className="group flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-primary text-white w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl active:shadow-md"
										>
											<span className="text-base font-semibold sm:text-lg lg:text-xl whitespace-nowrap">
												{text}
											</span>
											<svg
												className="w-5 h-5 sm:w-6 sm:h-6 transition-transform transform group-hover:translate-x-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M17 8l4 4m0 0l-4 4m4-4H3"
												/>
											</svg>
										</button>
									</motion.div>
								))}
							</motion.div>
						</div>
					</div>
					{/* ScrollIndicator Component */}
					<ScrollIndicator />
				</section>

				{/* Introduction to Green For Life Section */}
				<section
					id="introduction"
					className="relative py-24 md:py-32 overflow-hidden"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
							className="max-w-5xl mx-auto mb-20 md:mb-28"
						>
							<h2 className="text-[clamp(2.75rem,7vw,4.5rem)] font-extrabold text-green-900 text-center leading-[1.1] tracking-tight">
								Transforming Communities Through{" "}
								<span className="relative inline-block">
									<span className="absolute inset-x-0 -bottom-2 h-4 md:h-6 bg-green-100/70 -rotate-2 z-0" />
									<span className="relative bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
										Sustainable Action
									</span>
								</span>
							</h2>
						</motion.div>

						<div className="grid lg:grid-cols-2 gap-16 xl:gap-32 items-center">
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: 0.3 }}
								className="relative group perspective-1000"
							>
								<div className="relative rounded-[2rem] overflow-hidden shadow-2xl transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">
									<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-emerald-100/10 backdrop-blur-[2px]" />
									<div className="p-2 bg-gradient-to-br from-green-50 to-emerald-50">
										<Image
											alt="Community empowerment illustration"
											width={640}
											height={640}
											src="/images/coffee2.webp"
											priority
											className="w-full h-auto object-cover rounded-[1.5rem] transform group-hover:scale-[1.02] transition-transform duration-500"
											sizes="(max-width: 1024px) 100vw, 50vw"
										/>
									</div>
								</div>
								<div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl -z-10" />
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: 0.6 }}
								className="space-y-8 md:space-y-12"
							>
								<div className="inline-flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
									<div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
										<Leaf className="w-8 h-8 text-gray-800" />
									</div>
									<h3 className="text-3xl md:text-4xl font-bold text-green-900 tracking-tight">
										Our Commitment
									</h3>
								</div>

								<p className="text-lg md:text-xl text-gray-700 leading-relaxed md:leading-[1.7] max-w-2xl">
									At Green for Life, we pioneer{" "}
									<span className="font-semibold text-green-700">
										eco-innovation
									</span>{" "}
									that bridges community needs with environmental stewardship.
									Our initiatives create
									<span className="border-b-2 border-green-200/50 hover:border-green-400 transition-colors">
										{" "}
										measurable impact
									</span>{" "}
									through:
								</p>

								{/* <ul className="grid gap-4 md:gap-6">
									{[
										{ title: "Renewable Projects", count: "120+" },
										{ title: "Educated Members", count: "50K" },
										{ title: "Protected Areas", count: "340" },
									].map((item, index) => (
										<motion.li
											key={item.title}
											initial={{ opacity: 0 }}
											whileInView={{ opacity: 1 }}
											transition={{ delay: 0.8 + index * 0.1 }}
											className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
										>
											<span className="text-green-800 font-medium">
												{item.title}
											</span>
											<span className="text-emerald-600 font-bold">
												{item.count}
											</span>
										</motion.li>
									))}
								</ul> */}

								<motion.div
									whileHover="hover"
									whileTap="tap"
									className="mt-12 relative inline-block group"
									initial={{ scale: 1 }}
									variants={{
										hover: { scale: 1.02 },
										tap: { scale: 0.97 },
									}}
									transition={{ type: "spring", stiffness: 400, damping: 20 }}
								>
									{/* Animated gradient backdrop */}
									<motion.div
										className="absolute inset-0 rounded-xl blur-xl opacity-40 -z-10"
										initial={{
											background:
												"linear-gradient(45deg, #16a34a 0%, #10b981 100%)",
										}}
										animate={{
											background: [
												"linear-gradient(45deg, #16a34a 0%, #10b981 100%)",
												"linear-gradient(45deg, #10b981 0%, #059669 100%)",
												"linear-gradient(45deg, #059669 0%, #16a34a 100%)",
											],
										}}
										transition={{
											duration: 6,
											repeat: Infinity,
											repeatType: "reverse",
										}}
									/>

									{/* Main button container */}
									<button className="relative overflow-hidden flex items-center gap-4 bg-gradient-to-r from-green-600 to-primary text-white px-12 py-6 rounded-xl shadow-2xl hover:shadow-xl transition-all duration-300">
										{/* Hover shine effect */}
										<div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
											<div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-white/30 via-white/0 to-white/30 animate-shine" />
										</div>

										{/* Floating particles */}
										<div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
											{[...Array(6)].map((_, i) => (
												<motion.div
													key={i}
													className="absolute w-1 h-1 bg-white rounded-full"
													initial={{ opacity: 0 }}
													animate={{
														opacity: [0, 0.4, 0],
														x: Math.random() * 100 - 50,
														y: Math.random() * 100 - 50,
													}}
													transition={{
														duration: 2 + Math.random() * 2,
														repeat: Infinity,
														delay: Math.random() * 2,
													}}
												/>
											))}
										</div>

										{/* Content */}
										<span className="relative z-10 text-lg font-semibold tracking-wide text-shadow">
											Join Our Mission
										</span>

										{/* Animated arrow icon */}
										<motion.svg
											className="w-7 h-7 relative z-10"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}
											variants={{
												hover: {
													x: [0, 5, 0],
													transition: { duration: 1.2, repeat: Infinity },
												},
											}}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M17 8l4 4m0 0l-4 4m4-4H3"
											/>
										</motion.svg>

										{/* Subtle border animation */}
										<div className="absolute inset-0 rounded-xl border-2 border-white/10 group-hover:border-white/20 transition-all" />
									</button>

									{/* Focus state */}
									<div className="absolute inset-0 rounded-xl ring-2 ring-white/30 opacity-0 group-focus-within:opacity-100 transition-opacity" />
								</motion.div>
							</motion.div>
						</div>
					</div>

					{/* Parallax background elements */}
					<div className="absolute inset-0 -z-20 overflow-hidden">
						<div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-green-100/20 rounded-full blur-3xl animate-float" />
						<div className="absolute top-1/3 right-1/4 w-[30vw] h-[30vw] bg-emerald-100/15 rounded-full blur-3xl animate-float-delayed" />
						<div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent" />
					</div>
				</section>

				{/* Impact Highlights Section */}
				<section className="relative py-24 md:py-32 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
					<div className="absolute inset-0 -z-10 opacity-15">
						<div className="absolute top-0 left-1/4 w-1/3 h-full bg-gradient-to-r from-green-100/30 to-transparent" />
						<div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-200/20 rounded-full blur-3xl" />
					</div>

					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
							className="max-w-4xl mx-auto mb-20 text-center"
						>
							<h2 className="text-[clamp(2.5rem,6vw,3.5rem)] font-bold text-green-900 leading-tight">
								Creating{" "}
								<span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
									Lasting Change
								</span>
							</h2>
							<p className="mt-6 text-[clamp(1.125rem,1.5vw,1.375rem)] text-gray-700/90 font-medium leading-relaxed max-w-3xl mx-auto">
								Measuring our progress through tangible environmental and
								community impact
							</p>
						</motion.div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8">
							{[
								{
									icon: <Trees className="w-16 h-16 mx-auto" />,
									title: "#+ Trees Planted",
									text: "Restoring ecosystems worldwide through strategic reforestation",
									color: "from-green-500 to-emerald-400",
								},
								{
									icon: <Users className="w-16 h-16 mx-auto" />,
									title: "#+ Communities Reached",
									text: "Empowering sustainable development through education",
									color: "from-amber-500 to-green-500",
								},
								{
									icon: <Globe className="w-16 h-16 mx-auto" />,
									title: "#+ Countries Impacted",
									text: "Global initiatives creating cross-border environmental change",
									color: "from-teal-400 to-emerald-500",
								},
							].map((item, index) => (
								<motion.div
									key={item.title}
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true, margin: "0px 0px -100px 0px" }}
									transition={{ duration: 0.6, delay: index * 0.15 }}
									className="group relative text-center"
								>
									<div className="absolute -inset-1 rounded-3xl bg-gradient-to-br opacity-20 blur transition-all duration-300 group-hover:opacity-30 group-hover:blur-lg" />
									<div className="relative h-full bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
										<div
											className={`bg-gradient-to-br ${item.color} p-4 rounded-2xl w-fit mx-auto mb-8`}
										>
											{item.icon}
										</div>
										<h3 className="text-2xl lg:text-3xl font-bold text-green-900 mb-6">
											{item.title}
										</h3>
										<p className="text-gray-600 text-lg leading-relaxed">
											{item.text}
										</p>
										<div className="mt-8 h-2 bg-green-50 rounded-full overflow-hidden">
											<div
												className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out`}
												style={{ width: `${Math.min(100, 30 + index * 35)}%` }}
											/>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 20,
								delay: 0.4,
							}}
							className="mt-20 text-center"
						>
							<button className="group relative inline-flex items-center gap-4 px-10 py-5 md:px-12 md:py-6 rounded-2xl transition-all duration-300 overflow-hidden border border-transparent">
								{/* Gradient background */}
								<div className="absolute inset-0 bg-gradient-to-r from-green-600 to-primary opacity-95 transition-opacity duration-300 group-hover:opacity-100" />

								{/* Animated shine effect */}
								<div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
									<div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-white/30 via-white/0 to-white/30 animate-shine" />
								</div>

								{/* Content */}
								<span className="relative z-10 text-lg font-semibold text-white/95 tracking-wide">
									View Full Impact Report
								</span>

								{/* Animated arrow icon */}
								<motion.svg
									className="w-6 h-6 relative text-white z-10"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									initial={{ x: 0 }}
									animate={{ x: [0, 4, 0] }}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										ease: "easeInOut",
									}}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M14 5l7 7m0 0l-7 7m7-7H3"
									/>
								</motion.svg>

								{/* Hover effect layer */}
								<div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

								{/* Focus state */}
								<div className="absolute inset-0 ring-2 ring-white/30 opacity-0 group-focus:opacity-100 transition-opacity duration-200" />
								<div className="absolute inset-0 bg-gradient-to-r from-green-700 to-primary opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
							</button>
						</motion.div>
					</div>
				</section>

				<section className="relative min-h-[40vh] flex items-center py-16 md:py-24 border-b overflow-hidden">
					<div className="mx-auto px-4 sm:px-6 lg:px-8 w-full h-full relative z-10">
						<div className="h-full flex flex-col items-center justify-center">
							{/* Gradient overlays for smooth edges */}
							<div className="absolute left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-20" />
							<div className="absolute right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-20" />

							<motion.div
								className="flex whitespace-nowrap will-change-transform"
								initial={{ x: "0%" }} // Start with content visible
								animate={{ x: "-50%" }} // Move half the width for seamless looping
								transition={{
									duration: 25, // Adjusted for speed consistency
									repeat: Infinity,
									ease: "linear",
									repeatType: "loop",
								}}
							>
								{/* Doubled content for seamless looping */}
								{[...Array(16)].map((_, i) => (
									<span
										key={i}
										className="text-[clamp(2.8125rem,6vw,6.375rem)] font-black text-gray-800 mx-8"
									>
										Environmental Action •
									</span>
								))}
							</motion.div>
						</div>
					</div>
				</section>

				{/* Call to Action Section */}
				<section id="cta" className="relative py-24 bg-white overflow-hidden">
					{/* Subtle animated elements */}
					<div className="absolute inset-0 opacity-15">
						<div className="absolute top-0 right-0 w-96 h-96 bg-green-100/40 rounded-full blur-3xl" />
						<div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl" />
					</div>

					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.8, ease: "easeOut" }}
							className="max-w-4xl mx-auto text-center"
						>
							{/* Heading hierarchy */}
							<div className="mb-10">
								<h2 className="text-[clamp(2.5rem,6vw,3.75rem)] font-bold text-gray-900 leading-tight tracking-tight mb-6">
									<span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
										Create Lasting Impact
									</span>
									<br />
									<span className="text-gray-800">
										Your Support Changes Lives
									</span>
								</h2>

								<p className="text-[clamp(1.125rem,2vw,1.25rem)] text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
									Join us in helping prevent environmental crises and
									build sustainable communities.{" "}
									<strong>Every contribution matters.</strong>
								</p>
							</div>

							{/* Enhanced CTA buttons */}
							<div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
								<button
									className="group relative bg-gradient-to-r from-green-600 to-primary px-10 py-5 rounded-2xl text-lg font-semibold text-white 
            shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5
            focus:ring-4 focus:ring-green-100 border border-emerald-800/20"
									onClick={(e) => handleNavClick(e, "#donation")}
								>
									<span className="relative z-10 flex items-center gap-3">
										<HeartIcon className="w-6 h-6 text-white/90 group-hover:scale-110 transition-transform" />
										Support Our Mission
									</span>
									<div className="absolute inset-0 bg-gradient-to-r from-green-700 to-primary opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
								</button>

								<button
									className="group relative bg-white px-10 py-5 rounded-2xl text-lg font-semibold text-emerald-900 
            shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5
            focus:ring-4 focus:ring-green-100 border-2 border-emerald-100 hover:border-emerald-200"
									onClick={(e) => handleNavClick(e, "#subscribe")}
								>
									<span className="relative z-10 flex items-center gap-3">
										<Mailbox className="w-6 h-6 text-emerald-700 group-hover:text-emerald-900 transition-colors" />
										Stay Informed
									</span>
									<div className="absolute inset-0 bg-emerald-50/40 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
								</button>
							</div>

							{/* Trust indicators */}
							<div className="mt-10 flex flex-wrap justify-center items-center gap-4 text-gray-500 text-sm">
								<div className="flex items-center gap-2">
									<ShieldCheckIcon className="w-5 h-5 text-green-700" />
									<span>Secure & Transparent</span>
								</div>
								<div className="h-4 w-px bg-gray-200" />
								<div className="flex items-center gap-2">
									<SparklesIcon className="w-5 h-5 text-green-700" />
									<span>Top-Rated Nonprofit</span>
								</div>
								<div className="h-4 w-px bg-gray-200" />
								<div className="flex items-center gap-2">
									<CircleDollarSign className="w-5 h-5 text-green-700" />
									<span>Tax-Deductible</span>
								</div>
							</div>
						</motion.div>
					</div>
				</section>
			</main>
		</div>
	);
}
