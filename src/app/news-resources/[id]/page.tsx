"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
	AlertCircle,
	Eye,
	EyeOff,
	Edit,
	Clock,
	MapPin,
	Calendar,
	User,
	ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BlogPost, PostStatus } from "@prisma/client";


export default function PostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const postId = React.use(Promise.resolve(params.id as string));

  const [post, setPost] = React.useState<(BlogPost & { author: { username: string } }) | null>(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [isAdmin, setIsAdmin] = React.useState(false);
	const [isUpdating, setIsUpdating] = React.useState(false);
	const [updateError, setUpdateError] = React.useState<string | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [imageError, setImageError] = React.useState(false);
	const [relatedPosts, setRelatedPosts] = React.useState<BlogPost[]>([]);
	const [relatedPostsLoading, setRelatedPostsLoading] = React.useState(true);
	const [relatedPostsError, setRelatedPostsError] = React.useState<string | null>(null);

	React.useEffect(() => {
		const fetchPost = async () => {
			try {
				if (!postId) {
					router.push("/news-resources");
					return;
				}

				const [postRes, authRes] = await Promise.all([
					fetch(`/api/posts/${postId}`, { credentials: "include" }),
					fetch("/api/auth/check", { credentials: "include" }),
				]);

				setIsAdmin(authRes.ok);

				if (!postRes.ok) {
					const errorData = await postRes.json();
					throw new Error(errorData.error || "Failed to fetch post");
				}

				const data = await postRes.json();
				setPost(data.post);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error loading post");
			} finally {
				setIsLoading(false);
			}
		};

		fetchPost();
	}, [postId, router]);

	React.useEffect(() => {
		const fetchRelatedPosts = async () => {
			if (!post) return;
			
			setRelatedPostsLoading(true);
			try {
				const res = await fetch(`/api/posts?category=${post.category}&exclude=${post.id}&limit=3`, {
					credentials: "include"
				});
				
				if (!res.ok) {
					throw new Error("Failed to fetch related posts");
				}

				const data = await res.json();
				setRelatedPosts(data.posts);
			} catch (err) {
				setRelatedPostsError(err instanceof Error ? err.message : "Error loading related posts");
			} finally {
				setRelatedPostsLoading(false);
			}
		};

		fetchRelatedPosts();
	}, [post]);

	const handleStatusChange = async (newStatus: PostStatus) => {
		if (!post || isUpdating) return;
		setIsUpdating(true);
		setUpdateError(null);

		try {
			const res = await fetch(`/api/posts/${postId}/status`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status: newStatus }),
				credentials: "include",
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Failed to update status");
			}

			const data = await res.json();
			setPost(data.post);
		} catch (err) {
			setUpdateError(
				err instanceof Error ? err.message : "Error updating status"
			);
		} finally {
			setIsUpdating(false);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800" />
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
					<p className="text-red-600 mb-4">{error || "Post not found"}</p>
					<Link href="/news-resources">
						<Button variant="outline">Back to News & Resources</Button>
					</Link>
				</div>
			</div>
		);
	}

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-green-50 border-b border-gray-200"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="py-8 sm:py-12">
            <Link href="/news-resources">
              <Button
                variant="ghost"
                className="mb-8 group flex items-center gap-2 text-gray-800 bg-white hover:bg-green-100 transition-colors"
              >
                <span className="group-hover:-translate-x-1 transition-transform">
                  ←
                </span>
                Back to News & Resources
              </Button>
            </Link>

            {/* Article Header */}
            <motion.header 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-6 pb-8"
            >
              <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
                <h1 className="text-3xl sm:text-4xl font-black text-primary leading-tight tracking-tight">
                  {post.title}
                </h1>
                {isAdmin && (
                  <div className="flex sm:flex-col gap-2 sm:gap-1 justify-end">
                    {/* Keep admin controls */}
										{updateError && (
											<p className="text-red-500 text-sm">{updateError}</p>
										)}
										<Button
											onClick={() =>
												handleStatusChange(
													post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"
												)
											}
											className="text-sm h-8 px-3 gap-1.5"
										>
											{isUpdating ? (
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
											) : post.status === "PUBLISHED" ? (
												<Eye className="w-4 h-4" />
											) : (
												<EyeOff className="w-4 h-4" />
											)}
											<span className="sr-only sm:not-sr-only">
												{post.status === "PUBLISHED" ? "Published" : "Draft"}
											</span>
										</Button>
										<Link href={`/admin/posts/${post.id}/edit`}>
											<Button
												variant="ghost"
												className="h-8 px-3 gap-1.5 text-sm text-gray-800 hover:text-primary"
											>
												<Edit className="w-4 h-4" />
												<span className="sr-only sm:not-sr-only">Edit</span>
											</Button>
										</Link>
                  </div>
                )}
              </div>

              {/* Meta Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm font-medium text-gray-800">
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                  <User className="w-5 h-5 text-primary" />
                  <span>{post.author.username}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                {post.status === "PUBLISHED" && post.published_at && (
                  <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="p-3 bg-primary text-white rounded-lg shadow-sm">
                  {post.category
                    .split("_")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </div>
              </div>
            </motion.header>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-12">
        {/* Featured Image */}
        {post.featured_image && !imageError && (
          <motion.figure
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-xl mb-12 border border-emerald-50"
          >
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </motion.figure>
        )}

        {/* Article Content */}
        <motion.article 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-lg max-w-none
            prose-headings:font-semibold prose-headings:text-emerald-900
            prose-a:text-emerald-700 prose-a:underline hover:prose-a:text-emerald-900
            prose-blockquote:border-l-emerald-700 prose-blockquote:text-emerald-800
            prose-strong:text-emerald-900"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </motion.article>

        {/* Career Details Card */}
        {post.category === "CAREER" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 p-8 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <span className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </span>
              Position Details
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {post.location && (
                <div className="space-y-2">
                  <h3 className="font-medium text-green-900">Location</h3>
                  <p className="text-primary">{post.location}</p>
                </div>
              )}
              
              {post.deadline && (
                <div className="space-y-2">
                  <h3 className="font-medium text-green-900">Application Deadline</h3>
                  <p className="text-emerald-700">
                    {new Date(post.deadline).toLocaleDateString()}
                  </p>
                </div>
              )}
              
              {post.apply_url && (
                <div className="md:col-span-2">
                  <Button
                    asChild
                    className="w-full gap-3 bg-primary h-14 text-lg"
                  >
                    <a href={post.apply_url} target="_blank" rel="noopener noreferrer">
                      <span>Apply Now</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Related Posts */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <h3 className="text-xl font-semibold text-primary mb-6">
            More Recent Updates
          </h3>
          
          {relatedPostsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="bg-emerald-100/50 rounded-lg aspect-video w-full" />
                  <div className="space-y-2">
                    <div className="h-4 bg-emerald-100/50 rounded w-3/4" />
                    <div className="h-4 bg-emerald-100/50 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : relatedPostsError ? (
            <p className="text-red-600">{relatedPostsError}</p>
          ) : relatedPosts.length === 0 ? (
            <p className="text-green-700">No related posts found.</p>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  href={`/news-resources/${relatedPost.id}`}
                  className="group"
                >
                  <motion.article 
                    initial={{ scale: 0.98 }}
                    whileHover={{ scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-emerald-50">
                      {relatedPost.featured_image && (
                        <Image
                          src={relatedPost.featured_image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary group-hover:text-green-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-green-600">
                        {new Date(relatedPost.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}