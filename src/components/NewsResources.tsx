"use client";

import { useState, useEffect, useRef } from "react";
import type { JSX } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
	Book,
	Newspaper,
	Award,
	Briefcase,
	Filter,
	ArrowDown,
	ArrowUp,
	Plus,
	AlertCircle,
	LogOut,
	LogIn,
	UserCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { smoothScroll } from "@/lib/utils";
import { PostCategory } from "@prisma/client";

type Post = {
	id: string;
	title: string;
	content: string;
	status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
	category: PostCategory;
	featured_image?: string;
	file_attachment?: string;
	apply_url?: string;
	location?: string;
	deadline?: string;
	created_at: string;
	published_at?: string;
	author: {
		username: string;
		email: string;
	};
};

export default function NewsResources() {
	const router = useRouter();
	const [posts, setPosts] = useState<Post[]>([]);
	const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
	const [activeCategory, setActiveCategory] = useState<PostCategory>("BLOG");
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	const [isAdmin, setIsAdmin] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
	const [user, setUser] = useState<{ username: string; role: string } | null>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const handleScroll = (direction: "left" | "right") => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const cardWidth = 320;
		const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
		const newPosition = Math.max(
			0,
			Math.min(
				container.scrollWidth - container.clientWidth,
				container.scrollLeft + scrollAmount
			)
		);

		container.scrollTo({
			left: newPosition,
			behavior: "smooth",
		});
	};

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => handleScroll("right"),
		onSwipedRight: () => handleScroll("left"),
		trackMouse: true,
	});

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const res = await fetch("/api/auth/check", { credentials: "include" });
				if (res.ok) {
					const data = await res.json();
					setUser(data.user);
					setIsAdmin(data.user.role === "ADMIN");
				} else {
					setUser(null);
					setIsAdmin(false);
				}
			} catch {
				setUser(null);
				setIsAdmin(false);
			}
		};
		checkAuthStatus();
	}, []);

	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			setError(null);
			setImageErrors({});

			try {
				const res = await fetch(`/api/posts?category=${activeCategory}`);
				if (!res.ok) throw new Error("Failed to fetch posts");
				const data = await res.json();
				setPosts(data.posts);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error fetching posts");
			} finally {
				setIsLoading(false);
			}
		};

		fetchPosts();
	}, [activeCategory]);

	useEffect(() => {
		const fetchFeaturedPosts = async () => {
			setIsLoading(true);
			try {
				const res = await fetch("/api/posts?featured=true");
				if (!res.ok) throw new Error("Failed to fetch featured posts");
				const data = await res.json();
				setFeaturedPosts(data.posts);
			} catch (err) {
				console.error("Error fetching featured posts:", err);
				setFeaturedPosts([]);
			} finally {
				setIsLoading(false);
			}
		};
		fetchFeaturedPosts();
	}, []);

	const handleCategoryChange = (category: PostCategory) => {
		setActiveCategory(category);
		smoothScroll(`#${category.toLowerCase()}-section`, 80);
	};

	const handleImageError = (postId: string) => {
		setImageErrors((prev) => ({ ...prev, [postId]: true }));
	};

	const handleLogout = async () => {
		document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		setUser(null);
		setIsAdmin(false);
		router.refresh();
	};

	// Filter and search content
	const filteredPosts = posts.filter((post) =>
		post.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Sort content by date
	const sortedPosts = filteredPosts.sort((a, b) => {
		const dateA = new Date(a.created_at).getTime();
		const dateB = new Date(b.created_at).getTime();
		return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
	});

	const categoryIcons: Record<PostCategory, JSX.Element> = {
		BLOG: <Newspaper className="mr-2 w-6 h-6" />,
		PUBLICATION: <Book className="mr-2 w-6 h-6" />,
		IMPACT_STORY: <Award className="mr-2 w-6 h-6" />,
		TENDER: <Filter className="mr-2 w-6 h-6" />,
		CAREER: <Briefcase className="mr-2 w-6 h-6" />,
	};

	if (error) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
					<p className="text-red-600 mb-4">{error}</p>
					<Button
						onClick={() => window.location.reload()}
						variant="outline"
						className="mx-auto"
					>
						Try Again
					</Button>
				</div>
			</div>
		);
	}
	if (isLoading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white relative">
			{/* Auth Section */}
			<div className="py-4 bg-green-50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
					{user ? (
						<div className="flex items-center gap-4 bg-white rounded-lg p-2 shadow-sm">
							<div className="flex items-center gap-2">
								<span className="text-green-700 flex items-center">
									<UserCircle className="w-5 h-5 mr-1" />
									{user.username}
									{isAdmin && (
										<span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
											Admin
										</span>
									)}
								</span>
								<Button
									variant="ghost"
									size="sm"
									onClick={handleLogout}
									className="text-gray-600 hover:text-gray-900 rounded-full"
								>
									<LogOut className="w-4 h-4" />
								</Button>
							</div>
							{isAdmin && (
								<Button
									onClick={() => router.push("/admin/posts")}
									className="text-white h-9 px-4"
								>
									<Plus className="w-4 h-4 mr-1" />
									New Post
								</Button>
							)}
						</div>
					) : (
						<Button
							variant="default"
							size="sm"
							onClick={() => router.push("/login")}
							className="text-white px-4"
						>
							<LogIn className="w-4 h-4 mr-1" />
							Login
						</Button>
					)}
				</div>
			</div>

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
							News & Resources
						</motion.h1>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							className="max-w-2xl mx-auto text-[clamp(1rem,1.5vw,1.25rem)] text-green-800 leading-relaxed mb-10 font-medium px-4 sm:px-0"
						>
								Discover impactful stories, innovative solutions, and
								opportunities to drive environmental transformation.
						</motion.p>
					</motion.div>

					{/* Animated Interactive Buttons */}
					<motion.div
						className="flex justify-center gap-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7 }}
					>
						<motion.button
							whileHover={{ y: -2 }}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200/50 transition-colors"
						>
							Explore Updates
						</motion.button>
						<motion.button
							whileHover={{ y: -2 }}
							whileTap={{ scale: 0.95 }}
							className="px-8 py-3.5 border-2 border-green-700 text-primary font-semibold rounded-xl bg-white/90 hover:bg-white transition-colors"
						>
							Get Involved
						</motion.button>
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

			{/* Featured Content Section */}
			<section
				className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
				aria-labelledby="featured-content-heading"
			>
				<h2
					id="featured-content-heading"
					className="text-3xl font-bold text-green-800 mb-8"
				>
					Featured Content
				</h2>

				{/* Featured Post - Most Recent */}
				<div className="mb-12">
					{featuredPosts.slice(0, 1).map((post) => (
						<Link
							key={post.id}
							href={`/news-resources/${post.id}`}
							className="block group"
						>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
								aria-label={`Featured post: ${post.title}`}
							>
								{post.featured_image && !imageErrors[post.id] && (
									<div className="relative w-full h-64 sm:h-96 overflow-hidden">
										<Image
											src={post.featured_image}
											alt={post.title}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-105"
											onError={() => handleImageError(post.id)}
											sizes="(max-width: 768px) 100vw, 100vw"
											priority
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<div className="absolute bottom-0 left-0 right-0 p-6">
												<p className="text-white text-lg line-clamp-3">
													{post.content}
												</p>
											</div>
										</div>
									</div>
								)}
								<div className="p-6">
									<div className="flex items-center text-sm text-gray-500 mb-2">
										<span>
											{new Date(post.created_at).toLocaleDateString()}
										</span>
										<span className="mx-2">•</span>
										<span>By {post.author.username}</span>
									</div>
									<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
										{post.title}
									</h2>
									<span className="inline-flex items-center text-green-600 group-hover:text-green-800 font-semibold transition-colors">
										Read More
										<svg
											className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</span>
								</div>
							</motion.div>
						</Link>
					))}
				</div>

				{/* Horizontal Scroll Section */}
				{featuredPosts.length > 1 && (
					<div className="relative" aria-label="Additional blog posts">
						{/* Navigation Arrows */}
						<div className="hidden md:block">
							<button
								onClick={() => handleScroll("left")}
								className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-md -translate-x-1/2"
								aria-label="Scroll posts left"
							>
								<svg
									className="w-6 h-6 text-gray-700"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
							<button
								onClick={() => handleScroll("right")}
								className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-md translate-x-1/2"
								aria-label="Scroll posts right"
							>
								<svg
									className="w-6 h-6 text-gray-700"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</div>

						<div
							{...swipeHandlers}
							ref={scrollContainerRef}
							className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide"
						>
							{featuredPosts.slice(1).map((post) => (
								<Link
									key={post.id}
									href={`/news-resources/${post.id}`}
									className="block group flex-shrink-0 w-72 sm:w-80"
								>
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.5 }}
										className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full"
										role="article"
										aria-label={`Blog post: ${post.title}`}
									>
										{post.featured_image && !imageErrors[post.id] && (
											<div className="relative w-full h-48 sm:h-56 overflow-hidden">
												<Image
													src={post.featured_image}
													alt={post.title}
													fill
													className="object-cover transition-transform duration-300 group-hover:scale-105"
													onError={() => handleImageError(post.id)}
													sizes="(max-width: 768px) 50vw, 33vw"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
													<div className="absolute bottom-0 left-0 right-0 p-4">
														<p className="text-white text-sm line-clamp-3">
															{post.content}
														</p>
													</div>
												</div>
											</div>
										)}
										<div className="p-4">
											<div className="flex items-center text-xs text-gray-500 mb-2">
												<span>
													{new Date(post.created_at).toLocaleDateString()}
												</span>
												<span className="mx-2">•</span>
												<span>By {post.author.username}</span>
											</div>
											<h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
												{post.title}
											</h3>
											<span className="inline-flex items-center text-green-600 group-hover:text-green-800 text-sm font-semibold transition-colors">
												Read More
												<svg
													className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</span>
										</div>
									</motion.div>
								</Link>
							))}
						</div>
					</div>
				)}
			</section>

			{/* Content Navigation */}
			<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex justify-between items-center mb-8">
					<div className="flex items-center gap-4">
						<div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
							{Object.entries(categoryIcons).map(([category, icon]) => (
								<Button
									key={category}
									onClick={() => handleCategoryChange(category as PostCategory)}
									className={`
                    flex items-center px-4 py-2 rounded-full transition-all
                    ${
											activeCategory === category
												? "bg-primary text-white font-medium shadow-lg"
												: "bg-green-50 text-primary font-medium hover:bg-green-100"
										}
                  `}
								>
									{icon}
									{category
										.split("_")
										.map(
											(word) =>
												word.charAt(0).toUpperCase() +
												word.slice(1).toLowerCase()
										)
										.join(" ")}
								</Button>
							))}
						</div>
						{isAdmin && (
							<Button
								onClick={() => router.push("/admin/posts")}
								className="text-white flex items-center gap-2"
							>
								<Plus className="w-4 h-4" />
								Create Post
							</Button>
						)}
					</div>
					<Button
						onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
						className="flex items-center px-4 py-2 bg-green-50 text-primary rounded-full hover:bg-green-100"
					>
						{sortOrder === "asc" ? (
							<>
								<ArrowUp className="mr-2 w-4 h-4" />
								Oldest First
							</>
						) : (
							<>
								<ArrowDown className="mr-2 w-4 h-4" />
								Newest First
							</>
						)}
					</Button>
				</div>

				{/* Search Input */}
				<div className="max-w-md mx-auto mb-8">
					<input
						type="text"
						placeholder={`Search ${activeCategory
							.split("_")
							.map(
								(word) =>
									word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
							)
							.join(" ")}`}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full px-4 py-2 border border-green-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-800"
					/>
				</div>

				{/* Content Grid */}
				<div className="grid md:grid-cols-3 gap-8">
					{isLoading ? (
						<div className="col-span-3 text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto"></div>
						</div>
					) : sortedPosts.length === 0 ? (
						<div className="col-span-3 text-center py-12">
							<p className="text-gray-500 mb-4">
								No posts found in this category.
							</p>
							{isAdmin && (
								<Button
									onClick={() => router.push("/admin/posts")}
									className="text-white"
								>
									<Plus className="w-4 h-4 mr-2" />
									Create First Post
								</Button>
							)}
						</div>
					) : (
						sortedPosts.map((post) => (
							<Link
								key={post.id}
								href={`/news-resources/${post.id}`}
								className="block group"
							>
								<motion.div
									id={`${post.category.toLowerCase()}-section`}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
									className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full"
								>
									{post.featured_image && !imageErrors[post.id] && (
										<div className="relative w-full h-48">
											<Image
												src={post.featured_image}
												alt={post.title}
												fill
												className="object-cover transition-transform duration-300 group-hover:scale-105"
												onError={() => handleImageError(post.id)}
												sizes="(max-width: 768px) 100vw, 33vw"
											/>
										</div>
									)}
									<div className="p-6">
										<div className="flex items-center text-sm text-gray-500 mb-2">
											<span>
												{new Date(post.created_at).toLocaleDateString()}
											</span>
											<span className="mx-2">•</span>
											<span>By {post.author.username}</span>
										</div>
										<h2 className="text-xl font-bold text-primary mb-4 group-hover:text-green-600 transition-colors">
											{post.title}
										</h2>
										<p className="text-gray-700 mb-4">
											{post.content.slice(0, 150)}...
										</p>
										<span className="text-[#55B948] group-hover:text-primary font-semibold inline-flex items-center">
											Read More
											<svg
												className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</span>
									</div>
								</motion.div>
							</Link>
						))
					)}
				</div>
			</section>

			<section className="relative h-[500px] w-full overflow-hidden">
				{/* Background image with overlay */}
				<div
					className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop')] bg-cover bg-center"
					aria-hidden="true"
				>
					<div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
				</div>

				{/* Content container */}
				<div className="relative flex h-full w-full items-center justify-center p-6">
					<div className="max-w-2xl text-center">
						<h2 className="text-4xl font-bold text-white sm:text-5xl">
							Stay Updated with Our Newsletter
						</h2>
						<p className="mx-auto mt-4 max-w-xl text-lg text-gray-200">
							Subscribe to receive the latest news, exclusive offers, and
							special announcements directly in your inbox.
						</p>

						{/* Subscription form */}
						<form
							// onSubmit={handleSubmit}
							className="mt-8 sm:mx-auto sm:max-w-md"
						>
							<div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
								<input
									type="email"
									placeholder="Enter your email address"
									className="w-full rounded-lg border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:rounded-r-none sm:text-lg"
									required
								/>
								<button
									type="submit"
									className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:rounded-l-none sm:text-lg"
								>
									Subscribe
								</button>
							</div>
						</form>

						<p className="mt-3 text-sm text-gray-300">
							We respect your privacy. Unsubscribe at any time.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
