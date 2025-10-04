"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
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
import { useEffect, useState } from "react";

const ScrollIndicator = dynamic(() => import("@/components/ScrollIndicator"), {
	ssr: false,
	loading: () => null,
});

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

// ...existing code...

// ...existing code...

const Typewriter: React.FC<{
	words: string[];
	loop?: boolean;
	cursor?: boolean;
	cursorStyle?: React.ReactNode;
	typeSpeed?: number;
	deleteSpeed?: number;
	delaySpeed?: number;
}> = ({
	words,
	loop = true,
	cursor = true,
	cursorStyle = "|",
	typeSpeed = 70,
	deleteSpeed = 50,
	delaySpeed = 1500,
}) => {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentText, setCurrentText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [showCursor, setShowCursor] = useState(true);

	useEffect(() => {
		const currentWord = words[currentWordIndex];

		const timeout = setTimeout(
			() => {
				if (!isDeleting) {
					if (currentText.length < currentWord.length) {
						setCurrentText(currentWord.substring(0, currentText.length + 1));
					} else {
						// Only start deleting if looping is enabled or not on the last word
						if (loop || currentWordIndex < words.length - 1) {
							setTimeout(() => setIsDeleting(true), delaySpeed);
						}
					}
				} else {
					if (currentText.length > 0) {
						setCurrentText(currentText.substring(0, currentText.length - 1));
					} else {
						setIsDeleting(false);
						// Advance only when looping is enabled
						if (loop) {
							setCurrentWordIndex((prev) => (prev + 1) % words.length);
						}
					}
				}
			},
			isDeleting ? deleteSpeed : typeSpeed
		);

		return () => clearTimeout(timeout);
	}, [
		currentText,
		isDeleting,
		currentWordIndex,
		words,
		typeSpeed,
		deleteSpeed,
		delaySpeed,
		loop,
	]);

	useEffect(() => {
		if (cursor) {
			const cursorInterval = setInterval(() => {
				setShowCursor((prev) => !prev);
			}, 530);
			return () => clearInterval(cursorInterval);
		}
	}, [cursor]);

	return (
		<span>
			{currentText}
			{cursor && (
				<span
					className={`${
						showCursor ? "opacity-100" : "opacity-0"
					} transition-opacity`}
				>
					{cursorStyle}
				</span>
			)}
		</span>
	);
};

