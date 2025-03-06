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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";

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
			const response = await fetch('/api/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
	
			const result = await response.json();
			
			if (!response.ok) {
				throw new Error(result.error || 'Failed to send message');
			}
	
			setSubmitStatus('success');
			reset();
		} catch (error) {
			setSubmitStatus('error');
			// Consider adding error boundary here
			console.error('Submission error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-green-50 to-white py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-900 mb-6">
							Connect With Our Team
						</h1>
						<p className="text-lg text-green-700 max-w-3xl mx-auto mb-8">
							Choose your preferred way to get in touch. We typically respond
							within 24 hours.
						</p>
						<div className="flex justify-center gap-4 mb-12">
							<Button
								variant={activeTab === "form" ? "default" : "outline"}
								onClick={() => setActiveTab("form")}
							>
								<MessageCircle className="mr-2 h-4 w-4" />
								Send Message
							</Button>
							<Button
								variant={activeTab === "direct" ? "default" : "outline"}
								onClick={() => setActiveTab("direct")}
							>
								<Phone className="mr-2 h-4 w-4" />
								Direct Contact
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Contact Content */}
			<section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
				{activeTab === "form" ? (
					<motion.div
						key="form"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="max-w-2xl mx-auto"
					>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<Label
										htmlFor="name"
										className="block text-sm font-medium text-green-800 mb-2"
									>
										Full Name
									</Label>
									<Input
										{...register("name")}
										id="name"
										aria-describedby="name-error"
										className={`${errors.name ? "border-red-500" : ""}`}
									/>
									{errors.name && (
										<p
											id="name-error"
											className="text-red-500 text-sm mt-1 flex items-center"
										>
											<AlertCircle className="mr-1 h-4 w-4" />
											{errors.name.message}
										</p>
									)}
								</div>

								<div>
									<Label
										htmlFor="email"
										className="block text-sm font-medium text-green-800 mb-2"
									>
										Email Address
									</Label>
									<Input
										{...register("email")}
										id="email"
										type="email"
										aria-describedby="email-error"
										className={`${errors.email ? "border-red-500" : ""}`}
									/>
									{errors.email && (
										<p
											id="email-error"
											className="text-red-500 text-sm mt-1 flex items-center"
										>
											<AlertCircle className="mr-1 h-4 w-4" />
											{errors.email.message}
										</p>
									)}
								</div>
							</div>

							<div>
								<Label
									htmlFor="subject"
									className="block text-sm font-medium text-green-800 mb-2"
								>
									Subject (Optional)
								</Label>
								<Input
									{...register("subject")}
									id="subject"
									aria-describedby="subject-error"
								/>
							</div>

							<div>
								<Label
									htmlFor="message"
									className="block text-sm font-medium text-green-800 mb-2"
								>
									Your Message
								</Label>
								<Textarea
									{...register("message")}
									id="message"
									rows={5}
									className={`${errors.message ? "border-red-500" : ""}`}
									aria-describedby="message-error"
								/>
								{errors.message && (
									<p
										id="message-error"
										className="text-red-500 text-sm mt-1 flex items-center"
									>
										<AlertCircle className="mr-1 h-4 w-4" />
										{errors.message.message}
									</p>
								)}
							</div>

							<div className="flex items-center space-x-2">
								<Switch
									id="preferred-contact"
									checked={preferredContact === "phone"}
									onCheckedChange={(checked) => {
										setValue("preferredContact", checked ? "phone" : "email");
									}}
								/>
								<Label
									htmlFor="preferred-contact"
									className="text-sm text-green-700"
								>
									Prefer phone call response
								</Label>
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full"
								aria-live="polite"
							>
								{isSubmitting ? (
									"Sending..."
								) : (
									<>
										<Send className="mr-2 h-4 w-4" />
										Send Message
									</>
								)}
							</Button>

							{submitStatus === "success" && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className="bg-green-50 p-4 rounded-lg flex items-center text-green-700"
								>
									<CheckCircle className="mr-2 h-5 w-5" />
									Message sent! We&apos;ll respond via{" "}
									{preferredContact === "phone" ? "phone" : "email"} within 24
									hours.
								</motion.div>
							)}
						</form>
					</motion.div>
				) : (
					<motion.div
						key="direct"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12"
					>
						{/* Contact Cards */}
						<div className="space-y-8">
							<div className="bg-green-50 p-6 rounded-xl">
								<div className="flex items-start gap-4">
									<div className="bg-green-100 p-3 rounded-lg">
										<Phone className="h-6 w-6 text-green-700" />
									</div>
									<div>
										<h3 className="text-xl font-semibold text-green-900 mb-2">
											Phone Support
										</h3>
										<p className="text-green-700 mb-4">
											Available during office hours
										</p>
										<div className="space-y-1">
											<a
												href="tel:+15551234567"
												className="block text-lg font-medium hover:text-green-700"
											>
												+1 (555) 123-4567
											</a>
											<a
												href="tel:+15559876543"
												className="block text-lg font-medium hover:text-green-700"
											>
												+1 (555) 987-6543
											</a>
										</div>
									</div>
								</div>
							</div>

							<div className="bg-green-50 p-6 rounded-xl">
								<div className="flex items-start gap-4">
									<div className="bg-green-100 p-3 rounded-lg">
										<MapPin className="h-6 w-6 text-green-700" />
									</div>
									<div>
										<h3 className="text-xl font-semibold text-green-900 mb-2">
											Visit Us
										</h3>
										<address className="not-italic text-green-700">
											<p>Green for Life Headquarters</p>
											<p>123 Sustainability Lane</p>
											<p>Eco City, Green State 54321</p>
											<p>United States</p>
										</address>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-8">
							<div className="bg-green-50 p-6 rounded-xl">
								<div className="flex items-start gap-4">
									<div className="bg-green-100 p-3 rounded-lg">
										<Mail className="h-6 w-6 text-green-700" />
									</div>
									<div>
										<h3 className="text-xl font-semibold text-green-900 mb-2">
											Email
										</h3>
										<p className="text-green-700 mb-4">General inquiries:</p>
										<div className="space-y-1">
											<a
												href="mailto:info@greenforlife.org"
												className="block font-medium hover:text-green-700"
											>
												info@greenforlife.org
											</a>
											<a
												href="mailto:support@greenforlife.org"
												className="block font-medium hover:text-green-700"
											>
												support@greenforlife.org
											</a>
										</div>
									</div>
								</div>
							</div>

							<div className="bg-green-50 p-6 rounded-xl">
								<div className="flex items-start gap-4">
									<div className="bg-green-100 p-3 rounded-lg">
										<Globe className="h-6 w-6 text-green-700" />
									</div>
									<div>
										<h3 className="text-xl font-semibold text-green-900 mb-2">
											Connect Online
										</h3>
										<div className="flex gap-4 mt-4">
											<a
												href="https://linkedin.com/company/greenforlife"
												className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
												aria-label="LinkedIn"
											>
												<Image
													src="/icons/Linkedin.svg"
													alt="LinkedIn"
													width={24}
													height={24}
													className="text-green-700"
												/>
											</a>
											<a
												href="https://twitter.com/greenforlife"
												className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
												aria-label="Twitter"
											>
												<Image
													src="/icons/Twitterx.svg"
													alt="Twitter"
													width={24}
													height={24}
													className="text-green-700"
												/>
											</a>
											<a
												href="https://facebook.com/greenforlife"
												className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
												aria-label="Facebook"
											>
												<Image
													src="/icons/Facebook.svg"
													alt="Facebook"
													width={24}
													height={24}
													className="text-green-700"
												/>
											</a>
											<a
												href="https://instagram.com/greenforlife"
												className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
												aria-label="Instagram"
											>
												<Image
													src="/icons/Instagram.svg"
													alt="Instagram"
													width={24}
													height={24}
													className="text-green-700"
												/>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</section>
		</div>
	);
}
