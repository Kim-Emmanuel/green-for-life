"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Check, Loader2 } from "lucide-react";

export default function GetInvolved() {
	const [email, setEmail] = useState("");
	const [newsletterStatus, setNewsletterStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [activeSection, setActiveSection] = useState<string>("");
	const [activeForm, setActiveForm] = useState<string | null>(null);
	const [submissionStatus, setSubmissionStatus] = useState<{
		[key: string]: "idle" | "loading" | "success" | "error";
	}>({
		partner: "idle",
		donate: "idle",
		volunteer: "idle",
	});

	// Add newsletter submission handler
	const handleNewsletterSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setNewsletterStatus("loading");
		try {
			await new Promise((resolve) => setTimeout(resolve, 1200));
			setNewsletterStatus("success");
			setEmail("");
			setTimeout(() => setNewsletterStatus("idle"), 3000);
		} catch (error) {
			setNewsletterStatus("error");
		}
	};

	const programs = ["partnership", "donation", "volunteer", "subscribe"];

	// Scroll to section and highlight
	useEffect(() => {
		if (activeSection) {
			const section = document.getElementById(activeSection);
			if (section) {
				section.scrollIntoView({ behavior: "smooth" });
				section.classList.add("active-section");

				// Remove highlight after 2 seconds
				setTimeout(() => {
					section.classList.remove("active-section");
				}, 2000);
			}
		}
	}, [activeSection]);

	// Mock form submission handler
	const handleSubmit = async (formType: string) => {
		setSubmissionStatus((prev) => ({ ...prev, [formType]: "loading" }));
		try {
			// Simulated API call
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setSubmissionStatus((prev) => ({ ...prev, [formType]: "success" }));
			setTimeout(() => setActiveForm(null), 2000);
		} catch (error) {
			setSubmissionStatus((prev) => ({ ...prev, [formType]: "error" }));
		}
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl p-6 space-y-12">
			<motion.header
				className="text-center space-y-4"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<h1 className="text-4xl font-bold text-green-800">
					Engage with Green for Life
				</h1>
				<p className="text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed text-gray-600 max-w-2xl mx-auto">
					Join our ecosystem of sustainability through strategic partnerships,
					impactful donations, and hands-on volunteering opportunities.
				</p>
			</motion.header>

			{/* Navigation Dropdown */}
			<div className="sticky top-4 bg-white/90 backdrop-blur-sm py-2">
				<Select onValueChange={(value) => setActiveSection(value)}>
					<SelectTrigger className="w-[300px] mx-auto">
						<SelectValue placeholder="Jump to Program" />
					</SelectTrigger>
					<SelectContent>
						{programs.map((program) => (
							<SelectItem key={program} value={program} className="capitalize">
								{program.replace("-", " ")}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{/* Partnership Card */}
				<section id="partnership" className="scroll-mt-24">
					<ProgramCard
						title="Strategic Partnerships"
						icon="🤝"
						description="Collaborate on large-scale sustainability initiatives"
						onOpen={() => setActiveForm("partner")}
						status={submissionStatus.partner}
					>
						<ul className="space-y-2 text-gray-700">
							<li>• Corporate sustainability programs</li>
							<li>• Research collaborations</li>
							<li>• Community impact projects</li>
						</ul>
					</ProgramCard>
				</section>

				{/* Donation Card */}
				<section id="donation" className="scroll-mt-24">
					<ProgramCard
						title="Impact Funding"
						icon="❤️"
						description="Support our initiatives through financial or material contributions"
						onOpen={() => setActiveForm("donate")}
						status={submissionStatus.donate}
					>
						<div className="space-y-2">
							<div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
								<span className="text-sm">Current Funding Goal</span>
								<span className="font-semibold text-green-700">
									$245K/$500K
								</span>
							</div>
							<ul className="space-y-2 text-gray-700">
								<li>• Tax-deductible donations</li>
								<li>• Equipment/material contributions</li>
							</ul>
						</div>
					</ProgramCard>
				</section>

				{/* Volunteer Card */}
				<section id="volunteer" className="scroll-mt-24">
					<ProgramCard
						title="Volunteer Programs"
						icon="👥"
						description="Direct action through our community initiatives"
						onOpen={() => setActiveForm("volunteer")}
						status={submissionStatus.volunteer}
					>
						<div className="space-y-3">
							<div className="bg-green-50 p-3 rounded-lg">
								<p className="text-sm font-medium">Next Event</p>
								<p className="text-green-700">
									Urban Tree Planting - March 15th
								</p>
							</div>
							<ul className="space-y-2 text-gray-700">
								<li>• Fieldwork opportunities</li>
								<li>• Skill-based volunteering</li>
							</ul>
						</div>
					</ProgramCard>
				</section>
			</div>

			{/* Newsletter Card */}
			<section id="subscribe" className="scroll-mt-24 ">
				<NewsletterCard
					status={newsletterStatus}
					email={email}
					onEmailChange={setEmail}
					onSubmit={handleNewsletterSubmit}
				/>
			</section>

			{/* Dynamic Form Modal */}
			{activeForm && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
					<motion.div
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="bg-white rounded-xl p-6 max-w-md w-full"
					>
						{activeForm === "partner" && (
							<PartnerForm
								status={submissionStatus.partner}
								onSubmit={() => handleSubmit("partner")}
								onClose={() => setActiveForm(null)}
							/>
						)}

						{activeForm === "donate" && (
							<DonationForm
								status={submissionStatus.donate}
								onSubmit={() => handleSubmit("donate")}
								onClose={() => setActiveForm(null)}
							/>
						)}

						{activeForm === "volunteer" && (
							<VolunteerForm
								status={submissionStatus.volunteer}
								onSubmit={() => handleSubmit("volunteer")}
								onClose={() => setActiveForm(null)}
							/>
						)}
					</motion.div>
				</div>
			)}
		</div>
	);
}

// Reusable Program Card Component
const ProgramCard = ({ title, icon, children, onOpen, status }: any) => (
	<motion.div whileHover={{ y: -5 }} className="h-full">
		<Card className="h-full flex flex-col">
			<CardHeader className="pb-0">
				<div className="flex items-center gap-3 mb-4">
					<span className="text-3xl">{icon}</span>
					<CardTitle className="text-xl font-semibold text-green-800">
						{title}
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="flex-1 space-y-4">
				{children}
				<Button
					onClick={onOpen}
					className="w-full bg-white border border-[#156936] text-[#156936] font-medium hover:bg-green-50 mt-4"
					variant={status === "success" ? "secondary" : "default"}
					disabled={status === "loading" || status === "success"}
				>
					{status === "loading"
						? "Processing..."
						: status === "success"
						? "Submitted ✓"
						: "Get Started"}
				</Button>
			</CardContent>
		</Card>
	</motion.div>
);

// Form Components
const PartnerForm = ({ status, onSubmit, onClose }: any) => (
	<FormLayout title="Partnership Inquiry" onClose={onClose}>
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label>Organization Name</Label>
					<Input required />
				</div>
				<div className="space-y-2">
					<Label>Contact Email</Label>
					<Input type="email" required />
				</div>
			</div>
			<div className="space-y-2">
				<Label>Partnership Type</Label>
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="corporate">Corporate Partnership</SelectItem>
						<SelectItem value="community">Community Program</SelectItem>
						<SelectItem value="research">Research Collaboration</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-2">
				<Label>Project Proposal</Label>
				<Textarea rows={4} />
			</div>
		</div>
		<FormFooter status={status} onSubmit={onSubmit} />
	</FormLayout>
);

const DonationForm = ({ status, onSubmit, onClose }: any) => (
	<FormLayout title="Contribution Details" onClose={onClose}>
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label>Amount</Label>
					<Input type="number" placeholder="$" />
				</div>
				<div className="space-y-2">
					<Label>Frequency</Label>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="One-time" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="one-time">One-time</SelectItem>
							<SelectItem value="monthly">Monthly</SelectItem>
							<SelectItem value="annual">Annual</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="space-y-2">
				<Label>Payment Method</Label>
				<div className="grid grid-cols-3 gap-4">
					<Button variant="outline" className="h-12">
						Credit Card
					</Button>
					<Button variant="outline" className="h-12">
						PayPal
					</Button>
					<Button variant="outline" className="h-12">
						Bank Transfer
					</Button>
				</div>
			</div>
		</div>
		<FormFooter status={status} onSubmit={onSubmit} />
	</FormLayout>
);

const VolunteerForm = ({ status, onSubmit, onClose }: any) => (
	<FormLayout title="Volunteer Application" onClose={onClose}>
		<div className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label>Full Name</Label>
					<Input required />
				</div>
				<div className="space-y-2">
					<Label>Email</Label>
					<Input type="email" required />
				</div>
			</div>
			<div className="space-y-2">
				<Label>Areas of Interest</Label>
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select interests" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="fieldwork">Field Work</SelectItem>
						<SelectItem value="education">Community Education</SelectItem>
						<SelectItem value="research">Research Assistance</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-2">
				<Label>Availability</Label>
				<div className="grid grid-cols-2 gap-4">
					<Button variant="outline">Weekdays</Button>
					<Button variant="outline">Weekends</Button>
				</div>
			</div>
		</div>
		<FormFooter status={status} onSubmit={onSubmit} />
	</FormLayout>
);

const NewsletterCard = ({ status, email, onEmailChange, onSubmit }: any) => (
	<motion.div
		whileHover={{ y: -5 }}
		className="md:col-span-2 lg:col-span-3" // Spans full width on larger screens
	>
		<Card className="bg-green-50 border-green-100 shadow-lg">
			<CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
				<div className="flex-1 space-y-2">
					<div className="flex items-center gap-3">
						<span className="text-3xl">📬</span>
						<h3 className="text-xl font-semibold text-green-800">
							Stay Updated with Our Progress
						</h3>
					</div>
					<p className="text-gray-700 text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed">
						Subscribe to our monthly sustainability digest - project updates,
						impact reports, and actionable eco-tips.
					</p>
				</div>

				<form onSubmit={onSubmit} className="w-full md:w-auto">
					<div className="flex gap-2">
						<Input
							type="email"
							placeholder="Enter your email"
							className="w-full md:w-64"
							value={email}
							onChange={(e) => onEmailChange(e.target.value)}
							disabled={status === "loading" || status === "success"}
						/>
						<Button
							type="submit"
							variant={status === "success" ? "secondary" : "default"}
							disabled={!email || status === "loading" || status === "success"}
							className="shrink-0  bg-white border border-[#156936] text-[#156936] font-medium hover:bg-green-50"
						>
							{status === "loading" ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : status === "success" ? (
								<Check className="h-4 w-4" />
							) : (
								"Subscribe"
							)}
						</Button>
					</div>

					{status === "error" && (
						<p className="text-red-600 text-sm mt-2">
							Subscription failed. Please try again.
						</p>
					)}
					{status === "success" && (
						<p className="text-green-700 text-sm mt-2">
							Thanks for subscribing! Check your inbox for confirmation.
						</p>
					)}
				</form>
			</CardContent>
		</Card>
	</motion.div>
);

// Reusable Form Components
const FormLayout = ({ title, children, onClose, onSubmit }: any) => (
	<>
		<div className="flex justify-between items-center mb-6">
			<h3 className="text-xl font-semibold">{title}</h3>
			<Button variant="ghost" onClick={onClose} size="sm">
				✕
			</Button>
		</div>
		{children}
	</>
);

const FormFooter = ({ status, onSubmit }: any) => (
	<div className="mt-6 flex justify-end gap-3">
		<Button
			onClick={onSubmit}
			disabled={status === "loading"}
			className="min-w-[120px]"
		>
			{status === "loading" ? "Submitting..." : "Submit"}
		</Button>
	</div>
);

// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { HandHelping, DollarSign, Users, Mail, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { motion } from "framer-motion";
// import Image from "next/image";

// // Partnership Form Schema
// const partnershipSchema = z.object({
//   organizationName: z.string().min(2, { message: "Organization name is required" }),
//   contactPerson: z.string().min(2, { message: "Contact person name is required" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   phone: z.string().min(10, { message: "Phone number is required" }),
//   message: z.string().min(10, {
//     message: "Please provide more details about potential partnership",
//   }),
// });

// // Volunteer Form Schema
// const volunteerSchema = z.object({
//   name: z.string().min(2, { message: "Name is required" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   phone: z.string().min(10, { message: "Phone number is required" }),
//   skills: z.string().optional(),
//   availability: z.string().min(10, { message: "Please describe your availability" }),
// });

// // Donation Form Schema
// const donationSchema = z.object({
//   name: z.string().min(2, { message: "Name is required" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   amount: z.number().min(5, { message: "Minimum donation is $5" }),
//   message: z.string().optional(),
// });

// type GetInvolvedSection = "partner" | "donate" | "volunteer" | "subscribe";

// type FormData = z.infer<typeof partnershipSchema>
//   | z.infer<typeof volunteerSchema>
//   | z.infer<typeof donationSchema>;

// export default function GetInvolved() {
//   const [activeSection, setActiveSection] = useState<GetInvolvedSection>("partner");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

//   // Partnership Form Hook
//   const partnershipForm = useForm({
//     resolver: zodResolver(partnershipSchema),
//   });

//   // Volunteer Form Hook
//   const volunteerForm = useForm({
//     resolver: zodResolver(volunteerSchema),
//   });

//   // Donation Form Hook
//   const donationForm = useForm({
//     resolver: zodResolver(donationSchema),
//   });

//   // Form Submission Handler
//   const handleFormSubmission = async (
//     data: FormData,
//     formType: GetInvolvedSection
//   ) => {
//     setIsSubmitting(true);
//     setSubmitStatus("idle");

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       setSubmitStatus("success");

//       switch (formType) {
//         case "partner":
//           partnershipForm.reset();
//           break;
//         case "volunteer":
//           volunteerForm.reset();
//           break;
//         case "donate":
//           donationForm.reset();
//           break;
//       }
//     } catch (error) {
//       setSubmitStatus("error");
//       console.error("Form submission error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Add status display component
//   const renderStatusMessage = () => {
//     if (submitStatus === "success") {
//       return (
//         <div className="p-4 mb-4 bg-green-50 text-green-700 rounded-lg">
//           Form submitted successfully!
//         </div>
//       );
//     }
//     if (submitStatus === "error") {
//       return (
//         <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-lg">
//           Error submitting form. Please try again.
//         </div>
//       );
//     }
//     return null;
//   };

// 	// Render Active Section
// 	const renderActiveSection = () => {
// 		switch (activeSection) {
// 			case "partner":
// 				return (
// 					<div className="bg-white rounded-2xl shadow-xl p-8">
// 						<div className="flex items-center gap-3 mb-8">
// 							<HandHelping className="w-8 h-8 text-primary" />
// 							<h2 className="text-3xl font-bold text-green-800">
// 								Partner with Us
// 							</h2>
// 						</div>
// 						<p className="text-gray-700 mb-6">
// 							Collaborate with Green for Life to create sustainable solutions.
// 							Whether you&apos;re a business, NGO, or community group, we welcome
// 							partnerships that align with our mission.
// 						</p>
// 						<div className="grid lg:grid-cols-[1fr,400px] gap-12">
// 							<form
// 								onSubmit={partnershipForm.handleSubmit((data) =>
// 									handleFormSubmission(data, "partner")
// 								)}
// 								className="space-y-6"
// 							>
// 								<div className="grid sm:grid-cols-2 gap-4">
// 									<div className="space-y-2">
// 										<label className="text-sm font-medium text-gray-700">
// 											Organization Name
// 										</label>
// 										<Input
// 											{...partnershipForm.register("organizationName")}
// 											className="bg-gray-50 border-gray-200 focus:bg-white"
// 										/>
// 									</div>
// 									<div className="space-y-2">
// 										<label className="text-sm font-medium text-gray-700">
// 											Contact Person
// 										</label>
// 										<Input
// 											{...partnershipForm.register("contactPerson")}
// 											className="bg-gray-50 border-gray-200 focus:bg-white"
// 										/>
// 									</div>
// 								</div>
// 								<div className="grid sm:grid-cols-2 gap-4">
// 									<div className="space-y-2">
// 										<label className="text-sm font-medium text-gray-700">
// 											Email Address
// 										</label>
// 										<Input
// 											{...partnershipForm.register("email")}
// 											type="email"
// 											className="bg-gray-50 border-gray-200 focus:bg-white"
// 										/>
// 									</div>
// 									<div className="space-y-2">
// 										<label className="text-sm font-medium text-gray-700">
// 											Phone Number
// 										</label>
// 										<Input
// 											{...partnershipForm.register("phone")}
// 											className="bg-gray-50 border-gray-200 focus:bg-white"
// 										/>
// 									</div>
// 								</div>
// 								<div className="space-y-2">
// 									<label className="text-sm font-medium text-gray-700">
// 										Partnership Details
// 									</label>
// 									<Textarea
// 										{...partnershipForm.register("message")}
// 										className="bg-gray-50 border-gray-200 focus:bg-white min-h-[120px]"
// 									/>
// 								</div>
// 								<Button type="submit" className="w-full sm:w-auto px-8">
// 									{isSubmitting ? (
// 										<span className="flex items-center gap-2">
// 											<span className="animate-spin">⏳</span> Submitting...
// 										</span>
// 									) : (
// 										<span className="flex items-center gap-2">
// 											Submit Inquiry <ArrowRight className="w-4 h-4" />
// 										</span>
// 									)}
// 								</Button>
// 								{renderStatusMessage()}
// 							</form>
// 							<div className="hidden lg:block">
// 								<Image
// 									src="/get-involved/partnership.jpg"
// 									alt="Partnership"
// 									width={400}
// 									height={500}
// 									className="rounded-xl shadow-lg object-cover h-full"
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				);

// 			case "donate":
// 				return (
// 					<div className="bg-white rounded-2xl shadow-xl p-8">
// 						<div className="flex items-center gap-3 mb-8">
// 							<DollarSign className="w-8 h-8 text-primary" />
// 							<h2 className="text-3xl font-bold text-green-800">
// 								Donate to Support Our Mission
// 							</h2>
// 						</div>
//             <p className="text-gray-700 mb-6">
// 								Your contribution helps us plant trees, empower communities, and
// 								fight climate change. Every dollar makes a difference.
// 							</p>
// 						<div className="grid lg:grid-cols-[1fr,400px] gap-12">
// 							<form
// 								onSubmit={donationForm.handleSubmit((data) =>
// 									handleFormSubmission(data, "donate")
// 								)}
// 								className="space-y-6"
// 							>
// 								<div className="grid sm:grid-cols-2 gap-4">
// 									<div className="space-y-2">
// 										<label className="text-sm font-medium text-gray-700">
// 											Full Name
// 										</label>
// 										<Input
// 											{...donationForm.register("name")}
// 											className="bg-gray-50 border-gray-200 focus:bg-white"
// 										/>
// 									</div>
// 									<div className="space-y-2">
// 										<label className="text-sm font-medium text-gray-700">
// 											Email Address
// 										</label>
// 										<Input
// 											{...donationForm.register("email")}
// 											type="email"
// 											className="bg-gray-50 border-gray-200 focus:bg-white"
// 										/>
// 									</div>
// 								</div>
// 								<div className="space-y-2">
// 									<label className="text-sm font-medium text-gray-700">
// 										Donation Amount ($)
// 									</label>
// 									<div className="grid grid-cols-4 gap-3 mb-4">
// 										{[10, 25, 50, 100].map((amount) => (
// 											<Button
// 												key={amount}
// 												type="button"
// 												variant="outline"
// 												onClick={() => donationForm.setValue("amount", amount)}
// 												className="bg-gray-50 hover:bg-primary hover:text-white"
// 											>
// 												${amount}
// 											</Button>
// 										))}
// 									</div>
// 									<Input
// 										{...donationForm.register("amount")}
// 										type="number"
// 										className="bg-gray-50 border-gray-200 focus:bg-white"
// 									/>
// 								</div>
// 								<div className="space-y-2">
// 									<label className="text-sm font-medium text-gray-700">
// 										Message (Optional)
// 									</label>
// 									<Textarea
// 										{...donationForm.register("message")}
// 										className="bg-gray-50 border-gray-200 focus:bg-white min-h-[120px]"
// 									/>
// 								</div>
// 								<Button type="submit" className="w-full sm:w-auto px-8">
// 									{isSubmitting ? (
// 										<span className="flex items-center gap-2">
// 											<span className="animate-spin">⏳</span> Processing...
// 										</span>
// 									) : (
// 										<span className="flex items-center gap-2">
// 											Donate Now <ArrowRight className="w-4 h-4" />
// 										</span>
// 									)}
// 								</Button>
// 								{renderStatusMessage()}
// 							</form>
// 							<div className="hidden lg:block">
// 								<Image
// 									src="/get-involved/donation.jpg"
// 									alt="Donation"
// 									width={400}
// 									height={500}
// 									className="rounded-xl shadow-lg object-cover h-full"
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				);

