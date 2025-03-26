// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

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

// Validation middleware
async function validateRequest(request: Request) {
  // CORS headers for error responses
  const errorResponse = (message: string, status: number) => 
    NextResponse.json({ error: message }, { 
      status,
      headers: corsHeaders 
    });

  // Method check
  if (request.method !== 'POST') {
    return errorResponse("Method not allowed", 405);
  }

  // Content-Type check
  const contentType = request.headers.get('content-type');
  if (contentType !== 'application/json') {
    return errorResponse("Invalid content type", 415);
  }

  return null;
}

export async function POST(request: Request) {
  // Validate request first
  const validationResponse = await validateRequest(request);
  if (validationResponse) return validationResponse;

  try {
    // Process valid request
    const body = await request.json();

    if (!body.email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Add your business logic here
    console.log("Received valid submission:", body.email);

    return NextResponse.json(
      { success: true },
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}