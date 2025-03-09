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

// Type definitions
type FormStatus = "idle" | "loading" | "success" | "error";
type ProgramType = "partner" | "donate" | "volunteer" | "subscribe";

interface ProgramCardProps {
	title: string;
	icon: string;
	description: string;
	children: React.ReactNode;
	onOpen: () => void;
	status: FormStatus;
}

interface FormLayoutProps {
	title: string;
	children: React.ReactNode;
	onClose: () => void;
}

interface FormFooterProps {
	status: FormStatus;
	onSubmit: () => void;
}

// Main component
export default function GetInvolved() {
	const [email, setEmail] = useState("");
	const [newsletterStatus, setNewsletterStatus] = useState<FormStatus>("idle");
	const [activeSection, setActiveSection] = useState<string>("");
	const [activeForm, setActiveForm] = useState<ProgramType | null>(null);
	const [submissionStatus, setSubmissionStatus] = useState<
		Record<ProgramType, FormStatus>
	>({
		partner: "idle",
		donate: "idle",
		volunteer: "idle",
		subscribe: "idle",
	});

	const handleNewsletterSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setNewsletterStatus("loading");
		try {
			await new Promise((resolve) => setTimeout(resolve, 1200));
			setNewsletterStatus("success");
			setEmail("");
			setTimeout(() => setNewsletterStatus("idle"), 3000);
		} catch {
			setNewsletterStatus("error");
		}
	};

	const programs = ["partnership", "donation", "volunteer", "subscribe"];

	useEffect(() => {
		if (activeSection) {
			const section = document.getElementById(activeSection);
			if (section) {
				section.scrollIntoView({ behavior: "smooth" });
				section.classList.add("active-section");
				setTimeout(() => section.classList.remove("active-section"), 2000);
			}
		}
	}, [activeSection]);

	const handleSubmit = async (formType: ProgramType) => {
		setSubmissionStatus((prev) => ({ ...prev, [formType]: "loading" }));
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setSubmissionStatus((prev) => ({ ...prev, [formType]: "success" }));
			setTimeout(() => setActiveForm(null), 2000);
		} catch {
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
						status={submissionStatus.partner}
						onOpen={() => setActiveForm("partner")}
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
						status={submissionStatus.donate}
						onOpen={() => setActiveForm("donate")}
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
						status={submissionStatus.volunteer}
						onOpen={() => setActiveForm("volunteer")}
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
const ProgramCard = ({
	title,
	icon,
	children,
	onOpen,
	status,
}: ProgramCardProps) => (
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
const PartnerForm = ({
	status,
	onSubmit,
	onClose,
}: {
	status: FormStatus;
	onSubmit: () => void;
	onClose: () => void;
}) => (
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

const DonationForm = ({ status, onSubmit, onClose }: { status: FormStatus; onSubmit: () => void; onClose: () => void }) => (
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

const VolunteerForm = ({ status, onSubmit, onClose }: { status: FormStatus; onSubmit: () => void; onClose: () => void }) => (
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

const NewsletterCard = ({ status, email, onEmailChange, onSubmit }: { 
  status: FormStatus;
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) => (
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
const FormLayout = ({ title, children, onClose }: FormLayoutProps) => (
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

const FormFooter = ({ status, onSubmit }: FormFooterProps) => (
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
