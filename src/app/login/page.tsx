"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";

const formVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
};

export default function LoginPage() {
	const router = useRouter();
	const [isRegistering, setIsRegistering] = useState(false);
	const [isPending, startTransition] = useTransition();
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = {
			type: isRegistering ? "register" : "login",
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			...(isRegistering && { username: formData.get("username") as string }),
		};

		startTransition(async () => {
			try {
				const res = await fetch("/api/auth", {
					method: "POST",
					credentials: "include",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});

				const result = await res.json();

				if (!res.ok) throw new Error(result.error || "Authentication failed");

				document.cookie = `token=${result.token}; path=/`;

				toast.success(
					isRegistering ? "Account created successfully!" : "Welcome back!",
					{
						description: "Redirecting to your dashboard...",
						position: "top-center",
					}
				);

				setTimeout(() => {
					router.push("/news-resources");
					router.refresh();
				}, 2000);
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Authentication failed";
				toast.error("Authentication Failed", {
					description: errorMessage,
					position: "top-center",
					action: {
						label: "Retry",
						onClick: () => formRef.current?.requestSubmit(),
					},
				});
			}
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
			>
				{/* Image Section */}
				<div className="hidden lg:block relative bg-gradient-to-br from-green-100 to-green-200">
					<Image
						src="/images/hero.webp"
						alt="Community illustration"
						fill
						className="object-cover opacity-90"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-green-800/20 to-transparent flex items-end p-8">
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-white text-xl font-light text-center"
						>
							"Empowering sustainable communities through connection"
						</motion.p>
					</div>
				</div>

				{/* Form Section */}
				<div className="p-8 sm:p-12 lg:p-16">
					<div className="flex flex-col items-center space-y-6 mb-8">
						<Image
							src="/green-for-life.svg"
							alt="Green Life Logo"
							width={140}
							height={50}
							className="hover:scale-105 transition-transform"
						/>
						<motion.div
							key={isRegistering ? "register" : "login"}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-center"
						>
							<h2 className="text-2xl font-bold text-gray-900">
								{isRegistering ? "Join Our Movement" : "Welcome Back"}
							</h2>
							<p className="text-gray-500 mt-2">
								{isRegistering
									? "Create your account in seconds"
									: "Sign in to continue your journey"}
							</p>
						</motion.div>
					</div>

					<form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
						<motion.div
							variants={formVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="space-y-5"
						>
							{isRegistering && (
								<div className="relative">
									<Input
										id="username"
										name="username"
										type="text"
										required
										className="peer h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
										placeholder=" "
									/>
									<Label
										htmlFor="username"
										className="absolute left-3 top-2.5 text-gray-400 transition-all duration-200 transform origin-left -translate-y-4 scale-75 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 pointer-events-none bg-white px-1"
									>
										Username
									</Label>
								</div>
							)}

							<div className="relative">
								<Input
									id="email"
									name="email"
									type="email"
									required
									className="peer h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
									placeholder=" "
								/>
								<Label
									htmlFor="email"
									className="absolute left-3 top-2.5 text-gray-400 transition-all duration-200 transform origin-left -translate-y-4 scale-75 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 pointer-events-none bg-white px-1"
								>
									Email
								</Label>
							</div>

							<div className="relative">
								<Input
									id="password"
									name="password"
									type="password"
									required
									className="peer h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
									placeholder=" "
								/>
								<Label
									htmlFor="password"
									className="absolute left-3 top-2.5 text-gray-400 transition-all duration-200 transform origin-left -translate-y-4 scale-75 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 pointer-events-none bg-white px-1"
								>
									Password
								</Label>
							</div>
						</motion.div>

						<Button
							type="submit"
							className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition-all relative overflow-hidden"
							disabled={isPending}
						>
							{isPending && (
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: "100%" }}
									className="absolute inset-0 bg-green-800/20"
									transition={{ duration: 2, repeat: Infinity }}
								/>
							)}
							<span className="relative z-10">
								{isPending ? (
									<span className="flex items-center justify-center gap-2">
										<svg
											className="animate-spin h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											/>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											/>
										</svg>
										{isRegistering ? "Creating Account..." : "Signing In..."}
									</span>
								) : isRegistering ? (
									"Join Now"
								) : (
									"Continue"
								)}
							</span>
						</Button>
					</form>

					<div className="mt-6 text-center text-sm text-gray-500">
						{isRegistering ? "Already a member?" : "New here?"}
						<button
							onClick={() => setIsRegistering(!isRegistering)}
							className="ml-2 text-green-600 hover:text-green-800 font-medium transition-colors underline-offset-4 hover:underline"
						>
							{isRegistering ? "Sign in instead" : "Create account"}
						</button>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
