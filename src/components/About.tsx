"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TreePine, Users, Globe } from "lucide-react";

// Team Member Type
type TeamMember = {
	name: string;
	title: string;
	bio: string;
	image: string;
};

// Core Value Type
type CoreValue = {
	title: string;
	description: string;
	icon: React.ReactNode;
};

const TEAM_MEMBERS: TeamMember[] = [
	{
		name: "Name",
		title: "Title",
		bio: "Environmental scientist with 15 years of experience in sustainable development and community empowerment.",
		image: "/team/team1.webp",
	},
	{
		name: "Name",
		title: "Title",
		bio: "Expert in agricultural sustainability and rural community development strategies.",
		image: "/team/team2.webp",
	},
	// {
	// 	name: "Zack Rodriguez",
	// 	title: "Climate Resilience Lead",
	// 	bio: "Climate change adaptation specialist with a focus on innovative environmental solutions.",
	// 	image: "/team/team3.webp",
	// },
];

const CORE_VALUES: CoreValue[] = [
	{
		title: "Environmental Stewardship",
		description:
			"We are committed to protecting and restoring our planet's ecosystems through sustainable practices.",
		icon: <TreePine className="w-12 h-12 text-green-600" />,
	},
	{
		title: "Community Empowerment",
		description:
			"We believe in supporting and enabling local communities to drive their own sustainable development.",
		icon: <Users className="w-12 h-12 text-green-600" />,
	},
	{
		title: "Holistic Approach",
		description:
			"We integrate environmental, social, and economic considerations in all our initiatives.",
		icon: <Globe className="w-12 h-12 text-green-600" />,
	},
];