export default function Home() {
	const [isMounted, setIsMounted] = useState(false);
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleNavClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		target: string
	) => {
		e.preventDefault();
		smoothScroll(target);
	};

	// Icon data
  const icons = [
    { icon: '🌱', delay: 0, scale: 1 },
    { icon: '🌍', delay: 0.2, scale: 0.8 },
    { icon: '♻️', delay: 0.4, scale: 0.6 },
  ];

	// Animation variants for better performance
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
				ease: "easeOut",
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	const slideInLeft = {
		hidden: { opacity: 0, x: -30 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.8,
				ease: "easeOut",
			},
		},
	};

	const slideInRight = {
		hidden: { opacity: 0, x: 30 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.8,
				ease: "easeOut",
			},
		},
	};

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow relative">
				{/* Hero Section */}

				<section className="relative min-h-screen flex items-center justify-center text-gray-900 overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white">
					{/* Enhanced Grid Background Pattern - Responsive */}
					<div
						className="absolute inset-0 opacity-[0.08] sm:opacity-10 lg:opacity-15"
						style={{
							backgroundImage: `
            linear-gradient(to right, #55B948 1px, transparent 1px),
            linear-gradient(to bottom, #55B948 1px, transparent 1px)
          `,
							backgroundSize: "1.5rem 1.5rem",
						}}
					/>

					{/* Enhanced responsive background pattern for larger screens */}
					<div
						className="absolute inset-0 opacity-0 sm:opacity-5 lg:opacity-8 hidden sm:block"
						style={{
							backgroundImage: `
            linear-gradient(to right, #55B948 1px, transparent 1px),
            linear-gradient(to bottom, #55B948 1px, transparent 1px)
          `,
							backgroundSize: "4rem 4rem",
						}}
					/>

					{/* Main Content Container */}
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 w-full max-w-7xl">
						<motion.div
							variants={containerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-50px" }}
							className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center min-h-[80vh] lg:min-h-[70vh]"
						>
							{/* Text Content - Enhanced Mobile First */}
							<motion.div
								variants={slideInLeft}
								className="relative order-2 lg:order-1 text-center lg:text-left space-y-6 sm:space-y-8"
							>
								{/* Badge - Enhanced Responsiveness */}
								<motion.div variants={itemVariants} className="inline-block">
									<span className="inline-flex items-center bg-green-100/90 backdrop-blur-sm text-green-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm border border-green-200/50 transition-all duration-300 hover:shadow-md hover:scale-105">
										<span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
										Green Innovation Initiative
									</span>
								</motion.div>

								{/* Enhanced Typography - Fluid & Responsive */}
								<motion.h1
									variants={itemVariants}
									className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] 2xl:text-[4.5rem] font-bold leading-[1.1] sm:leading-tight tracking-tight"
								>
									<span className="bg-gradient-to-r from-[#55B948] via-emerald-500 to-[#7ED321] bg-clip-text text-transparent block">
										Building Sustainable
									</span>
									<span className="block mt-2 sm:mt-4 lg:mt-6 min-h-[1.2em]">
										{isMounted && (
											<Typewriter
												words={["Communities", "Ecosystems", "Futures"]}
												loop
												cursor
												cursorStyle={
													<span className="text-green-700">|</span>
												}
												typeSpeed={shouldReduceMotion ? 10 : 70}
												deleteSpeed={shouldReduceMotion ? 10 : 50}
												delaySpeed={shouldReduceMotion ? 100 : 1500}
											/>
										)}
									</span>
								</motion.h1>

								{/* Enhanced Description */}
								<motion.p
									variants={itemVariants}
									className="text-base sm:text-lg lg:text-xl xl:text-[1.375rem] text-gray-600 leading-relaxed font-medium max-w-none lg:max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0"
								>
									Green for Life (G4L) pioneers{" "}
									<span className="font-semibold text-green-700 relative">
										eco-innovation
										<motion.span
											className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-[#55B948] rounded-full"
											initial={{ scaleX: 0 }}
											whileInView={{ scaleX: 1 }}
											transition={{ duration: 1, delay: 0.8 }}
										/>
									</span>{" "}
									that bridges community needs with environmental stewardship.
									Join our global movement toward a sustainable future.
								</motion.p>

								{/* Enhanced CTA Buttons - Mobile Optimized */}
								<motion.div
									variants={itemVariants}
									className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none mx-auto lg:mx-0"
								>
									<motion.button
										onClick={(e) => handleNavClick?.(e, "#programs")}
										whileHover={{
											scale: shouldReduceMotion ? 1 : 1.02,
											y: shouldReduceMotion ? 0 : -2,
										}}
										whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
										className="group relative bg-gradient-to-r from-primary to-[#55B948] hover:from-green-700 hover:to-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-green-200/50 transition-all duration-300 overflow-hidden w-full sm:w-auto"
									>
										<span className="relative z-10 flex items-center justify-center gap-2">
											View Programs
											<motion.span
												initial={{ x: 0 }}
												whileHover={{ x: shouldReduceMotion ? 0 : 4 }}
												transition={{ duration: 0.2 }}
												className="text-lg"
											>
												→
											</motion.span>
										</span>
										<div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</motion.button>

									<motion.button
										onClick={(e) => handleNavClick?.(e, "#overview")}
										whileHover={{
											scale: shouldReduceMotion ? 1 : 1.02,
											backgroundColor: "#F0FDF4",
										}}
										whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
										className="border-2 border-green-600 text-green-600 hover:text-green-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 w-full sm:w-auto hover:border-green-700 hover:shadow-md"
									>
										Watch Overview
									</motion.button>
								</motion.div>

								{/* Enhanced Trust Indicators */}
								<motion.div
									variants={itemVariants}
									className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 pt-4 sm:pt-6 flex-wrap"
								>
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
										<span className="font-medium">#M+ Trees Planted</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
										<span className="font-medium">#+ Communities</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
										<span className="font-medium">Global Impact</span>
									</div>
								</motion.div>
							</motion.div>

							{/* Enhanced Visual Elements - Mobile Optimized */}
							<motion.div
								variants={slideInRight}
								className="relative order-1 lg:order-2 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] flex items-center justify-center"
							>
								{/* Optimized Image Container */}
								<div className="relative w-full h-full max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
									<Image
										src="/green-for-life.svg"
										alt="Sustainable Community Innovation"
										fill
										priority
										className="object-contain object-center drop-shadow-2xl"
										quality={85}
										sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 45vw"
										placeholder="blur"
										blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
									/>
								</div>
								
								{icons.map((icon, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, scale: 0 }}
										animate={{
											opacity: [0, 1, 0],
											scale: [0, icon.scale, 0],
										}}
										transition={{
											duration: 2,
											delay: icon.delay,
											repeat: Infinity,
										}}
										className="absolute"
										style={{
											left: `${50 + Math.random() * 20}%`,
											top: `${30 + Math.random() * 20}%`,
										}}
									>
										{icon.icon}
									</motion.div>
								))}

								{/* Enhanced Decorative Elements - Responsive */}
								<div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-16 sm:w-24 lg:w-32 xl:w-40 h-16 sm:h-24 lg:h-32 xl:h-40 bg-emerald-200/30 rounded-full blur-xl sm:blur-2xl opacity-60" />
								<div className="absolute -bottom-6 sm:-bottom-12 -left-6 sm:-left-12 w-20 sm:w-36 lg:w-48 xl:w-56 h-20 sm:h-36 lg:h-48 xl:h-56 bg-emerald-100/40 rounded-full blur-xl sm:blur-2xl opacity-70" />

								{/* Enhanced Animated Floating Elements */}
								<motion.div
									animate={
										shouldReduceMotion
											? {}
											: {
													y: [0, -10, 0],
													rotate: [0, 2, 0],
													scale: [1, 1.05, 1],
											  }
									}
									transition={{
										duration: 6,
										repeat: Infinity,
										ease: "easeInOut",
									}}
									className="absolute top-10 sm:top-20 -right-8 sm:-right-16 w-20 sm:w-32 lg:w-40 xl:w-48 h-20 sm:h-32 lg:h-40 xl:h-48 bg-emerald-100/30 rounded-full blur-xl opacity-50"
								/>
								<motion.div
									animate={
										shouldReduceMotion
											? {}
											: {
													y: [0, 8, 0],
													rotate: [0, -2, 0],
													scale: [1, 1.03, 1],
											  }
									}
									transition={{
										duration: 8,
										repeat: Infinity,
										ease: "easeInOut",
										delay: 1,
									}}
									className="absolute bottom-10 sm:bottom-20 -left-8 sm:-left-16 w-18 sm:w-28 lg:w-36 xl:w-44 h-18 sm:h-28 lg:h-36 xl:h-44 bg-emerald-200/20 rounded-full blur-xl opacity-60"
								/>

								{/* Additional Mobile-Optimized Decorative Elements */}
								<motion.div
									animate={
										shouldReduceMotion
											? {}
											: {
													scale: [1, 1.1, 1],
													opacity: [0.3, 0.6, 0.3],
											  }
									}
									transition={{
										duration: 4,
										repeat: Infinity,
										ease: "easeInOut",
										delay: 2,
									}}
									className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 lg:w-64 xl:w-80 h-32 sm:h-48 lg:h-64 xl:h-80 bg-gradient-to-r from-emerald-100/20 to-green-100/20 rounded-full blur-3xl -z-10"
								/>
							</motion.div>
						</motion.div>
					</div>

					{/* Enhanced Scroll Indicator */}
					<ScrollIndicator />

					{/* Custom Styles for Enhanced Animations */}
					<style jsx>{`
						@keyframes float {
							0%,
							100% {
								transform: translateY(0px) rotate(0deg);
							}
							25% {
								transform: translateY(-10px) rotate(1deg);
							}
							50% {
								transform: translateY(-5px) rotate(-0.5deg);
							}
							75% {
								transform: translateY(-15px) rotate(0.5deg);
							}
						}

						@keyframes float-delay {
							0%,
							100% {
								transform: translateY(0px) rotate(0deg);
							}
							25% {
								transform: translateY(-8px) rotate(-1deg);
							}
							50% {
								transform: translateY(-3px) rotate(0.5deg);
							}
							75% {
								transform: translateY(-12px) rotate(-0.5deg);
							}
						}

						.animate-float {
							animation: float 6s ease-in-out infinite;
						}

						.animate-float-delay {
							animation: float-delay 8s ease-in-out infinite;
							animation-delay: 2s;
						}

						/* Enhanced responsive utilities */
						@media (max-width: 640px) {
							.container {
								padding-left: 1rem;
								padding-right: 1rem;
							}
						}

						/* Performance optimizations */
						@media (prefers-reduced-motion: reduce) {
							.animate-float,
							.animate-float-delay {
								animation: none;
							}
						}
					`}</style>
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
									Join us in helping prevent environmental crises and build
									sustainable communities.{" "}
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
