import { z } from 'zod';
import { User as PrismaUser, Role } from '@prisma/client';

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password_hash: z.string().min(8),
  role: z.nativeEnum(Role),
  created_at: z.date(),
  updated_at: z.date(),
}) satisfies z.ZodType<PrismaUser>;

// Schema for safe user data (without sensitive information)
export const safeUserSchema = userSchema.omit({ 
  password_hash: true 
});

// Schema for authentication responses
export const authResponseSchema = safeUserSchema.pick({
  id: true,
  username: true,
  email: true,
  role: true
}).extend({
  token: z.string()
});

// Schema for user registration
export const registerSchema = userSchema.pick({
  username: true,
  email: true
}).extend({
  password: z.string().min(8)
});

// Schema for user login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const blogPostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(5),
  content: z.string().min(10),
  author_id: z.string().uuid(),
  published_at: z.date().nullable(),
  featured_image_url: z.string().url().nullable(),
  category: z.enum(['BLOG', 'NEWS', 'IMPACT_STORY']),
  created_at: z.date()
});

export const newsletterSubscriptionSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  subscribed_at: z.date(),
  unsubscribed_at: z.date().nullable()
});

export const teamMemberSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  title: z.string(),
  bio: z.string(),
  photo_url: z.string().url(),
  joined_at: z.date()
});

export const contactFormSubmissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  submitted_at: z.date()
});

export const impactMetricSchema = z.object({
  id: z.string().uuid(),
  metric_name: z.string(),
  value: z.number(),
  updated_at: z.date()
});

export type User = z.infer<typeof userSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;
export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type ContactFormSubmission = z.infer<typeof contactFormSubmissionSchema>;
export type ImpactMetric = z.infer<typeof impactMetricSchema>;

export type UserSchema = z.infer<typeof userSchema>;
export type SafeUser = z.infer<typeof safeUserSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;