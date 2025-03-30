"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

type FormStatus = "idle" | "loading" | "success" | "error";
type ProgramType = "partner" | "donate" | "volunteer" | "subscribe";

const programs = ["partnership", "donation", "volunteer", "subscribe"];

// Validation schemas
const subscriptionSchema = z.object({
	email: z.string().email("Invalid email address"),
});

// Validation schemas
const partnershipSchema = z.object({
	organization: z.string().min(2, "Minimum 2 characters"),
	contactEmail: z.string().email("Invalid email address"),
	partnershipType: z.enum(["CORPORATE", "COMMUNITY", "RESEARCH"]),
	proposal: z.string().min(50, "Minimum 50 characters required"),
});

const donationSchema = z.object({
	amount: z.number().min(5, "Minimum $5 donation"),
	frequency: z.enum(["ONE_TIME", "MONTHLY", "ANNUAL"]),
	donorEmail: z.string().email("Invalid email address"),
});

const volunteerSchema = z.object({
	fullName: z.string().min(2, "Minimum 2 characters"),
	email: z.string().email("Invalid email address"),
	interests: z.enum(["FIELDWORK", "EDUCATION", "RESEARCH"]),
	availability: z.enum(["WEEKDAYS", "WEEKENDS", "BOTH"]),
});

const apiService = {
    async submitForm<T>(endpoint: string, data: unknown): Promise<T> {
        try {
            const response = await fetch(`/api/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (!response.ok) {
                // Handle structured error responses
                if (responseData.error) {
                    if (typeof responseData.error === 'string') {
                        throw new Error(responseData.error);
                    }
                    // Handle validation errors
                    if (responseData.details) {
                        const messages = Array.isArray(responseData.details) 
                            ? responseData.details.map((d: any) => d.message).join(', ')
                            : 'Validation failed';
                        throw new Error(messages);
                    }
                }
                throw new Error("Submission failed");
            }

            return responseData;
        } catch (error) {
            console.error("API Error:", error);
            throw error instanceof Error ? error : new Error("Network error");
        }
    },
};

const ProgramCard = ({
	title,
	icon,
	description,
	children,
	onOpen,
	status,
	// className,
}: {
	title: string;
	icon: string;
	description: string;
	children: React.ReactNode;
	onOpen: () => void;
	status: FormStatus;
	className?: string;
}) => (
	<motion.div whileHover={{ y: -5 }} className="h-full">
		<Card className="h-full flex flex-col">
			<CardHeader className="pb-0">
				<div className="flex items-center gap-3 mb-4">
					<span className="text-3xl">{icon}</span>
					<div>
						<CardTitle className="text-xl font-semibold text-green-800">
							{title}
						</CardTitle>
						<p className="text-sm text-gray-600 mt-1">{description}</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex-1 space-y-4">
				{children}
				<Button
					onClick={onOpen}
					className="w-full bg-white border border-[#156936] text-[#156936] hover:bg-green-50 mt-4"
					variant={status === "success" ? "secondary" : "outline"}
					disabled={status === "loading" || status === "success"}
				>
					{status === "loading" ? (
						<Loader2 className="h-4 w-4 animate-spin mr-2" />
					) : status === "success" ? (
						<Check className="h-4 w-4 mr-2" />
					) : null}
					{status === "success" ? "Submitted" : "Get Started"}
				</Button>
			</CardContent>
		</Card>
	</motion.div>
);

export default function GetInvolved() {
	const [activeForm, setActiveForm] = useState<ProgramType | null>(null);
	const [submissionStatus, setSubmissionStatus] = useState<
		Record<ProgramType, FormStatus>
	>({
		partner: "idle",
		donate: "idle",
		volunteer: "idle",
		subscribe: "idle",
	});

	const [activeSection, setActiveSection] = useState<string>(programs[0]);

	const handleSubmit = async (formType: ProgramType, data: unknown) => {
		setSubmissionStatus((prev) => ({ ...prev, [formType]: "loading" }));
		try {
			// Map the form type to the correct API endpoint
			const endpoint = formType === "subscribe" ? "subscriptions" : formType;
			await apiService.submitForm(endpoint, data);
			setSubmissionStatus((prev) => ({ ...prev, [formType]: "success" }));
			toast.success("Submission successful!");
			setTimeout(() => setActiveForm(null), 2000);
		} catch (error) {
			setSubmissionStatus((prev) => ({ ...prev, [formType]: "error" }));
			toast.error(error instanceof Error ? error.message : "Submission failed");
		}
	};

	return (
		<div className="min-h-screen">
			{/* Hero Section Get Involved */}
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
										Environmental Action •
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
							Engage with Green for Life
						</motion.h1>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							className="max-w-2xl mx-auto text-[clamp(1rem,1.5vw,1.25rem)] text-green-800 leading-relaxed mb-10 font-medium px-4 sm:px-0"
						>
							Join our ecosystem of sustainability through strategic
							partnerships, impactful donations, and hands-on volunteering
							opportunities.
						</motion.p>
					</motion.div>

					{/* Animated Interactive Buttons */}
					<motion.div
						className="flex justify-center gap-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7 }}
					>
						{/* Sticky Navigation Header */}
						<nav className="border-b border-green-500 shadow-sm">
							<div className="container max-w-7xl mx-auto px-4 py-3">
								<Select
									onValueChange={(value) => {
										const section = document.getElementById(`program-${value}`);
										section?.scrollIntoView({
											behavior: "smooth",
											block: "start",
										});
										setActiveSection(value);
									}}
								>
									<SelectTrigger className="w-full bg-white/90 max-w-md mx-auto shadow-sm hover:shadow-md transition-shadow">
										<SelectValue placeholder="Select Program to Jump" />
									</SelectTrigger>
									<SelectContent className="border-0 shadow-lg">
										{programs.map((program) => (
											<SelectItem
												key={program}
												value={program}
												className="capitalize px-6 py-3 hover:bg-green-50 transition-colors"
											>
												<span className="text-gray-700 font-medium">
													{program.replace("-", " ")}
												</span>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</nav>
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
									Climate Action • Sustainability Reports • Green Technologies •
									Conservation Efforts •
								</span>
							))}
						</motion.div>
					</div>
				)}
			</section>

			<div className="space-y-12">
				{/* Program Sections */}
				<div className="container max-w-7xl mx-auto px-4 space-y-20">
					<section
						id="program-partnership"
						className="scroll-mt-24 animate-fade-in-up"
					>
						<ProgramCard
							title="Strategic Partnerships"
							icon="🤝"
							description="Collaborate on large-scale sustainability initiatives"
							status={submissionStatus.partner}
							onOpen={() => setActiveForm("partner")}
							className="hover:shadow-xl transition-shadow duration-300"
						>
							<div className="space-y-4">
								<div className="bg-white p-4 rounded-lg border border-gray-100">
									<h3 className="text-sm font-semibold text-gray-500 mb-2">
										Key Features
									</h3>
									<ul className="space-y-3 text-gray-600">
										<li className="flex items-center">
											<div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
											Corporate sustainability programs
										</li>
										<li className="flex items-center">
											<div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
											Research collaborations
										</li>
										<li className="flex items-center">
											<div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
											Community impact projects
										</li>
									</ul>
								</div>
							</div>
						</ProgramCard>
					</section>

					<section
						id="program-donation"
						className="scroll-mt-24 animate-fade-in-up"
					>
						<ProgramCard
							title="Impact Funding"
							icon="❤️"
							description="Support our initiatives through financial contributions"
							status={submissionStatus.donate}
							onOpen={() => setActiveForm("donate")}
							className="hover:shadow-xl transition-shadow duration-300"
						>
							<div className="space-y-4">
								<div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
									<div className="flex justify-between items-center mb-2">
										<span className="text-sm font-medium text-gray-600">
											Funding Progress
										</span>
										<span className="font-semibold text-green-600">49%</span>
									</div>
									<div className="relative pt-1">
										<div className="flex mb-2 items-center justify-between">
											<div className="flex-1">
												<div className="h-2 bg-gray-200 rounded-full">
													<div
														className="h-2 bg-green-500 rounded-full transition-all duration-500"
														style={{ width: "49%" }}
													/>
												</div>
											</div>
										</div>
										<div className="flex justify-between text-sm text-gray-500">
											<span>$245K raised</span>
											<span>$500K goal</span>
										</div>
									</div>
								</div>
								<ul className="space-y-3 text-gray-600">
									<li className="flex items-center">
										<div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
										Tax-deductible donations
									</li>
									<li className="flex items-center">
										<div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
										Recurring contribution options
									</li>
								</ul>
							</div>
						</ProgramCard>
					</section>

					<section
						id="program-volunteer"
						className="scroll-mt-24 animate-fade-in-up"
					>
						<ProgramCard
							title="Volunteer Programs"
							icon="👥"
							description="Direct action through community initiatives"
							status={submissionStatus.volunteer}
							onOpen={() => setActiveForm("volunteer")}
							className="hover:shadow-xl transition-shadow duration-300"
						>
							<div className="space-y-4">
								<div className="bg-white p-4 rounded-lg border border-gray-100">
									<div className="flex items-center justify-between mb-2">
										<div>
											<p className="text-sm font-medium text-gray-600">
												Next Event
											</p>
											<p className="text-green-600 font-semibold">
												Urban Tree Planting
											</p>
										</div>
										<div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
											March 15th
										</div>
									</div>
									<div className="border-t border-gray-100 mt-3 pt-3">
										<ul className="space-y-3 text-gray-600">
											<li className="flex items-center">
												<div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
												Fieldwork opportunities
											</li>
											<li className="flex items-center">
												<div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
												Skill-based volunteering
											</li>
										</ul>
									</div>
								</div>
							</div>
						</ProgramCard>
					</section>

					<section
						id="program-subscribe"
						className="scroll-mt-24 animate-fade-in-up"
					>
						<NewsletterCard
							onSubmit={(data) => handleSubmit("subscribe", data)}
							status={submissionStatus.subscribe}
						/>
					</section>
				</div>
			</div>

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
								onSubmit={(data) => handleSubmit("partner", data)}
								onClose={() => setActiveForm(null)}
							/>
						)}
						{activeForm === "donate" && (
							<Elements stripe={stripePromise}>
								<DonationForm
									status={submissionStatus.donate}
									onSubmit={(data) => handleSubmit("donate", data)}
									onClose={() => setActiveForm(null)}
								/>
							</Elements>
						)}
						{activeForm === "volunteer" && (
							<VolunteerForm
								status={submissionStatus.volunteer}
								onSubmit={(data) => handleSubmit("volunteer", data)}
								onClose={() => setActiveForm(null)}
							/>
						)}
					</motion.div>
				</div>
			)}

			<section className="relative h-[500px] flex items-center justify-center mt-20 mb-20">
				{/* Background image with overlay */}
				<div className="absolute inset-0 z-0">
					<div
						className="w-full h-full bg-cover bg-center"
						style={{ backgroundImage: "url(/images/team-bg.webp)" }}
					>
						<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
					</div>
				</div>

				{/* Content container */}
				<div className="relative z-10 max-w-6xl container mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
					<div className="md:max-w-[50%] space-y-6 text-white">
						<h1 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-tight">
							Shape the Future With Us
						</h1>
						<p className="text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed">
							Join a community of changemakers driving real impact. Whether
							you&apos;re contributing time, expertise, or resources, your
							participation creates lasting change. Start your journey today.
						</p>
						<div className="flex flex-col md:flex-row gap-4">
							<a
								href="/signup"
								className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
							>
								Join Our Volunteer Team
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

const FormLayout = ({
	title,
	onClose,
	children,
}: {
	title: string;
	onClose: () => void;
	children: React.ReactNode;
}) => (
	<div className="space-y-4">
		<div className="flex justify-between items-center">
			<h2 className="text-xl font-semibold text-green-800">{title}</h2>
			<button
				onClick={onClose}
				className="text-gray-500 hover:text-gray-700 transition-colors"
			>
				<X className="h-5 w-5" />
			</button>
		</div>
		{children}
	</div>
);

const FormFooter = ({ status }: { status: FormStatus }) => (
	<div className="mt-6">
		<Button
			type="submit"
			className="w-full bg-green-800 hover:bg-green-900"
			disabled={status === "loading" || status === "success"}
		>
			{status === "loading" ? (
				<>
					<Loader2 className="h-4 w-4 animate-spin mr-2" />
					Submitting...
				</>
			) : status === "success" ? (
				<>
					<Check className="h-4 w-4 mr-2" />
					Submitted
				</>
			) : (
				"Submit"
			)}
		</Button>
	</div>
);

const PartnerForm = ({
	status,
	onSubmit,
	onClose,
}: {
	status: FormStatus;
	onSubmit: (data: unknown) => void;
	onClose: () => void;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({ resolver: zodResolver(partnershipSchema) });

	return (
		<FormLayout title="Partnership Inquiry" onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label>Organization Name</Label>
						<Input {...register("organization")} />
						{errors.organization && (
							<p className="text-red-500 text-sm">
								{errors.organization.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Contact Email</Label>
						<Input {...register("contactEmail")} />
						{errors.contactEmail && (
							<p className="text-red-500 text-sm">
								{errors.contactEmail.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Partnership Type</Label>
						<Controller
							name="partnershipType"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="CORPORATE">Corporate Partnership</SelectItem>
										<SelectItem value="COMMUNITY">Community Program</SelectItem>
										<SelectItem value="RESEARCH">Research Collaboration</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.partnershipType && (
							<p className="text-red-500 text-sm">{errors.partnershipType.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Project Proposal</Label>
						<Textarea {...register("proposal")} rows={4} />
						{errors.proposal && (
							<p className="text-red-500 text-sm">{errors.proposal.message}</p>
						)}
					</div>
				</div>
				<FormFooter status={status} />
			</form>
		</FormLayout>
	);
};

const DonationForm = ({
	status,
	onSubmit,
	onClose,
}: {
	status: FormStatus;
	onSubmit: (data: unknown) => void;
	onClose: () => void;
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({ resolver: zodResolver(donationSchema) });

	const processDonation: SubmitHandler<z.infer<typeof donationSchema>> = async (data) => {
		if (!stripe || !elements) {
			toast.error("Payment processing not available");
			return;
		}

		const cardElement = elements.getElement(CardElement);
		if (!cardElement) {
			toast.error("Card element not found");
			return;
		}

		try {
			const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
				type: "card",
				card: cardElement,
			});

			if (stripeError) {
				toast.error(stripeError.message);
				throw new Error(stripeError.message);
			}

			await onSubmit({ ...data, paymentMethodId: paymentMethod.id });
		} catch (error) {
			console.error("Payment processing error:", error);
			toast.error(error instanceof Error ? error.message : "Payment processing failed");
			throw error;
		}
	};

	return (
		<FormLayout title="Make a Donation" onClose={onClose}>
			<form onSubmit={handleSubmit(processDonation)}>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label>Amount ($)</Label>
						<Input
							type="number"
							{...register("amount", { valueAsNumber: true })}
						/>
						{errors.amount && (
							<p className="text-red-500 text-sm">{errors.amount.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Frequency</Label>
						<Controller
							name="frequency"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Select frequency" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="ONE_TIME">One-time</SelectItem>
										<SelectItem value="MONTHLY">Monthly</SelectItem>
										<SelectItem value="ANNUAL">Annual</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.frequency && (
							<p className="text-red-500 text-sm">{errors.frequency.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Card Details</Label>
						<CardElement
							className="p-3 border rounded-md"
							options={{
								style: {
									base: {
										fontSize: "16px",
										color: "#424770",
										"::placeholder": { color: "#aab7c4" },
									},
									invalid: { color: "#9e2146" },
								},
							}}
						/>
					</div>
					<div className="space-y-2">
						<Label>Donor Email</Label>
						<Input {...register("donorEmail")} />
						{errors.donorEmail && (
							<p className="text-red-500 text-sm">
								{errors.donorEmail.message}
							</p>
						)}
					</div>
				</div>
				<FormFooter status={status} />
			</form>
		</FormLayout>
	);
};

const VolunteerForm = ({
	status,
	onSubmit,
	onClose,
}: {
	status: FormStatus;
	onSubmit: (data: unknown) => void;
	onClose: () => void;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({ resolver: zodResolver(volunteerSchema) });

	return (
		<FormLayout title="Volunteer Application" onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label>Full Name</Label>
						<Input {...register("fullName")} />
						{errors.fullName && (
							<p className="text-red-500 text-sm">{errors.fullName.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Email</Label>
						<Input {...register("email")} />
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Areas of Interest</Label>
						<Controller
							name="interests"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Select interests" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="FIELDWORK">Field Work</SelectItem>
										<SelectItem value="EDUCATION">Community Education</SelectItem>
										<SelectItem value="RESEARCH">Research Assistance</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.interests && (
							<p className="text-red-500 text-sm">{errors.interests.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label>Availability</Label>
						<Controller
							name="availability"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Select availability" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="WEEKDAYS">Weekdays</SelectItem>
										<SelectItem value="WEEKENDS">Weekends</SelectItem>
										<SelectItem value="BOTH">Both</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.availability && (
							<p className="text-red-500 text-sm">{errors.availability.message}</p>
						)}
					</div>
				</div>
				<FormFooter status={status} />
			</form>
		</FormLayout>
	);
};

// Newsletter Component
const NewsletterCard = ({
	onSubmit,
	status,
}: {
	onSubmit: (data: z.infer<typeof subscriptionSchema>) => void;
	status: FormStatus;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<z.infer<typeof subscriptionSchema>>({
		resolver: zodResolver(subscriptionSchema),
	});

	const handleSubmission: SubmitHandler<{ email: string }> = async (data) => {
		await onSubmit(data);
		reset();
	};

	return (
		<motion.div whileHover={{ y: -5 }} className="md:col-span-2 lg:col-span-3">
			<Card className="bg-white border-gray-200 shadow-md">
				<CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
					<div className="flex-1 space-y-2">
						<div className="flex items-center gap-3">
							<span className="text-3xl">📬</span>
							<h3 className="text-xl font-semibold text-green-800">
								Stay Updated with Our Progress
							</h3>
						</div>
						<p className="text-gray-700">
							Subscribe to our newsletter for updates on our latest initiatives
							and events.
						</p>
					</div>
					<form onSubmit={handleSubmit(handleSubmission)} className="flex-1">
						<div className="flex items-center gap-3">
							<Input
								{...register("email")}
								placeholder="Enter your email"
								className="flex-1"
							/>
							<Button
								type="submit"
								className="bg-[#156936] text-white hover:bg-green-700"
								disabled={status === "loading" || status === "success"}
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
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email.message}</p>
						)}
					</form>
				</CardContent>
				<div className="flex items-center text-sm text-gray-600 p-4 border-t border-gray-200">
					<svg
						className="w-5 h-5 mr-2 text-blue-500"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
						<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
					</svg>
					<span>We respect your privacy. Unsubscribe anytime.</span>
				</div>
			</Card>
		</motion.div>
	);
};