export default function About() {
	return (
		<div className="min-h-screen bg-white">
			{/* About Us Hero Section */}
			<section id="about" className="relative bg-gradient-to-b from-emerald-50/95 to-green-50/70 py-28 overflow-hidden">
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
										Environmental Action • Sustainable Future • Community Impact
										•
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
							About Green for Life (G4L)
						</motion.h1>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							className="max-w-2xl mx-auto text-[clamp(1rem,1.5vw,1.25rem)] text-green-800 leading-relaxed mb-10 font-medium px-4 sm:px-0"
						>
							Green for Life is a passionate environmental organization
							dedicated to transforming communities through sustainable
							solutions, environmental education, and grassroots empowerment.
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

			{/* Our Story Section */}
			<section
				id="history"
				className="relative py-28 overflow-hidden bg-white"
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-8xl mx-auto">
						<div className="grid lg:grid-cols-2 gap-16 items-center">
							{/* Text Content with Staggered Animations */}
							<motion.div
								initial={{ opacity: 0, x: -40 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 0.6 }}
								className="space-y-8 relative z-10"
							>
								{/* Section Header */}
								<div className="mb-10">
									<motion.h2
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.2 }}
										className="text-4xl md:text-5xl font-bold text-green-900 mb-4"
									>
										Pioneering{" "}
										<span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
											Sustainability
										</span>{" "}
										Since 2010
									</motion.h2>
									<motion.div
										initial={{ width: 0 }}
										whileInView={{ width: "120px" }}
										transition={{ duration: 0.8, delay: 0.4 }}
										className="h-1.5 bg-green-200 rounded-full"
									/>
								</div>

								{/* Animated Paragraphs */}
								<div className="space-y-6">
									<motion.p
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.3 }}
										className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 leading-relaxed tracking-wide"
									>
										Founded in 2010, Green for Life emerged from a bold vision
										to redefine environmental stewardship through community
										empowerment. What began as grassroots initiative in a single
										neighborhood has blossomed into a global sustainability
										movement.
									</motion.p>

									<motion.p
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.5 }}
										className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 leading-relaxed tracking-wide"
									>
										At our core remains the founding belief:{" "}
										<span className="font-semibold text-green-700">
											Local communities hold the power to drive planetary
											transformation
										</span>
										. This principle continues to guide our global operations
										and partnerships.
									</motion.p>
								</div>
							</motion.div>

							{/* Image Container */}
							<motion.div
								initial={{ opacity: 0, x: 40 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="relative group"
							>
								<div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
									<Image
										src="/images/agric.webp"
										alt="Green for Life founding team working on community project"
										width={800}
										height={600}
										className="w-full h-auto object-cover aspect-[4/3]"
										priority
										sizes="(max-width: 768px) 100vw, 50vw"
									/>
								</div>

								{/* Animated Decorative Element */}
								<div className="absolute -right-8 -top-8 -z-10">
									<motion.div
										initial={{ scale: 0, rotate: -45 }}
										whileInView={{ scale: 1, rotate: 0 }}
										transition={{ type: "spring", delay: 0.4 }}
										className="w-32 h-32 bg-green-100/40 rounded-3xl transform rotate-12"
									/>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Mission & Vision Section */}
			<section className="relative py-24 overflow-hidden">
				{/* Decorative background element */}
				<div
					className="absolute inset-0 bg-green-50"
					aria-hidden="true"
				/>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
					{/* Animated heading with subtle entrance effect */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.6 }}
						className="max-w-4xl mx-auto text-center mb-16 lg:mb-20"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
							Guiding Our <span className="text-green-600">Eco-Friendly</span>{" "}
							Journey
						</h2>
						<p className="text-lg text-gray-600 md:text-xl">
							Our core principles shaping a sustainable future
						</p>
					</motion.div>

					{/* Card grid with staggered animation */}
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
						{/* Mission Card */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
						>
							<div className="p-8 md:p-10">
								{/* Icon container with gradient background */}
								<div className="mb-6 inline-flex items-center justify-center p-5 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl shadow-sm">
									<Image
										src="/icons/compass.svg"
										alt="Mission compass icon"
										width={48}
										height={48}
										className="w-12 h-12 text-green-700"
										aria-hidden="true"
									/>
								</div>

								<h3 className="text-2xl md:text-3xl font-semibold text-green-900 mb-4">
									Our Mission
								</h3>
								<p className="text-lg text-gray-600 leading-relaxed mb-6">
									To empower global communities through innovative, sustainable
									solutions that harmonize environmental protection with human
									prosperity.
								</p>

								{/* Decorative accent line */}
								<div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						</motion.div>

						{/* Vision Card */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
						>
							<div className="p-8 md:p-10">
								<div className="mb-6 inline-flex items-center justify-center p-5 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl shadow-sm">
									<Image
										src="/icons/telescope.svg"
										alt="Vision telescope icon"
										width={48}
										height={48}
										className="w-12 h-12 text-amber-600"
										aria-hidden="true"
									/>
								</div>

								<h3 className="text-2xl md:text-3xl font-semibold text-amber-900 mb-4">
									Our Vision
								</h3>
								<p className="text-lg text-gray-600 leading-relaxed mb-6">
									A future where ecological balance and human progress coexist,
									creating thriving communities within a regenerated planetary
									ecosystem.
								</p>

								<div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Core Values Section */}
			<section id="values" className="bg-green-50 py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.h2
						initial={{ opacity: 0, y: -30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-800 mb-12"
					>
						Our Core Values
					</motion.h2>
					<div className="grid md:grid-cols-3 gap-8">
						{CORE_VALUES.map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: index * 0.2 }}
								className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
							>
								<div className="flex justify-center mb-4">{value.icon}</div>
								<h3 className="text-2xl font-semibold text-green-700 mb-4">
									{value.title}
								</h3>
								<p className="text-gray-700 text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed">
									{value.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section
				id="team"
				className="py-16 container mx-auto px-4 sm:px-6 lg:px-8"
			>
				<motion.h2
					initial={{ opacity: 0, y: -30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-800 text-center mb-1"
					aria-label="Our Team Members"
				>
					Meet Our Team
				</motion.h2>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mb-8 px-4 sm:px-0"
				>
					Our dedicated team of professionals combines decades of experience
					with innovative thinking to deliver exceptional results. Meet the
					people behind Green for Life.
				</motion.p>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{TEAM_MEMBERS.map((member, index) => (
						<motion.div
							key={member.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							className="group bg-white shadow-sm border rounded-xl overflow-hidden"
							role="article"
							aria-label={`Team member ${member.name}`}
						>
							<div className="relative overflow-hidden">
								<Image
									src={member.image}
									alt={`Portrait of ${member.name}`}
									width={400}
									height={400}
									className="w-full h-86 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								{/* Social Icons Overlay with Slide-up Transition */}
								<div className="absolute inset-0 bg-black/30 opacity-0 translate-y-full transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center gap-4">
									<motion.div
										initial={{ scale: 0.5, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{
											type: "spring",
											stiffness: 260,
											damping: 20,
											delay: 0.1,
										}}
										className="flex gap-4"
									>
										<a
											href="#"
											className="p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
											aria-label={`${member.name}'s LinkedIn profile`}
										>
											<motion.div
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												className="w-8 h-8 flex items-center justify-center"
											>
												<Image
													width={24}
													height={24}
													src="/icons/Linkedin.svg"
													alt={`${member.name}'s LinkedIn icon`}
													className="text-green-800 transition-colors duration-300"
												/>
											</motion.div>
										</a>

										<a
											href="#"
											className="p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
											aria-label={`${member.name}'s Instagram profile`}
										>
											<motion.div
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												className="w-8 h-8 flex items-center justify-center"
											>
												<Image
													width={24}
													height={24}
													src="/icons/Instagram.svg"
													alt={`${member.name}'s Instagram icon`}
													className="text-green-800 transition-colors duration-300"
												/>
											</motion.div>
										</a>

										<a
											href="#"
											className="p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
											aria-label={`${member.name}'s Twitter profile`}
										>
											<motion.div
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												className="w-8 h-8 flex items-center justify-center"
											>
												<Image
													width={24}
													height={24}
													src="/icons/Twitterx.svg"
													alt={`${member.name}'s Twitter icon`}
													className="text-green-800 transition-colors duration-300"
												/>
											</motion.div>
										</a>
									</motion.div>
								</div>
							</div>
							<div className="p-6">
								<div className="border-l-4 border-[#55B948] pl-4">
									<h3 className="text-xl font-semibold text-gray-800">
										{member.name}
									</h3>
									<p className="text-gray-700 font-medium mt-1">
										{member.title}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* Theory of Change Section */}
			<section id="theory-of-change" className="py-16 container mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: -30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-800 text-center mb-12"
				>
					Our Theory of Change
				</motion.h2>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto"
				>
					<p className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-700 mx-auto leading-relaxed mb-4">
						At Green for Life, we believe that sustainable change is achieved
						through a combination of community empowerment, environmental
						education, and innovative solutions. Our Theory of Change is built
						on three pillars:
					</p>
					<ul className="list-disc list-inside text-gray-700 space-y-2">
						<li>
							<strong>Empowerment:</strong> Equipping communities with the tools
							and knowledge to drive their own development.
						</li>
						<li>
							<strong>Collaboration:</strong> Partnering with local stakeholders
							to create impactful and lasting solutions.
						</li>
						<li>
							<strong>Innovation:</strong> Leveraging technology and creativity
							to address environmental challenges.
						</li>
					</ul>
				</motion.div>
			</section>
		</div>
	);
}
