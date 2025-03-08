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
		name: "Emily Green",
		title: "Founder & Executive Director",
		bio: "Environmental scientist with 15 years of experience in sustainable development and community empowerment.",
		image: "/team/team2.jpg",
	},
	{
		name: "Michael Okonkwo",
		title: "Chief Operations Officer",
		bio: "Expert in agricultural sustainability and rural community development strategies.",
		image: "/team/team3.webp",
	},
	{
		name: "Zack Rodriguez",
		title: "Climate Resilience Lead",
		bio: "Climate change adaptation specialist with a focus on innovative environmental solutions.",
		image: "/team/team3.webp",
	},
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
			<section className="bg-green-50 py-16">
				<div className="container mx-auto px-4 text-center">
					<motion.h1
						initial={{ opacity: 0, y: -50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-800 mb-6"
					>
						About Green for Life (G4L)
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="max-w-3xl mx-auto text-lg text-green-700"
					>
						Green for Life is a passionate environmental organization dedicated
						to transforming communities through sustainable solutions,
						environmental education, and grassroots empowerment.
					</motion.p>
				</div>
			</section>

			{/* Our Story Section */}
			<section
				id="history"
				className="py-16 container mx-auto px-4 sm:px-6 lg:px-8"
			>
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
							className="space-y-6"
						>
							<h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-800">
								Our Story
							</h2>
							<div className="space-y-4">
								<p className="text-gray-700 text-lg">
									Founded in 2010, Green for Life emerged from a vision to
									create meaningful environmental change through
									community-driven initiatives. What started as a small local
									project has grown into a global movement of sustainable
									development.
								</p>
								<p className="text-gray-700 text-lg">
									Our journey began with a simple belief: that local communities
									are the most powerful agents of environmental transformation.
								</p>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							<Image
								src="/icon.svg"
								alt="G4L Founding Moment"
								width={400} // 600
								height={400} // initially 400
								className="rounded-lg "
							/>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Mission & Vision */}
			<section className="py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.h2
						initial={{ opacity: 0, y: -30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-800 text-center mb-12"
					>
						Our Mission & Vision
					</motion.h2>

					<div className="grid md:grid-cols-2 gap-8">
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
							className="bg-green-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm"
						>
							<div className="flex justify-center mb-4">
								<Image
									alt="Leaf"
									width={40}
									height={40}
									src="/icons/leaf-1.svg"
									priority
									className="w-16 h-16"
								/>
							</div>
							<h3 className="text-[clamp(1.5rem,4vw,2rem)] font-semibold text-green-700 mb-4 text-center">
								Mission
							</h3>
							<p className="text-gray-700 text-lg text-center">
								To empower communities to create sustainable environmental
								solutions that protect our planet and improve human lives.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="bg-green-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm"
						>
							{/* <div className="flex justify-center mb-4">
								<Image
									alt="Vision"
									width={40}
									height={40}
									src="/icons/leaf-1.svg"
									priority
									className="w-16 h-16"
								/>
							</div> */}
							<h2 className="text-[clamp(2rem,5vw,3rem)] text-center flex justify-center">
								🌟
							</h2>
							<h3 className="text-[clamp(1.5rem,4vw,2rem)] font-semibold text-green-700 mb-4 text-center">
								Vision
							</h3>
							<p className="text-gray-700 text-lg text-center">
								A world where environmental sustainability and community
								development go hand in hand, creating a better future for
								generations to come.
							</p>
						</motion.div>
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
					className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-800 text-center mb-12"
					aria-label="Our Team Members"
				>
					Meet Our Team
				</motion.h2>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mb-16 px-4 sm:px-0"
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
							className="group bg-green-50 rounded-xl overflow-hidden"
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
								<div className="border-l-4 border-green-600 pl-4">
									<h3 className="text-xl font-semibold text-green-800">
										{member.name}
									</h3>
									<p className="text-green-700 font-medium mt-1">
										{member.title}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* The first layout for the Team Section */}
			{/* Team Section */}
			{/* <section id="team" className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.h2
					initial={{ opacity: 0, y: -30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-800 text-center mb-12"
					aria-label="Our Team Members"
				>
					Meet Our Team
				</motion.h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{TEAM_MEMBERS.map((member, index) => (
						<motion.div
							key={member.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
							role="article"
							aria-label={`Team member ${member.name}`}
						>
							<div className="relative overflow-hidden">
								<Image
									src={member.image}
									alt={`Portrait of ${member.name}`}
									width={400}
									height={400}
									className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</div>
							<div className="p-6 space-y-4">
								<div className="border-l-4 border-green-600 pl-4">
									<h3 className="text-xl font-semibold text-green-800">
										{member.name}
									</h3>
									<p className="text-green-700 font-medium">{member.title}</p>
								</div>
								<p className="text-gray-600 leading-relaxed">{member.bio}</p>
								<div className="pt-4 flex gap-4 items-center">
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="text-sm px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-300"
										aria-label={`Contact ${member.name}`}
									>
										Contact
									</motion.button>
									<div className="flex gap-3">
										<a
											href="#"
											className="text-primary hover:text-green-800 transition-colors"
											aria-label={`${member.name}'s LinkedIn profile`}
										>
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
											</svg>
										</a>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section> */}

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
								<p className="text-gray-700">{value.description}</p>
							</motion.div>
						))}
					</div>
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
					<p className="text-gray-700 mb-4">
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
