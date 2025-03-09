"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Trees, Users, Globe } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "./ui/button";
import { smoothScroll } from "@/lib/utils";
// import { Leaf } from "lucide-react";

export default function Home() {
	const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, target: string) => {
		e.preventDefault();
		smoothScroll(target);
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				{/* Hero Section */}
				<section className="relative h-[600px] flex items-center justify-center text-white">
					{/* Background Image or Video */}
					<div className="absolute inset-0">
						<Image
							src="/images/hero.webp"
							alt="G4L Hero Image"
							fill
							priority
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-black/50"></div>
					</div>

					{/* Hero Content */}
					<div className="relative text-center max-w-3xl px-4">
						<motion.h1
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-[clamp(2rem,5vw,4.5rem)] font-bold mb-6 leading-tight"
						>
							Empowering Communities for a Sustainable{" "}
							<span className="text-primary">
								<Typewriter
									words={[
										"Future...",
										// "Greener Tomorrow",
										// "Better World",
									]}
									loop={true}
									cursor
									cursorStyle="|"
									typeSpeed={100}
									deleteSpeed={50}
									delaySpeed={1000}
								/>
							</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="text-lg md:text-xl mb-8"
						>
							Green for Life (G4L) is dedicated to creating sustainable
							solutions that protect our planet and improve lives. Join us in
							making a difference.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="flex justify-center space-x-4"
						>
								<Button 
								className="bg-primary text-gray-900 text-lg font-semibold"
								onClick={(e) => handleNavClick(e, '#donation')}
							>
								Give Today
							</Button>
							<Button
								variant="outline"
								className="text-green-800 hover:bg-gray-100 text-lg font-semibold"
								onClick={(e) => handleNavClick(e, '#mission')}
							>
								Learn More
							</Button>
						</motion.div>
					</div>
				</section>

				{/* Mission & Vision */}
				<section id="mission" className="py-16">
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

				{/* Impact Highlights Section */}
				<section className="py-16 bg-green-50">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12">
							Our Impact
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="bg-white p-8 rounded-lg shadow-md text-center"
							>
								<Trees className="w-12 h-12 text-green-600 mx-auto mb-4" />
								<h3 className="text-2xl font-semibold text-green-700 mb-4">
									500,000+ Trees Planted
								</h3>
								<p className="text-gray-700">
									Restoring ecosystems and combating climate change, one tree at
									a time.
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="bg-white p-8 rounded-lg shadow-md text-center"
							>
								<Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
								<h3 className="text-2xl font-semibold text-green-700 mb-4">
									1,000+ Communities Reached
								</h3>
								<p className="text-gray-700">
									Empowering local communities to drive sustainable development.
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
								className="bg-white p-8 rounded-lg shadow-md text-center"
							>
								<Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
								<h3 className="text-2xl font-semibold text-green-700 mb-4">
									10+ Countries Impacted
								</h3>
								<p className="text-gray-700">
									Expanding our reach to create global environmental change.
								</p>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Call to Action Section */}
					<section id="donation" className="py-16 bg-white">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
							Join Us in Making a Difference
						</h2>
						<p className="text-lg text-gray-700 mb-8">
							Your support helps us create a sustainable future for communities
							and the planet. Take action today.
						</p>
						<div className="flex justify-center space-x-4">
							<Button 
								className="bg-green-800 px-8 py-3 rounded-lg text-lg font-semibold text-white hover:bg-green-900 transition-colors"
								onClick={(e) => handleNavClick(e, '#donation')}
							>
								Donate Now
							</Button>
							<Button 
								className="bg-white text-green-800 px-8 py-3 rounded-lg text-lg font-semibold border border-green-600 hover:bg-green-50 transition-colors"
								onClick={(e) => handleNavClick(e, '#subscribe')}
							>
								Subscribe
							</Button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
