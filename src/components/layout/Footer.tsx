"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{
			icon: (
				<Image
					src="/icons/Facebook.svg"
					alt="Facebook"
					width={20}
					height={20}
					className="w-6 h-6"
				/>
			),
			href: "https://facebook.com/g4l",
		},
		{
			icon: (
				<Image
					src="/icons/Twitterx.svg"
					alt="Twitter"
					width={20}
					height={20}
					className="w-6 h-6"
				/>
			),
			href: "https://twitter.com/g4l",
		},
		{
			icon: (
				<Image
					src="/icons/Instagram.svg"
					alt="Instagram"
					width={20}
					height={20}
					className="w-6 h-6"
				/>
			),
			href: "https://instagram.com/g4l",
		},
		{
			icon: (
				<Image
					src="/icons/Youtube.svg"
					alt="Youtube"
					width={20}
					height={20}
					className="w-6 h-6"
				/>
			),
			href: "https://youtube.com/g4l",
		},
	];

	const footerLinks = [
		{
			title: "Explore",
			links: [
				{ label: "Home", href: "/" },
				{ label: "About Us", href: "/about" },
				{ label: "Our Work", href: "/our-work" },
				{ label: "Get Involved", href: "/get-involved" },
			],
		},
		{
			title: "Resources",
			links: [
				{ label: "News & Updates", href: "/news-resources" },
				{ label: "Impact Reports", href: "/impact" },
				{ label: "Blog", href: "/blog" },
				{ label: "Careers", href: "/careers" },
			],
		},
		{
			title: "Support",
			links: [
				{ label: "Donate", href: "/donate" },
				{ label: "Volunteer", href: "/volunteer" },
				{ label: "Partner", href: "/partner" },
				{ label: "Contact Us", href: "/contact" },
			],
		},
	];

	// Animation variants for Framer Motion
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1 },
	};

	return (
		<footer className="relative pt-12 overflow-hidden">
			{/* Background Layers */}
			<div className="absolute inset-0 z-0">
				{/* Background Image */}
				<div
					className="absolute inset-0 bg-[url('/images/footer-bg.webp')] bg-cover bg-center"
					style={{ filter: "blur(6px)" }}
				/>
				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-black/60" />
				{/* Subtle Grain Effect */}
				<div className="absolute inset-0 bg-noise opacity-10" />
			</div>

			{/* Content */}
			<motion.div
				className="relative z-10 container mx-auto grid md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				{/* Brand Section */}
				<motion.div className="md:col-span-1" variants={itemVariants}>
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center space-x-2"
						aria-label="Home"
					>
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300 }}
							className="relative w-[100px] h-[60px] md:w-[120px] md:h-[70px] lg:w-[150px] lg:h-[80px]"
						>
							<Image
								src="/white logo-01.svg"
								alt="Green For Life"
								width={130}
								height={80}
								priority
								className="object-contain"
							/>
						</motion.div>
					</Link>
					<p className="text-sm text-green-100 mb-4">
						Green for Life: Transforming communities through sustainable
						environmental solutions.
					</p>

					{/* Social Links */}
					<div className="flex space-x-4 mt-4">
						{socialLinks.map((social, index) => (
							<motion.a
								key={index}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`text-green-200 hover:${social} transition-colors duration-300`}
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.9 }}
							>
								<div
									className={`${social} [&>img]:brightness-0 [&>img]:invert`}
								>
									{social.icon}
								</div>
							</motion.a>
						))}
					</div>
				</motion.div>

				{/* Footer Navigation Links */}
				{footerLinks.map((section, index) => (
					<motion.div
						key={index}
						className="md:col-span-1"
						variants={itemVariants}
					>
						<motion.h4
							className="font-semibold mb-4 text-green-300 hover:text-green-400 transition-colors duration-300"
							whileHover={{ scale: 1.05 }}
						>
							{section.title}
						</motion.h4>
						<nav className="space-y-2">
							{section.links.map((link) => (
								<motion.div key={link.href} whileHover={{ x: 5 }}>
									<Link
										href={link.href}
										className="block text-sm text-green-100 hover:text-white transition-colors duration-300"
									>
										{link.label}
									</Link>
								</motion.div>
							))}
						</nav>
					</motion.div>
				))}

				{/* Newsletter Signup */}
				<motion.div className="md:col-span-1" variants={itemVariants}>
					<motion.h4
						className="font-semibold mb-4 text-green-300 hover:text-green-400 transition-colors duration-300"
						whileHover={{ scale: 1.05 }}
					>
						Stay Connected
					</motion.h4>
					<form className="space-y-2">
						<motion.input
							type="email"
							placeholder="Enter your email"
							className="w-full p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
							whileFocus={{ scale: 1.02 }}
						/>
						<motion.div
							
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Button type="submit" className="w-full text-gray-900 p-2 rounded transition-colors duration-300">
								Subscribe
							</Button>
						</motion.div>
					</form>
				</motion.div>
			</motion.div>

			{/* Copyright and Legal */}
			<motion.div
				className="relative z-10 bg-[#156936] mx-auto mt-8 pt-4 pb-12 border-t border-green-700 text-center px-4 sm:px-6 lg:px-8"
				variants={itemVariants}
			>
				<p className="text-sm text-white">
					© {currentYear} Green for Life. All Rights Reserved.
				</p>
				<div className="mt-2 flex justify-center gap-6 text-sm">
					<motion.div className="p-2" whileHover={{ x: 5 }}>
						<Link
							href="/privacy"
							className="text-white hover:text-white transition-colors duration-300 py-2 px-3 block"
						>
							Privacy Policy
						</Link>
					</motion.div>
					<motion.div className="p-2" whileHover={{ x: 5 }}>
						<Link
							href="/terms"
							className="text-white hover:text-white transition-colors duration-300 py-2 px-3 block"
						>
							Terms of Service
						</Link>
					</motion.div>
				</div>
			</motion.div>
		</footer>
	);
}
