// app/api/send/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";
import DOMPurify from "isomorphic-dompurify";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email(),
	subject: z.string().max(100).optional(),
	message: z.string().min(10).max(1000),
	preferredContact: z.enum(["email", "phone"]).default("email"),
});

export async function POST(request: Request) {
	try {
		const rawData = await request.json();
		// Add safe parsing to get better error details
		const result = contactSchema.safeParse(rawData);

		if (!result.success) {
			return NextResponse.json(
				{
					error: "Validation failed",
					details: result.error.issues.map((issue) => ({
						field: issue.path.join("."),
						message: issue.message,
					})),
				},
				{ status: 422 }
			);
		}

		const parsedData = result.data;

		// Sanitize input
		const sanitizedData = {
			name: DOMPurify.sanitize(parsedData.name),
			email: DOMPurify.sanitize(parsedData.email),
			subject: parsedData.subject ? DOMPurify.sanitize(parsedData.subject) : "",
			message: DOMPurify.sanitize(parsedData.message),
			preferredContact: parsedData.preferredContact,
		};

		// Validate email format
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.email)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 }
			);
		}

		// Send email using Resend
		const { data, error } = await resend.emails.send({
			from: `Contact Form <${process.env.SENDER_EMAIL}>`,
			to: [process.env.CONTACT_EMAIL!],
			replyTo: sanitizedData.email,
			subject:
				sanitizedData.subject || `New message from ${sanitizedData.name}`,
			text: `
  Name: ${sanitizedData.name}
  Email: ${sanitizedData.email}
  Preferred Contact: ${sanitizedData.preferredContact}
  Message: ${sanitizedData.message}
  `,
			html: `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; padding: 0 20px;">
  <div style="background: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">
  <!-- Header with Logo -->
  <div style="background: #2B6A3C; padding: 32px 24px; text-align: center;">
  <div style="margin-bottom: 24px;">
  <!-- Responsive Logo -->
  <img src="${
		process.env.NEXT_PUBLIC_BASE_URL
	}/green-for-life.svg" alt="Green For Life" 
     style="width: 100%; max-width: 200px; height: auto; 
     @media (max-width: 480px) { max-width: 150px; }
     @media (min-width: 481px) and (max-width: 768px) { max-width: 180px; }"
  />
  </div>
  <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 600;">
  New Contact Request
  </h1>
  <p style="color: #e2e8f0; font-size: 16px; margin: 8px 0 0;">
  Message from ${sanitizedData.name}
  </p>
  </div>

  <!-- Content -->
  <div style="padding: 32px 24px;">
  <!-- Contact Info -->
  <div style="margin-bottom: 32px; background: #f1f7f3; border-radius: 12px; padding: 24px; border: 1px solid #dde9e2;">
  <div style="margin-bottom: 20px;">
    <div style="color: #2B6A3C; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Name</div>
    <div style="color: #1e293b; font-size: 16px; font-weight: 500;">${
			sanitizedData.name
		}</div>
  </div>
  
  <div style="margin-bottom: 20px;">
    <div style="color: #2B6A3C; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Email</div>
    <a href="mailto:${
			sanitizedData.email
		}" style="color: #2B6A3C; text-decoration: none; font-size: 16px; font-weight: 500;">
    ${sanitizedData.email}
    </a>
  </div>
  
  <div>
    <div style="color: #2B6A3C; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Preferred Contact</div>
    <div style="color: #1e293b; font-size: 16px; font-weight: 500;">
    ${sanitizedData.preferredContact}
    <span style="color: #64748b; font-size: 14px; margin-left: 4px;">
    (${sanitizedData.preferredContact === "email" ? "Preferred" : "Alternate"})
    </span>
    </div>
  </div>
  </div>

  <!-- Message -->
  <div>
  <div style="color: #2B6A3C; font-size: 14px; font-weight: 600; margin-bottom: 12px;">Message</div>
  <div style="color: #334155; font-size: 16px; line-height: 1.6; background: #f1f7f3; padding: 20px; border-radius: 12px; white-space: pre-wrap; border: 1px solid #dde9e2;">
    ${sanitizedData.message}
  </div>
  </div>
  </div>

  <!-- Footer -->
  <div style="border-top: 1px solid #dde9e2; padding: 24px; text-align: center; background: #f8faf9;">
  <p style="color: #6B7280; font-size: 12px; line-height: 1.5; margin: 0 0 15px;">
        This message was sent from the contact form on Green For Life<br>
        <span style="color: #2B6A3C; font-size: 13px;">🌱 Committed to Sustainable Living</span>
      </p>
  <div style="color: #64748b; font-size: 12px;">
  <p style="margin: 0 0 8px;">© ${new Date().getFullYear()} Green For Life. All rights reserved.</p>
  <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 16px; margin: 0 auto;">
    <a href="https://greenforlife.com" style="color: #2B6A3C; text-decoration: none; font-weight: 500; display: inline-block;">Website</a>
    <a href="mailto:support@greenforlife.com" style="color: #2B6A3C; text-decoration: none; font-weight: 500; display: inline-block;">Support</a>
    <a href="tel:+1234567890" style="color: #2B6A3C; text-decoration: none; font-weight: 500; display: inline-block;">Contact</a>
  </div>
  </div>
  </div>
  </div>
  </div>
  </body>
  </html>
  `,
		});

		if (error) {
			console.error("Resend error:", error);
			return NextResponse.json(
				{ error: "Failed to send email" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (error) {
		console.error("Server error:", error);

		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: "Validation failed", details: error.errors },
				{ status: 422 }
			);
		}

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
