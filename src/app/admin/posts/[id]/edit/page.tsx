"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PostCategory, PostStatus } from "@prisma/client";
import { FileUpload } from "@/components/FileUpload";
import {
	ArrowLeft,
	Loader2,
	Globe,
	CalendarDays,
	MapPin,
	AlertCircle,
	LayoutTemplate,
	ImageIcon,
	FileText,
	Briefcase,
} from "lucide-react";

type Post = {
	id: string;
	title: string;
	content: string;
	status: PostStatus;
	category: PostCategory;
	featured_image?: string;
	file_attachment?: string;
	apply_url?: string;
	location?: string;
	deadline?: string;
};

export default function EditPostPage() {
	const router = useRouter();
	const params = useParams();
	const [post, setPost] = useState<Post | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const id = params.id as string;

	useEffect(() => {
		if (!id) return;

		const fetchPost = async () => {
			try {
				const res = await fetch(`/api/posts/${id}`, {
					credentials: "include",
				});
				if (!res.ok) {
					if (res.status === 401) {
						router.push("/login");
						return;
					}
					throw new Error("Failed to fetch post");
				}
				const data = await res.json();
				setPost(data.post);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error loading post");
			} finally {
				setIsLoading(false);
			}
		};

		fetchPost();
	}, [id, router]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setPost((prev) => (prev ? { ...prev, [name]: value } : null));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!post) return;

		setIsSaving(true);
		setError(null);

		try {
			const formattedUrls = {
				featured_image: post.featured_image
					? new URL(post.featured_image).toString()
					: null,
				file_attachment: post.file_attachment
					? new URL(post.file_attachment).toString()
					: null,
				apply_url: post.apply_url ? new URL(post.apply_url).toString() : null,
			};

			const res = await fetch(`/api/posts/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...post,
					...formattedUrls,
					deadline: post.deadline
						? new Date(post.deadline).toISOString()
						: null,
				}),
				credentials: "include",
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || "Failed to update post");
			}

			router.push(`/news-resources/${id}`);
		} catch (err) {
			if (err instanceof TypeError && err.message.includes("URL")) {
				setError("Please enter a valid URL for the featured image");
			} else {
				setError(err instanceof Error ? err.message : "Error updating post");
			}
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800" />
			</div>
		);
	}

	if (!post) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<p className="text-red-600 mb-4">{error || "Post not found"}</p>
					<Button onClick={() => router.back()}>Go Back</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<div className="mb-6">
					<Button
						variant="ghost"
						onClick={() => router.back()}
						className="text-gray-600 hover:bg-green-50 gap-1.5 pl-2 transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
						Back to Post
					</Button>
				</div>

				<div className="space-y-8">
					<div className="flex flex-col md:flex-row justify-between gap-4">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
							<p className="text-gray-600 mt-2">
								Update and manage post content
							</p>
						</div>
						<Button
							type="submit"
							form="edit-post-form"
							className="gap-2 bg-green-700 hover:bg-green-800 text-white shadow-sm transition-colors"
							disabled={isSaving}
						>
							{isSaving ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									Saving Changes...
								</>
							) : (
								"Publish Updates"
							)}
						</Button>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-100 p-4 rounded-lg flex items-start gap-3">
							<AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
							<div>
								<p className="font-medium text-red-800">Update Error</p>
								<p className="text-sm text-red-700">{error}</p>
							</div>
						</div>
					)}

					<form
						id="edit-post-form"
						onSubmit={handleSubmit}
						className="bg-white rounded-xl border border-gray-100 shadow-sm"
					>
						{/* Metadata Section */}
						<div className="p-6 space-y-6 border-b border-gray-100">
							<div className="flex items-center gap-3 mb-4">
								<LayoutTemplate className="w-5 h-5 text-green-700" />
								<h2 className="text-lg font-semibold text-gray-900">
									Post Metadata
								</h2>
							</div>

							<div className="space-y-6">
								<div>
									<Label htmlFor="title" className="text-gray-700 mb-2 block">
										Title*
									</Label>
									<Input
										id="title"
										name="title"
										value={post.title}
										onChange={handleChange}
										className="h-12 text-base focus:ring-2 focus:ring-green-700"
										placeholder="Enter post title..."
										required
									/>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									<div>
										<Label className="text-gray-700 mb-2 block">
											Category*
										</Label>
										<Select
											value={post.category}
											onValueChange={(value) =>
												setPost((prev) =>
													prev
														? { ...prev, category: value as PostCategory }
														: null
												)
											}
											required
										>
											<SelectTrigger className="h-12">
												<SelectValue placeholder="Select category" />
											</SelectTrigger>
											<SelectContent>
												{Object.values(PostCategory).map((category) => (
													<SelectItem
														key={category}
														value={category}
														className="flex items-center gap-3 py-3"
													>
														<span className="w-2 h-2 rounded-full bg-green-600" />
														<span className="font-medium">
															{category
																.split("_")
																.map(
																	(word) =>
																		word.charAt(0).toUpperCase() +
																		word.slice(1).toLowerCase()
																)
																.join(" ")}
														</span>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div>
										<Label className="text-gray-700 mb-2 flex items-center gap-2">
											<ImageIcon className="w-5 h-5 text-green-700" />
											Featured Image
										</Label>
										<FileUpload
											value={post.featured_image || ""}
											onChange={(url) =>
												setPost((prev) =>
													prev ? { ...prev, featured_image: url } : null
												)
											}
											accept="image/*"
											maxSize={5 * 1024 * 1024}
											variant="image"
											preview
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Content Section */}
						<div className="p-6 space-y-6 border-b border-gray-100">
							<div className="flex items-center gap-3 mb-4">
								<FileText className="w-5 h-5 text-green-700" />
								<h2 className="text-lg font-semibold text-gray-900">
									Post Content*
								</h2>
							</div>

							<div>
								<Textarea
									id="content"
									name="content"
									value={post.content}
									onChange={handleChange}
									rows={12}
									className="text-base leading-relaxed focus:ring-2 focus:ring-green-700"
									placeholder="Write your post content here..."
									required
								/>
							</div>

							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<Label className="text-gray-700 mb-2 block">
										File Attachment
									</Label>
									<FileUpload
										value={post.file_attachment || ""}
										onChange={(url) =>
											setPost((prev) =>
												prev ? { ...prev, file_attachment: url } : null
											)
										}
										accept="application/pdf,.doc,.docx"
										maxSize={10 * 1024 * 1024}
										variant="file"
										preview
									/>
								</div>
							</div>
						</div>

						{/* Career Details Section */}
						{post.category === "CAREER" && (
							<div className="p-6 space-y-6">
								<div className="flex items-center gap-3 mb-4">
									<Briefcase className="w-5 h-5 text-green-700" />
									<h2 className="text-lg font-semibold text-gray-900">
										Position Details
									</h2>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									<div>
										<Label
											htmlFor="location"
											className="text-gray-700 mb-2 block"
										>
											<MapPin className="w-4 h-4 inline-block mr-2" />
											Location
										</Label>
										<Input
											id="location"
											name="location"
											value={post.location || ""}
											onChange={handleChange}
											className="focus:ring-2 focus:ring-green-700"
											placeholder="Enter location..."
										/>
									</div>

									<div>
										<Label
											htmlFor="deadline"
											className="text-gray-700 mb-2 block"
										>
											<CalendarDays className="w-4 h-4 inline-block mr-2" />
											Application Deadline
										</Label>
										<Input
											id="deadline"
											name="deadline"
											value={post.deadline?.split(".")[0] || ""}
											onChange={handleChange}
											type="datetime-local"
											className="[&::-webkit-calendar-picker-indicator]:invert-[.35] focus:ring-2 focus:ring-green-700"
										/>
									</div>

									<div className="md:col-span-2">
										<Label
											htmlFor="apply_url"
											className="text-gray-700 mb-2 block"
										>
											<Globe className="w-4 h-4 inline-block mr-2" />
											Application URL
										</Label>
										<Input
											id="apply_url"
											name="apply_url"
											value={post.apply_url || ""}
											onChange={handleChange}
											placeholder="https://example.com/apply"
											type="url"
											className="focus:ring-2 focus:ring-green-700"
										/>
									</div>
								</div>
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
