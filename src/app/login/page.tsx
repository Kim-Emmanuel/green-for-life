"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function LoginPage() {
	const router = useRouter();
	const [isRegistering, setIsRegistering] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		const formData = new FormData(e.currentTarget);
		const data = {
			type: isRegistering ? "register" : "login",
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			...(isRegistering && { username: formData.get("username") as string }),
		};

		try {
			const res = await fetch("/api/auth", {
				method: "POST",
				credentials: "include", // Important for cookies
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result = await res.json();

			if (!res.ok) {
				throw new Error(result.error || "Authentication failed");
			}

			// Set the token in a cookie
			document.cookie = `token=${result.token}; path=/`;

			router.push("/news-resources");
			router.refresh();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Authentication failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-white flex">
			{/* Image Section */}
			<div className="hidden lg:block relative w-1/2 bg-gradient-to-br from-green-50 to-green-100">
				<div className="h-full w-full relative">
					<Image
						src="/images/hero.webp" // Replace with your brand image
						alt="Decorative background"
						fill
						className="object-cover h-full w-full opacity-90"
						priority
					/>
					<div className="absolute inset-0 bg-green-900/20 flex items-center justify-center">
						<p className="text-white text-2xl font-light text-center px-8">
							"Connect with your community like never before"
						</p>
					</div>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-green-800/20 to-transparent" />
			</div>

			{/* Form Section */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 xl:p-24">
				<div className="max-w-md w-full space-y-8">
					{/* Branding Header */}
					<div className="text-center space-y-4">
						<Image
							src="/green-for-life.svg" // Replace with your logo path
							alt="Company Logo"
							width={120}
							height={40}
							className="mx-auto"
						/>
						<div className="space-y-2">
							<h2 className="text-3xl font-bold text-gray-900">
								{isRegistering ? "Join Our Community" : "Welcome Back"}
							</h2>
							<p className="text-gray-500">
								{isRegistering
									? "Start your sustainable journey with us"
									: "Continue making a green impact"}
							</p>
						</div>
					</div>

					{/* Error Message */}
					{error && (
						<div className="bg-red-50 p-4 rounded-lg flex items-center gap-3 text-red-700">
							<svg
								className="w-5 h-5 flex-shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-sm">{error}</span>
						</div>
					)}

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-4">
							{isRegistering && (
								<div className="space-y-2">
									<Label htmlFor="username" className="text-gray-700">
										Username
									</Label>
									<Input
										id="username"
										name="username"
										type="text"
										required
										className="focus:ring-green-500 focus:border-green-500"
										placeholder="Your unique name"
									/>
								</div>
							)}

							<div className="space-y-2">
								<Label htmlFor="email" className="text-gray-700">
									Email
								</Label>
								<Input
									id="email"
									name="email"
									type="email"
									required
									className="focus:ring-green-500 focus:border-green-500"
									placeholder="name@example.com"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password" className="text-gray-700">
									Password
								</Label>
								<Input
									id="password"
									name="password"
									type="password"
									required
									className="focus:ring-green-500 focus:border-green-500"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<Button
							type="submit"
							className="w-full h-12 text-white font-medium transition-colors"
							disabled={loading}
						>
							{loading ? (
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
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									{isRegistering ? "Creating Account..." : "Signing In..."}
								</span>
							) : isRegistering ? (
								"Get Started"
							) : (
								"Continue to Dashboard"
							)}
						</Button>
					</form>

					{/* Toggle Auth Mode */}
					<div className="text-center text-sm text-gray-500">
						{isRegistering ? "Already have an account?" : "Need an account?"}
						<button
							onClick={() => setIsRegistering(!isRegistering)}
							className="ml-2 text-green-600 hover:text-green-800 font-medium transition-colors"
						>
							{isRegistering ? "Sign in instead" : "Create one now"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
