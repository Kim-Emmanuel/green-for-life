// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import DOMPurify from "isomorphic-dompurify";

const resend = new Resend(process.env.RESEND_API_KEY);

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const subscriptionSchema = z.object({
  email: z.string().email("Invalid email address")
});

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const rawData = await request.json();
    const parsedData = subscriptionSchema.parse(rawData);

    // Sanitize input
    const sanitizedEmail = DOMPurify.sanitize(parsedData.email);

    // Send confirmation to admin
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: `Newsletter Subscription <${process.env.SENDER_EMAIL}>`,
      to: [process.env.CONTACT_EMAIL!],
      subject: `New Newsletter Subscription`,
      replyTo: sanitizedEmail,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
          <h2>New Newsletter Subscription</h2>
          <p>A new user has subscribed to the newsletter:</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
        </body>
        </html>
      `,
    });

    // Send welcome email to subscriber
    const { data: subscriberData, error: subscriberError } = await resend.emails.send({
      from: `Green For Life <${process.env.SENDER_EMAIL}>`,
      to: [sanitizedEmail],
      subject: `Welcome to Green For Life Newsletter!`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
          <h2>Welcome to Green For Life!</h2>
          <p>Thank you for subscribing to our newsletter. You'll now receive updates about our latest initiatives and events.</p>
          <p>We're excited to have you join our community of environmental enthusiasts!</p>
          <p>Best regards,<br>The Green For Life Team</p>
        </body>
        </html>
      `,
    });

    if (adminError || subscriberError) {
      console.error("Resend error:", adminError || subscriberError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: adminData }, { status: 200 });
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