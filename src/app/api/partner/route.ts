import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";
import DOMPurify from "isomorphic-dompurify";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { data, error } = await resend.emails.send({
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