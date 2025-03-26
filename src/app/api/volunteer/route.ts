import { NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";
import DOMPurify from "isomorphic-dompurify";

const resend = new Resend(process.env.RESEND_API_KEY);

const volunteerSchema = z.object({
  fullName: z.string().min(2, "Minimum 2 characters"),
  email: z.string().email("Invalid email address"),
  interests: z.enum(["FIELDWORK", "EDUCATION", "RESEARCH"]),
  availability: z.enum(["WEEKDAYS", "WEEKENDS", "BOTH"]),
});

export async function POST(request: Request) {
  try {
    const rawData = await request.json();
    const parsedData = volunteerSchema.parse(rawData);

    // Sanitize input
    const sanitizedData = {
      fullName: DOMPurify.sanitize(parsedData.fullName),
      email: DOMPurify.sanitize(parsedData.email),
      interests: parsedData.interests,
      availability: parsedData.availability,
    };

    const { data, error } = await resend.emails.send({
      from: `Volunteer Form <${process.env.SENDER_EMAIL}>`,
      to: [process.env.CONTACT_EMAIL!],
      subject: `New Volunteer Application from ${sanitizedData.fullName}`,
      replyTo: sanitizedData.email,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
          <h2>New Volunteer Application</h2>
          <p><strong>Name:</strong> ${sanitizedData.fullName}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Areas of Interest:</strong> ${sanitizedData.interests}</p>
          <p><strong>Availability:</strong> ${sanitizedData.availability}</p>
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