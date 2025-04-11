"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Mail,
	Phone,
	MapPin,
	Send,
	MessageCircle,
	Globe,
	CheckCircle,
	AlertCircle,
	Clock,
	Users,
	HelpCircle,
	Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { smoothScroll } from "@/lib/utils";

const contactSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters" }),
	email: z.string().email({ message: "Invalid email address" }),
	subject: z
		.string()
		.min(5, { message: "Subject must be at least 5 characters" })
		.optional(),
	message: z
		.string()
		.min(10, { message: "Message must be at least 10 characters" }),
	preferredContact: z.enum(["email", "phone"]).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");
	const [activeTab, setActiveTab] = useState<"form" | "direct">("form");

	const handleTabChange = (tab: "form" | "direct") => {
		setActiveTab(tab);
		smoothScroll(`#contact-${tab}`, 80);
	};

	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			preferredContact: "email",
		},
	});

	const preferredContact = watch("preferredContact");

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);
		try {
			const response = await fetch("/api/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || "Failed to send message");
			}

			setSubmitStatus("success");
			reset();
		} catch (error) {
			setSubmitStatus("error");
			console.error("Submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-white">
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
										Get In Touch With G4L Team •
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
						<div className="mb-8 inline-flex items-center gap-3 bg-white px-6 py-2 rounded-full">
							<Clock className="w-5 h-5 text-green-700" />
							<span className="text-sm font-medium text-green-800">
								Average response time: 2 hours
							</span>
						</div>

						<motion.h1
							initial={{ letterSpacing: "1.5rem", opacity: 0 }}
							animate={{ letterSpacing: "0.3rem", opacity: 1 }}
							transition={{ duration: 1.2, delay: 0.3 }}
							className="text-[clamp(2.75rem,8vw,4.75rem)] font-black bg-gradient-to-r from-green-900 to-emerald-800 bg-clip-text text-transparent mb-8 tracking-tight"
						>
							Let&apos;s Build a
							<span className="bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
								{" "}
								Greener Future
							</span>
							<br />
							Together
						</motion.h1>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							className="max-w-2xl mx-auto text-[clamp(1rem,1.5vw,1.25rem)] text-green-800 leading-relaxed mb-10 font-medium px-4 sm:px-0"
						>
							Whether you&apos;re looking to collaborate, volunteer, or just
							have a question - our team is ready to help you make an impact.
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
									Contact Us • Let&apos;s Build • A Greener Future Together •
									Conservation Efforts •
								</span>
							))}
						</motion.div>
					</div>
				)}
			</section>

			{/* Impact Statistics Section */}
			<section className="relative bg-white py-24 overflow-hidden">
				{/* Animated Grid Background */}
				<div className="absolute inset-0 z-0 opacity-10">
					<div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
				</div>

				{/* Floating Particles */}
				<div className="absolute inset-0 flex justify-center items-center z-0">
					{[...Array(15)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute bg-emerald-200 rounded-full"
							initial={{
								scale: 0,
								opacity: 0,
								x: Math.random() * 100 - 50 + "%",
								y: Math.random() * 100 - 50 + "%",
							}}
							animate={{
								scale: [0, Math.random() * 0.8 + 0.2, 0],
								opacity: [0, 0.4, 0],
								rotate: [0, 360],
							}}
							transition={{
								duration: Math.random() * 8 + 10,
								repeat: Infinity,
								ease: "linear",
								delay: Math.random() * 5,
							}}
							style={{
								width: `${Math.random() * 40 + 20}px`,
								height: `${Math.random() * 40 + 20}px`,
							}}
						/>
					))}
				</div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "0px 0px -100px 0px" }}
						className="grid lg:grid-cols-2 gap-16 items-center"
					>
						{/* Mission Statement */}
						<div className="space-y-8">
							<div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-emerald-100">
								<Globe className="w-5 h-5 text-green-700" />
								<span className="text-sm font-medium text-green-700">
									Global Environmental Impact
								</span>
							</div>

							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
								Driving Sustainable Change
								<span className="block mt-3 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
									Across Regions
								</span>
							</h2>

							<p className="text-[clamp(1rem,1.25vw,1.25rem)] text-gray-700/90 font-medium leading-relaxed">
								With every partnership and initiative, we&apos;re building a network
								of environmental stewardship that spans the globe. Our
								collective efforts create ripples of positive change in
								ecosystems and communities.
							</p>
						</div>

						{/* Animated Statistics Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							{[
								{ icon: Globe, value: '#', label: "Areas Active", suffix: "+" },
								{
									icon: Leaf,
									value: '#',
									label: "Projects Completed",
									suffix: "+",
								},
								{
									icon: Users,
									value: '#',
									label: "Volunteers Engaged",
									suffix: "+",
								},
								{
									icon: Clock,
									value: '#',
									label: "Avg. Response Time",
									suffix: "hrs",
								},
							].map((stat, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 + 0.2 }}
									className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
								>
									<div className="flex items-center gap-4">
										<div className="p-3 bg-emerald-100 rounded-xl">
											<stat.icon className="w-6 h-6 text-emerald-600" />
										</div>
										<div>
											<div className="flex items-baseline gap-2">
												<span className="text-3xl font-bold text-gray-900">
													{stat.value.toLocaleString()}
												</span>
												{stat.suffix && (
													<span className="text-emerald-600 font-medium">
														{stat.suffix}
													</span>
												)}
											</div>
											<p className="text-gray-600 mt-1">{stat.label}</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Contact Content */}
			<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Responsive Navigation Tabs */}
				<div className="mb-8 md:mb-16">
					<div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-2xl mx-auto px-4 sm:px-0">
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="w-full sm:w-auto"
						>
							<Button
								variant={activeTab === "form" ? "default" : "outline"}
								onClick={() => handleTabChange("form")}
								className="rounded-xl h-12 md:h-14 px-4 sm:px-6 md:px-8 
                   text-base md:text-lg 
                   justify-start sm:justify-center
                   w-full"
							>
								<MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5 shrink-0" />
								<span className="truncate sm:whitespace-normal">
									Send Message
								</span>
							</Button>
						</motion.div>

						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="w-full sm:w-auto"
						>
							<Button
								variant={activeTab === "direct" ? "default" : "outline"}
								onClick={() => handleTabChange("direct")}
								className="rounded-xl h-12 md:h-14 px-4 sm:px-6 md:px-8 
                   text-base md:text-lg 
                   justify-start sm:justify-center
                   w-full"
							>
								<Users className="mr-2 h-4 w-4 md:h-5 md:w-5 shrink-0" />
								<span className="truncate sm:whitespace-normal">
									Direct Contacts
								</span>
							</Button>
						</motion.div>
					</div>
				</div>

				<AnimatePresence mode="wait">
					{activeTab === "form" ? (
						<motion.div
							key="form"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="max-w-2xl mx-auto"
						>
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<Label htmlFor="name" className="text-gray-700 font-medium">
											Full Name
										</Label>
										<Input
											{...register("name")}
											id="name"
											className="h-12 text-lg"
										/>
										{errors.name && (
											<p className="text-red-500 text-sm flex items-center gap-2">
												<AlertCircle className="h-4 w-4" />
												{errors.name.message}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="email"
											className="text-gray-700 font-medium"
										>
											Email Address
										</Label>
										<Input
											{...register("email")}
											id="email"
											type="email"
											className="h-12 text-lg"
										/>
										{errors.email && (
											<p className="text-red-500 text-sm flex items-center gap-2">
												<AlertCircle className="h-4 w-4" />
												{errors.email.message}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="subject"
										className="text-gray-700 font-medium"
									>
										Subject
									</Label>
									<Input
										{...register("subject")}
										id="subject"
										className="h-12 text-lg"
									/>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="message"
										className="text-gray-700 font-medium"
									>
										Your Message
									</Label>
									<Textarea
										{...register("message")}
										id="message"
										rows={5}
										className="text-lg"
									/>
									{errors.message && (
										<p className="text-red-500 text-sm flex items-center gap-2">
											<AlertCircle className="h-4 w-4" />
											{errors.message.message}
										</p>
									)}
								</div>

								<div className="flex items-center gap-4">
									<Switch
										id="preferred-contact"
										checked={preferredContact === "phone"}
										onCheckedChange={(checked) => {
											setValue("preferredContact", checked ? "phone" : "email");
										}}
									/>
									<Label htmlFor="preferred-contact" className="text-gray-600">
										Prefer phone call response
									</Label>
								</div>

								<Button
									type="submit"
									disabled={isSubmitting}
									className="w-full h-14 text-lg"
								>
									{isSubmitting ? (
										"Sending..."
									) : (
										<>
											<Send className="mr-2 h-5 w-5" />
											Send Message
										</>
									)}
								</Button>

								{submitStatus === "success" && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="bg-emerald-50 p-4 rounded-lg flex items-center gap-3 text-emerald-700"
									>
										<CheckCircle className="h-5 w-5" />
										Message sent! We&apos;ll respond within 24 hours.
									</motion.div>
								)}
							</form>
						</motion.div>
					) : (
						<motion.div
							key="direct"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
						>
							<div className="grid md:grid-cols-2 gap-8 md:gap-12">
								{/* Contact Cards */}
								<div className="space-y-6 md:space-y-8">
									<div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-100">
										<div className="flex items-start gap-4 md:gap-6">
											<div className="bg-emerald-100 p-2 md:p-3 rounded-lg md:rounded-xl">
												<Phone className="h-6 w-6 md:h-8 md:w-8 text-green-800" />
											</div>
											<div>
												<h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
													Phone Support
												</h3>
												<p className="text-sm md:text-base lg:text-lg text-gray-700/90 font-medium leading-relaxed mb-4 md:mb-6">
													Available Monday-Friday, 9AM-5PM EST
												</p>
												<div className="space-y-1 md:space-y-2">
													<a
														href="tel:+211911967112"
														className="text-base md:text-lg font-medium text-green-600 hover:text-green-700"
													>
														+211 911 967 112
													</a>
													<br />
													<a
														href="tel:+211923700314"
														className="text-base md:text-lg font-medium text-green-600 hover:text-green-700"
													>
														+211 923 700 314
													</a>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-100">
										<div className="flex items-start gap-4 md:gap-6">
											<div className="bg-emerald-100 p-2 md:p-3 rounded-lg md:rounded-xl">
												<MapPin className="h-6 w-6 md:h-8 md:w-8 text-green-800" />
											</div>
											<div>
												<h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
													Our Headquarters
												</h3>
												<address className="not-italic text-sm md:text-base lg:text-lg text-gray-700/90 font-medium leading-relaxed space-y-1 md:space-y-2">
													<p>Green for Life Africa</p>
													<p>Juba, South Sudan</p>
													<p>Central Equatoria State</p>
												</address>
											</div>
										</div>
									</div>
								</div>

								{/* Social & Email Section */}
								<div className="space-y-6 md:space-y-8 mt-6 md:mt-0">
									<div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-100">
										<div className="flex items-start gap-4 md:gap-6">
											<div className="bg-emerald-100 p-2 md:p-3 rounded-lg md:rounded-xl">
												<Mail className="h-6 w-6 md:h-8 md:w-8 text-green-800" />
											</div>
											<div>
												<h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
													Email Addresses
												</h3>
												<div className="space-y-2 md:space-y-3">
													<a
														href="mailto:info@green4life.africa"
														className="block text-base md:text-lg text-green-600 hover:text-green-700 font-medium"
													>
														info@green4life.africa
													</a>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-100">
										<div className="flex items-start gap-4 md:gap-6">
											<div className="bg-emerald-100 p-2 md:p-3 rounded-lg md:rounded-xl">
												<Globe className="h-6 w-6 md:h-8 md:w-8 text-green-800" />
											</div>
											<div>
												<h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
													Connect With Us
												</h3>
												<div className="flex flex-wrap gap-3 md:gap-4">
													{[
														"Linkedin",
														"Twitterx",
														"Facebook",
														"Instagram",
													].map((platform) => (
														<motion.a
															key={platform}
															href={`https://${platform.toLowerCase()}.com/green4lifeafrica`}
															target="_blank"
															rel="noopener noreferrer"
															whileHover={{ y: -2 }}
															className="p-2 md:p-3 rounded-lg md:rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors flex-shrink-0"
														>
															<Image
																src={`/icons/${platform}.svg`}
																alt={platform}
																width={24}
																height={24}
																className="w-5 h-5 md:w-6 md:h-6"
															/>
														</motion.a>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Map Section */}
							<div className="mt-8 md:mt-12 bg-white p-4 sm:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-100">
								<h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
									Our Regional Offices
								</h3>
								<div className="aspect-video rounded-lg md:rounded-xl overflow-hidden bg-gray-100">
									<div className="w-full h-full flex items-center justify-center text-gray-500 text-sm md:text-base">
										Interactive Map Component
									</div>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* FAQ Section */}
				<div className="max-w-4xl mx-auto mt-12 md:mt-24 px-4 sm:px-6 lg:px-8">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
						Frequently Asked Questions
					</h2>
					<div className="space-y-4 md:space-y-6">
						{[
							{
								question: "What's the best way to reach your team quickly?",
								answer:
									"For urgent matters, we recommend using our phone support during business hours.",
							},
							{
								question: "Do you offer partnership opportunities?",
								answer:
									"Yes! Please reach out to our partnerships team using the dedicated email.",
							},
							{
								question: "How can I volunteer with your organization?",
								answer:
									"Visit our volunteer portal or contact our volunteer coordinator.",
							},
						].map((faq, index) => (
							<motion.div
								key={index}
								whileHover={{ y: -2 }}
								className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
							>
								<div className="flex items-start gap-3 md:gap-4">
									<HelpCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600 flex-shrink-0 mt-0.5" />
									<div>
										<h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
											{faq.question}
										</h3>
										<p className="text-sm md:text-base text-gray-700/90 font-medium leading-relaxed">
											{faq.answer}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Help Floating Button */}
			{/* <motion.div
				className="fixed bottom-8 right-8 z-50"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				<Button className="rounded-full h-14 w-14 shadow-lg ">
					<LifeBuoy className="h-6 w-6" />
				</Button>
			</motion.div> */}
		</div>
	);
}