// 			case "volunteer":
// 				return (
// 					<div className="bg-white rounded-2xl shadow-xl p-8">
// 						<div className="flex items-center gap-3 mb-8">
// 							<Users className="w-8 h-8 text-primary" />
// 							<h2 className="text-3xl font-bold text-green-800">
// 								Volunteer with Us
// 							</h2>
// 						</div>
//             <p className="text-gray-700 mb-6">
// 								Join our team of passionate volunteers and make a tangible
// 								impact. Whether you&apos;re on the ground or behind the scenes, your
// 								skills and time are invaluable.
// 							</p>
// 						<div className="grid lg:grid-cols-[1fr,400px] gap-12">
// 							<form
// 								onSubmit={volunteerForm.handleSubmit((data) =>
// 									handleFormSubmission(data, "volunteer")
// 								)}
// 								className="space-y-6"
// 							>
// 								<div className="grid sm:grid-cols-2 gap-4">
// 									<div className="space-y-2">
// 										<label className="text-sm font-medium text-gray-700">
// 											Full Name
// 										</label>
// 										<Input
// 											{...volunteerForm.register("name")}
// 											className="bg-gray-50 border-gray-200 focus:bg-white"
// 										/>
// 									</div>
// 									<div className="space-y-2">
// 										<label className="text-sm font-medium text-gray-700">
// 											Email Address
// 										</label>
// 										<Input
// 											{...volunteerForm.register("email")}
// 											type="email"
// 											className="bg-gray-50 border-gray-200 focus:bg-white"
// 										/>
// 									</div>
// 								</div>
// 								<div className="grid sm:grid-cols-2 gap-4">
// 									<div className="space-y-2">
// 										<label className="text-sm font-medium text-gray-700">
// 											Phone Number
// 										</label>
// 										<Input
// 											{...volunteerForm.register("phone")}
// 											className="bg-gray-50 border-gray-200 focus:bg-white"
// 										/>
// 									</div>
// 									<div className="space-y-2">
// 										<label className="text-sm font-medium text-gray-700">
// 											Skills (Optional)
// 										</label>
// 										<Input
// 											{...volunteerForm.register("skills")}
// 											className="bg-gray-50 border-gray-200 focus:bg-white"
// 										/>
// 									</div>
// 								</div>
// 								<div className="space-y-2">
// 									<label className="text-sm font-medium text-gray-700">
// 										Availability & Interests
// 									</label>
// 									<Textarea
// 										{...volunteerForm.register("availability")}
// 										className="bg-gray-50 border-gray-200 focus:bg-white min-h-[120px]"
// 									/>
// 								</div>
// 								<Button type="submit" className="w-full sm:w-auto px-8">
// 									{isSubmitting ? (
// 										<span className="flex items-center gap-2">
// 											<span className="animate-spin">⏳</span> Submitting...
// 										</span>
// 									) : (
// 										<span className="flex items-center gap-2">
// 											Submit Application <ArrowRight className="w-4 h-4" />
// 										</span>
// 									)}
// 								</Button>
// 								{renderStatusMessage()}
// 							</form>
// 							<div className="hidden lg:block">
// 								<Image
// 									src="/get-involved/newsletter.svg"
// 									alt="Volunteer"
// 									width={300}
// 									height={300}
// 									className="object-cover"
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				);

