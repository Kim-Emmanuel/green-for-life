"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HandHelping, DollarSign, Users, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import Image from "next/image";

// Partnership Form Schema
const partnershipSchema = z.object({
  organizationName: z.string().min(2, { message: "Organization name is required" }),
  contactPerson: z.string().min(2, { message: "Contact person name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  message: z.string().min(10, {
    message: "Please provide more details about potential partnership",
  }),
});

// Volunteer Form Schema
const volunteerSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  skills: z.string().optional(),
  availability: z.string().min(10, { message: "Please describe your availability" }),
});

// Donation Form Schema
const donationSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  amount: z.number().min(5, { message: "Minimum donation is $5" }),
  message: z.string().optional(),
});

type GetInvolvedSection = "partner" | "donate" | "volunteer" | "subscribe";

type FormData = z.infer<typeof partnershipSchema> 
  | z.infer<typeof volunteerSchema> 
  | z.infer<typeof donationSchema>;

export default function GetInvolved() {
  const [activeSection, setActiveSection] = useState<GetInvolvedSection>("partner");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Partnership Form Hook
  const partnershipForm = useForm({
    resolver: zodResolver(partnershipSchema),
  });

  // Volunteer Form Hook
  const volunteerForm = useForm({
    resolver: zodResolver(volunteerSchema),
  });

  // Donation Form Hook
  const donationForm = useForm({
    resolver: zodResolver(donationSchema),
  });

  // Form Submission Handler
  const handleFormSubmission = async (
    data: FormData,
    formType: GetInvolvedSection
  ) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");

      switch (formType) {
        case "partner":
          partnershipForm.reset();
          break;
        case "volunteer":
          volunteerForm.reset();
          break;
        case "donate":
          donationForm.reset();
          break;
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add status display component
  const renderStatusMessage = () => {
    if (submitStatus === "success") {
      return (
        <div className="p-4 mb-4 bg-green-50 text-green-700 rounded-lg">
          Form submitted successfully!
        </div>
      );
    }
    if (submitStatus === "error") {
      return (
        <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-lg">
          Error submitting form. Please try again.
        </div>
      );
    }
    return null;
  };


	// Render Active Section
	const renderActiveSection = () => {
		switch (activeSection) {
			case "partner":
				return (
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<div className="flex items-center gap-3 mb-8">
							<HandHelping className="w-8 h-8 text-primary" />
							<h2 className="text-3xl font-bold text-green-800">
								Partner with Us
							</h2>
						</div>
						<p className="text-gray-700 mb-6">
							Collaborate with Green for Life to create sustainable solutions.
							Whether you&apos;re a business, NGO, or community group, we welcome
							partnerships that align with our mission.
						</p>
						<div className="grid lg:grid-cols-[1fr,400px] gap-12">
							<form
								onSubmit={partnershipForm.handleSubmit((data) =>
									handleFormSubmission(data, "partner")
								)}
								className="space-y-6"
							>
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">
											Organization Name
										</label>
										<Input
											{...partnershipForm.register("organizationName")}
											className="bg-gray-50 border-gray-200 focus:bg-white"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">
											Contact Person
										</label>
										<Input
											{...partnershipForm.register("contactPerson")}
											className="bg-gray-50 border-gray-200 focus:bg-white"
										/>
									</div>
								</div>
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">
											Email Address
										</label>
										<Input
											{...partnershipForm.register("email")}
											type="email"
											className="bg-gray-50 border-gray-200 focus:bg-white"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">
											Phone Number
										</label>
										<Input
											{...partnershipForm.register("phone")}
											className="bg-gray-50 border-gray-200 focus:bg-white"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										Partnership Details
									</label>
									<Textarea
										{...partnershipForm.register("message")}
										className="bg-gray-50 border-gray-200 focus:bg-white min-h-[120px]"
									/>
								</div>
								<Button type="submit" className="w-full sm:w-auto px-8">
									{isSubmitting ? (
										<span className="flex items-center gap-2">
											<span className="animate-spin">⏳</span> Submitting...
										</span>
									) : (
										<span className="flex items-center gap-2">
											Submit Inquiry <ArrowRight className="w-4 h-4" />
										</span>
									)}
								</Button>
								{renderStatusMessage()}
							</form>
							<div className="hidden lg:block">
								<Image
									src="/get-involved/partnership.jpg"
									alt="Partnership"
									width={400}
									height={500}
									className="rounded-xl shadow-lg object-cover h-full"
								/>
							</div>
						</div>
					</div>
				);

			case "donate":
				return (
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<div className="flex items-center gap-3 mb-8">
							<DollarSign className="w-8 h-8 text-primary" />
							<h2 className="text-3xl font-bold text-green-800">
								Donate to Support Our Mission
							</h2>
						</div>
            <p className="text-gray-700 mb-6">
								Your contribution helps us plant trees, empower communities, and
								fight climate change. Every dollar makes a difference.
							</p>
						<div className="grid lg:grid-cols-[1fr,400px] gap-12">
							<form
								onSubmit={donationForm.handleSubmit((data) =>
									handleFormSubmission(data, "donate")
								)}
								className="space-y-6"
							>
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">
											Full Name
										</label>
										<Input
											{...donationForm.register("name")}
											className="bg-gray-50 border-gray-200 focus:bg-white"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">
											Email Address
										</label>
										<Input
											{...donationForm.register("email")}
											type="email"
											className="bg-gray-50 border-gray-200 focus:bg-white"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										Donation Amount ($)
									</label>
									<div className="grid grid-cols-4 gap-3 mb-4">
										{[10, 25, 50, 100].map((amount) => (
											<Button
												key={amount}
												type="button"
												variant="outline"
												onClick={() => donationForm.setValue("amount", amount)}
												className="bg-gray-50 hover:bg-primary hover:text-white"
											>
												${amount}
											</Button>
										))}
									</div>
									<Input
										{...donationForm.register("amount")}
										type="number"
										className="bg-gray-50 border-gray-200 focus:bg-white"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										Message (Optional)
									</label>
									<Textarea
										{...donationForm.register("message")}
										className="bg-gray-50 border-gray-200 focus:bg-white min-h-[120px]"
									/>
								</div>
								<Button type="submit" className="w-full sm:w-auto px-8">
									{isSubmitting ? (
										<span className="flex items-center gap-2">
											<span className="animate-spin">⏳</span> Processing...
										</span>
									) : (
										<span className="flex items-center gap-2">
											Donate Now <ArrowRight className="w-4 h-4" />
										</span>
									)}
								</Button>
								{renderStatusMessage()}
							</form>
							<div className="hidden lg:block">
								<Image
									src="/get-involved/donation.jpg"
									alt="Donation"
									width={400}
									height={500}
									className="rounded-xl shadow-lg object-cover h-full"
								/>
							</div>
						</div>
					</div>
				);

			case "volunteer":
				return (
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<div className="flex items-center gap-3 mb-8">
							<Users className="w-8 h-8 text-primary" />
							<h2 className="text-3xl font-bold text-green-800">
								Volunteer with Us
							</h2>
						</div>
            <p className="text-gray-700 mb-6">
								Join our team of passionate volunteers and make a tangible
								impact. Whether you&apos;re on the ground or behind the scenes, your
								skills and time are invaluable.
							</p>
						<div className="grid lg:grid-cols-[1fr,400px] gap-12">
							<form
								onSubmit={volunteerForm.handleSubmit((data) =>
									handleFormSubmission(data, "volunteer")
								)}
								className="space-y-6"
							>
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">
											Full Name
										</label>
										<Input
											{...volunteerForm.register("name")}
											className="bg-gray-50 border-gray-200 focus:bg-white"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">
											Email Address
										</label>
										<Input
											{...volunteerForm.register("email")}
											type="email"
											className="bg-gray-50 border-gray-200 focus:bg-white"
										/>
									</div>
								</div>
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">
											Phone Number
										</label>
										<Input
											{...volunteerForm.register("phone")}
											className="bg-gray-50 border-gray-200 focus:bg-white"
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">
											Skills (Optional)
										</label>
										<Input
											{...volunteerForm.register("skills")}
											className="bg-gray-50 border-gray-200 focus:bg-white"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										Availability & Interests
									</label>
									<Textarea
										{...volunteerForm.register("availability")}
										className="bg-gray-50 border-gray-200 focus:bg-white min-h-[120px]"
									/>
								</div>
								<Button type="submit" className="w-full sm:w-auto px-8">
									{isSubmitting ? (
										<span className="flex items-center gap-2">
											<span className="animate-spin">⏳</span> Submitting...
										</span>
									) : (
										<span className="flex items-center gap-2">
											Submit Application <ArrowRight className="w-4 h-4" />
										</span>
									)}
								</Button>
								{renderStatusMessage()}
							</form>
							<div className="hidden lg:block">
								<Image
									src="/get-involved/newsletter.svg"
									alt="Volunteer"
									width={300}
									height={300}
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				);

			case "subscribe":
				return (
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<div className="flex items-center gap-3 mb-8">
							<Mail className="w-8 h-8 text-primary" />
							<h2 className="text-3xl font-bold text-green-800">
								Subscribe to Our Newsletter
							</h2>
						</div>
            <p className="text-gray-700 mb-6">
								Stay updated on our latest projects, impact stories, and
								opportunities to get involved. Join our community of
								changemakers.
							</p>
						<div className="grid lg:grid-cols-[1fr,400px] gap-12">
							<form className="space-y-6">
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										Full Name
									</label>
									<Input className="bg-gray-50 border-gray-200 focus:bg-white" />
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-gray-700">
										Email Address
									</label>
									<Input
										type="email"
										className="bg-gray-50 border-gray-200 focus:bg-white"
									/>
								</div>
								<Button type="submit" className="w-full sm:w-auto px-8">
									<span className="flex items-center gap-2">
										Subscribe <ArrowRight className="w-4 h-4" />
									</span>
								</Button>
								{renderStatusMessage()}
							</form>
							<div className="hidden lg:block">
								<Image
									src="/get-involved/mailbox.svg"
									alt="Subscription Mailbox"
									width={300}
									height={300}
									className="p-8"
								/>
							</div>
						</div>
					</div>
				);
		}
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="bg-green-50 py-16">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.h1
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-[clamp(2rem,5vw,3rem)] font-bold text-green-800 mb-6"
					>
						Get Involved with Green for Life
					</motion.h1>
					<p className="max-w-3xl mx-auto text-lg text-green-700">
						Join us in creating a sustainable future. Whether you want to
						partner, donate, volunteer, or stay updated, there&apos;s a place for you
						in our mission.
					</p>
				</div>
			</section>

			{/* Navigation Tabs */}
			<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 mb-12">
					{["partner", "donate", "volunteer", "subscribe"].map((section) => (
						<Button
							key={section}
							onClick={() => setActiveSection(section as GetInvolvedSection)}
							className={`px-6 py-3 mx-2 rounded-full transition-all duration-300 ${
								activeSection === section
									? "bg-primary text-gray-900 font-medium shadow-lg"
									: "bg-green-50 text-green-700 font-medium hover:bg-green-100"
							}`}
						>
							{section === "partner" && "Partner with Us"}
							{section === "donate" && "Donate"}
							{section === "volunteer" && "Volunteer"}
							{section === "subscribe" && "Subscribe"}
						</Button>
					))}
				</div>

				{/* Active Section Content */}
				<motion.div
					key={activeSection}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mx-auto"
				>
					{renderActiveSection()}
				</motion.div>
			</section>
		</div>
	);
}
