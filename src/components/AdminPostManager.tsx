"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { PostCategory } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { FileUpload } from "./FileUpload";

type PostFormData = {
	title: string;
	content: string;
	category: PostCategory;
	featured_image?: string;
	file_attachment?: string;
	apply_url?: string;
	location?: string;
	deadline?: string;
	status: "DRAFT" | "PUBLISHED";
};

const initialFormData: PostFormData = {
	title: "",
	content: "",
	category: "BLOG" as PostCategory,
	featured_image: "",
	file_attachment: "",
	apply_url: "",
	location: "",
	deadline: "",
	status: "PUBLISHED",
};

export default function AdminPostManager() {
const router = useRouter();
	const [formData, setFormData] = useState<PostFormData>(initialFormData);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showPreview, setShowPreview] = useState(false);

	const formatDateForSubmission = (dateValue: string | Date | null | undefined) => {
		if (!dateValue) return undefined;
		
		if (dateValue instanceof Date) {
			return dateValue.toISOString();
		}
		
		try {
			const date = new Date(dateValue);
			if (!isNaN(date.getTime())) {
				return date.toISOString();
			}
		} catch (e) {
			console.error("Error formatting date:", e);
		}
		
		return undefined;
	};

	const validateUrl = (url?: string) => {
		if (!url) return undefined;
		try {
			new URL(url);
			return url;
		} catch {
			return undefined;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			const formDataToSubmit = {
				...formData,
				deadline: formatDateForSubmission(formData.deadline),
				apply_url: validateUrl(formData.apply_url),
				file_attachment: validateUrl(formData.file_attachment)
			};
			
			console.log("Submitting post data:", formDataToSubmit);
			const res = await fetch("/api/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formDataToSubmit),
				credentials: "include",
			});

			const data = await res.json();
			console.log("Server response:", {
				status: res.status,
				data
			});

			if (!res.ok) {
				throw new Error(data.error || `Error: ${res.status} ${res.statusText}`);
			}

			console.log("Post created successfully:", data.post);
			router.push(`/news-resources/${data.post.id}`);
		} catch (err) {
			console.error("Error in handleSubmit:", err);
			setError(err instanceof Error ? err.message : "Error creating post");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Creator</h1>
          <p className="text-muted-foreground mt-2">
            Craft engaging content for your organization&apos;s news & resources
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="preview" className="text-sm text-muted-foreground">
            Live Preview
          </Label>
          <Switch
            id="preview"
            checked={showPreview}
            onCheckedChange={setShowPreview}
            className="data-[state=checked]:bg-green-600"
          />
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50/80 backdrop-blur-sm p-4 rounded-lg border border-red-200 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-700">{error}</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 relative">
        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Post Details
              </h2>
              <span className="text-sm text-muted-foreground">
                {formData.status === "DRAFT" ? "Draft" : "Published"}
              </span>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-sm font-medium mb-2">
                  Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-sm font-medium mb-2">
                  Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: value as PostCategory,
                    }))
                  }
                >
                  <SelectTrigger className="w-full focus:ring-2 focus:ring-green-500">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PostCategory).map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="focus:bg-green-50"
                      >
                        {category
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content" className="text-sm font-medium mb-2">
                  Content *
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={8}
                  required
                  className="focus:ring-2 focus:ring-green-500 min-h-[200px]"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Media & Attachments
            </h2>
            <div className="space-y-6">
              <FileUpload
                label="Featured Image"
                value={formData.featured_image || ""}
                onChange={(url) =>
                  setFormData((prev) => ({ ...prev, featured_image: url }))
                }
                accept="image/*"
                maxSize={5 * 1024 * 1024}
                className="border-2 border-dashed border-green-100 hover:border-green-300 transition-colors"
              />
              
              <div>
                <Label
                  htmlFor="file_attachment"
                  className="text-sm font-medium mb-2"
                >
                  File Attachment
                </Label>
                <Input
                  id="file_attachment"
                  name="file_attachment"
                  value={formData.file_attachment || ""}
                  onChange={handleChange}
                  type="url"
                  placeholder="https://example.com/document.pdf"
                  className="focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </section>

          {formData.category === "CAREER" && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Career Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="apply_url" className="text-sm font-medium mb-2">
                    Application URL
                  </Label>
                  <Input
                    id="apply_url"
                    name="apply_url"
                    value={formData.apply_url || ""}
                    onChange={handleChange}
                    type="url"
                    className="focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-sm font-medium mb-2">
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    className="focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="deadline" className="text-sm font-medium mb-2">
                    Application Deadline
                  </Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    value={formData.deadline || ""}
                    onChange={handleChange}
                    type="datetime-local"
                    className="focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </motion.section>
          )}

          <div className="sticky bottom-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl border shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status === "PUBLISHED"}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: checked ? "PUBLISHED" : "DRAFT",
                    }))
                  }
                  className="data-[state=checked]:bg-green-600"
                />
                <Label htmlFor="status" className="text-sm text-muted-foreground">
                  {formData.status === "DRAFT" ? "Save as Draft" : "Publish Now"}
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white h-12 px-8 text-base transition-transform hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </div>
        </form>

        <AnimatePresence>
          {showPreview && (
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-xl border lg:sticky lg:top-8 h-fit shadow-lg"
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Preview
                </h2>
                <article className="prose prose-green max-w-none">
                  {/* Preview content */}
                  {formData.featured_image && (
										<div className="mb-6 rounded-lg overflow-hidden relative">
											<Image
												src={formData.featured_image}
												alt="Preview"
												width={800}
												height={400}
												className="w-full h-48 object-cover"
												onError={(e) => {
													const img = e.currentTarget;
													if (!img.src.startsWith('/')) {
														img.src = `/${img.src.split('/').pop()}`; // Try relative path if absolute fails
													}
												}}
											/>
										</div>
									)}
									<h1 className="text-2xl font-bold text-gray-900 mb-4">
										{formData.title || "Untitled Post"}
									</h1>
									<div className="flex items-center text-sm text-gray-500 mb-4">
										<span>{new Date().toLocaleDateString()}</span>
										<span className="mx-2">•</span>
										<span>
											{formData.category
												.split("_")
												.map(
													(word) =>
														word.charAt(0).toUpperCase() +
														word.slice(1).toLowerCase()
												)
												.join(" ")}
										</span>
									</div>
									<div className="mt-6 space-y-4 text-gray-700">
										{formData.content.split("\n").map((paragraph, index) => (
											<p key={index}>{paragraph}</p>
										))}
									</div>
									{formData.category === "CAREER" && (
										<div className="mt-8 bg-green-50 p-6 rounded-lg">
											<h3 className="text-lg font-semibold text-gray-900 mb-4">
												Position Details
											</h3>
											<dl className="grid grid-cols-2 gap-4">
												{formData.location && (
													<div>
														<dt className="text-sm font-medium text-gray-500">
															Location
														</dt>
														<dd className="text-gray-700">
															{formData.location}
														</dd>
													</div>
												)}
												{formData.deadline && (
													<div>
														<dt className="text-sm font-medium text-gray-500">
															Deadline
														</dt>
														<dd className="text-gray-700">
															{new Date(formData.deadline).toLocaleDateString(
																undefined,
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																	hour: "2-digit",
																	minute: "2-digit",
																}
															)}
														</dd>
													</div>
												)}
											</dl>
											{formData.apply_url && (
												<div className="mt-6">
													<Button asChild className="w-full">
														<a
															href={formData.apply_url}
															target="_blank"
															rel="noopener"
														>
															Apply Now
														</a>
													</Button>
												</div>
											)}
										</div>
									)}
									{formData.file_attachment && (
										<div className="mt-8">
											<Button asChild variant="outline" className="w-full">
												<a
													href={formData.file_attachment}
													target="_blank"
													rel="noopener"
												>
													Download Attachment
												</a>
											</Button>
										</div>
									)}
                </article>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}