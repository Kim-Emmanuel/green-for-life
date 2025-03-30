import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";
import DOMPurify from "isomorphic-dompurify";
import { prisma } from "@/lib/db/client";

const resend = new Resend(process.env.RESEND_API_KEY);

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

const partnerSchema = z.object({
  organization: z.string().min(2, "Minimum 2 characters"),
  contactEmail: z.string().email("Invalid email address"),
  partnershipType: z.enum(["CORPORATE", "COMMUNITY", "RESEARCH"]),
  proposal: z.string().min(50, "Minimum 50 characters required"),
});

export async function POST(request: Request) {
  try {
    const rawData = await request.json();
    const parsedData = partnerSchema.parse(rawData);

    // Sanitize input
    const sanitizedData = {
      organization: DOMPurify.sanitize(parsedData.organization),
      contactEmail: DOMPurify.sanitize(parsedData.contactEmail),
      partnershipType: parsedData.partnershipType,
      proposal: DOMPurify.sanitize(parsedData.proposal),
    };

    // Save to database
    const partnership = await prisma.partnership.create({
      data: sanitizedData
    });

    // Send notification to admin
    const { error: adminEmailError } = await resend.emails.send({
      from: `Partnership Form <${process.env.SENDER_EMAIL}>`,
      to: [process.env.CONTACT_EMAIL!],
      subject: `New Partnership Proposal from ${sanitizedData.organization}`,
      replyTo: sanitizedData.contactEmail,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
          <h2>New Partnership Proposal</h2>
          <p><strong>Organization:</strong> ${sanitizedData.organization}</p>
          <p><strong>Contact Email:</strong> ${sanitizedData.contactEmail}</p>
          <p><strong>Partnership Type:</strong> ${sanitizedData.partnershipType}</p>
          <p><strong>Proposal:</strong></p>
          <div style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${sanitizedData.proposal}
          </div>
          <p><strong>Partner ID:</strong> ${partnership.id}</p>
        </body>
        </html>
      `,
    });

    // Send acknowledgment to partner
    const { error: partnerEmailError } = await resend.emails.send({
      from: `Green For Life <${process.env.SENDER_EMAIL}>`,
      to: [sanitizedData.contactEmail],
      subject: "Thank you for your partnership interest with Green For Life",
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
          <h2>Thank You for Your Interest in Partnering with Green For Life</h2>
          <p>Dear ${sanitizedData.organization},</p>
          <p>Thank you for submitting your partnership proposal. We're excited about the potential collaboration opportunity!</p>
          <p>Our team will review your proposal and get back to you within 2-3 business days to discuss the next steps.</p>
          <p>Partnership Details:</p>
          <ul>
            <li>Organization: ${sanitizedData.organization}</li>
            <li>Partnership Type: ${sanitizedData.partnershipType}</li>
            <li>Reference ID: ${partnership.id}</li>
          </ul>
          <p>If you have any immediate questions, please don't hesitate to reply to this email.</p>
          <p>Best regards,<br>The Green For Life Partnership Team</p>
        </body>
        </html>
      `,
    });

    if (adminEmailError || partnerEmailError) {
      console.error("Email error:", adminEmailError || partnerEmailError);
      // Return success since we saved to database
      return NextResponse.json({ 
        success: true, 
        partnership,
        emailError: "Some email notifications failed to send"
      }, { 
        status: 200,
        headers: corsHeaders 
      });
    }

    return NextResponse.json({ 
      success: true, 
      partnership 
    }, { 
      status: 200,
      headers: corsHeaders 
    });

  } catch (error) {
    console.error("Server error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 422, headers: corsHeaders }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}