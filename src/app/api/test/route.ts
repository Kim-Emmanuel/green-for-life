import { NextResponse } from 'next/server';

export async function GET() {
  const missingVars = [];
  
  const requiredVars = [
    'RESEND_API_KEY',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'CONTACT_EMAIL',
    'NEXT_PUBLIC_BASE_URL'
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    return NextResponse.json({
      error: 'Missing required environment variables',
      missingVars
    }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}