// 			case "subscribe":
// 				return (
// 					<div className="bg-white rounded-2xl shadow-xl p-8">
// 						<div className="flex items-center gap-3 mb-8">
// 							<Mail className="w-8 h-8 text-primary" />
// 							<h2 className="text-3xl font-bold text-green-800">
// 								Subscribe to Our Newsletter
// 							</h2>
// 						</div>
//             <p className="text-gray-700 mb-6">
// 								Stay updated on our latest projects, impact stories, and
// 								opportunities to get involved. Join our community of
// 								changemakers.
// 							</p>
// 						<div className="grid lg:grid-cols-[1fr,400px] gap-12">
// 							<form className="space-y-6">
// 								<div className="space-y-2">
// 									<label className="text-sm font-medium text-gray-700">
// 										Full Name
// 									</label>
// 									<Input className="bg-gray-50 border-gray-200 focus:bg-white" />
// 								</div>
// 								<div className="space-y-2">
// 									<label className="text-sm font-medium text-gray-700">
// 										Email Address
// 									</label>
// 									<Input
// 										type="email"
// 										className="bg-gray-50 border-gray-200 focus:bg-white"
// 									/>
// 								</div>
// 								<Button type="submit" className="w-full sm:w-auto px-8">
// 									<span className="flex items-center gap-2">
// 										Subscribe <ArrowRight className="w-4 h-4" />
// 									</span>
// 								</Button>
// 								{renderStatusMessage()}
// 							</form>
// 							<div className="hidden lg:block">
// 								<Image
// 									src="/get-involved/mailbox.svg"
// 									alt="Subscription Mailbox"
// 									width={300}
// 									height={300}
// 									className="p-8"
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				);
// 		}
// 	};

// 	return (
// 		<div className="min-h-screen bg-white">
// 			{/* Hero Section */}
// 			<section className="bg-green-50 py-16">
// 				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
// 					<motion.h1
// 						initial={{ opacity: 0, y: -50 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-800 mb-6"
// 					>
// 						Get Involved with Green for Life
// 					</motion.h1>
// 					<p className="max-w-3xl mx-auto text-lg text-green-700">
// 						Join us in creating a sustainable future. Whether you want to
// 						partner, donate, volunteer, or stay updated, there&apos;s a place for you
// 						in our mission.
// 					</p>
// 				</div>
// 			</section>

// 			{/* Navigation Tabs */}
// 			<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
// 				<div className="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 mb-12">
// 					{["partner", "donate", "volunteer", "subscribe"].map((section) => (
// 						<Button
// 							key={section}
// 							onClick={() => setActiveSection(section as GetInvolvedSection)}
// 							className={`px-6 py-3 mx-2 rounded-full transition-all duration-300 ${
// 								activeSection === section
// 									? "bg-primary text-gray-900 font-medium shadow-lg"
// 									: "bg-green-50 text-green-700 font-medium hover:bg-green-100"
// 							}`}
// 						>
// 							{section === "partner" && "Partner with Us"}
// 							{section === "donate" && "Donate"}
// 							{section === "volunteer" && "Volunteer"}
// 							{section === "subscribe" && "Subscribe"}
// 						</Button>
// 					))}
// 				</div>

// 				{/* Active Section Content */}
// 				<motion.div
// 					key={activeSection}
// 					initial={{ opacity: 0, y: 20 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					transition={{ duration: 0.5 }}
// 					className="mx-auto"
// 				>
// 					{renderActiveSection()}
// 				</motion.div>
// 			</section>
// 		</div>
// 	);
// }
