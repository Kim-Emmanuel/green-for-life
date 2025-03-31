import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { z } from 'zod';
import { prisma } from "@/lib/db/client";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-02-24.acacia' });
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

const donationSchema = z.object({
  amount: z.number().min(5),
  frequency: z.enum(['ONE_TIME', 'MONTHLY', 'ANNUAL']),
  donorEmail: z.string().email(),
  paymentMethodId: z.string() // From Stripe Elements
});

export async function POST(request: Request) {
  try {
    const data = donationSchema.parse(await request.json());
    const { amount, donorEmail, paymentMethodId, frequency } = data;
    let transactionId: string | undefined;

    // Handle subscription if recurring donation
    if (frequency !== 'ONE_TIME') {
      const customer = await stripe.customers.create({
        email: donorEmail,
        payment_method: paymentMethodId,
        invoice_settings: { default_payment_method: paymentMethodId }
      });

      // Create a product first
      const product = await stripe.products.create({
        name: `${frequency.toLowerCase()} donation`
      });

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ 
          price_data: {
            currency: 'usd',
            unit_amount: amount * 100,
            product: product.id,
            recurring: {
              interval: frequency === 'MONTHLY' ? 'month' : 'year'
            }
          }
        }],
        payment_settings: { payment_method_types: ['card'] }
      });

      if (subscription.status !== 'active') {
        throw new Error('Subscription setup failed');
      }

      transactionId = subscription.id;
    } else {
      // One-time donation
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/complete`
      });

      if (paymentIntent.status !== 'succeeded') {
        throw new Error('Payment failed');
      }

      transactionId = paymentIntent.id;
    }

    // Save to database
    const donation = await prisma.donation.create({
      data: {
        amount,
        frequency,
        donorEmail,
        paymentMethod: 'CREDIT_CARD',
        transactionId
      }
    });

    // Send receipt
    const { error: emailError } = await resend.emails.send({
      from: `Green For Life <${process.env.SENDER_EMAIL}>`,
      to: donorEmail,
      subject: 'Thank You for Your Donation to Green For Life',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
          <h2>Thank You for Your Donation!</h2>
          <p>Dear supporter,</p>
          <p>Thank you for your ${frequency === 'ONE_TIME' ? '' : frequency.toLowerCase()} donation of $${amount} to Green For Life.</p>
          <p>Your contribution helps us continue our mission of environmental sustainability and community impact.</p>
          ${frequency !== 'ONE_TIME' ? '<p>Your donation will be automatically processed according to your selected frequency.</p>' : ''}
          <p>Transaction Details:</p>
          <ul>
            <li>Amount: $${amount}</li>
            <li>Type: ${frequency === 'ONE_TIME' ? 'One-time donation' : `${frequency.toLowerCase()} subscription`}</li>
            <li>Transaction ID: ${transactionId}</li>
          </ul>
          <p>Best regards,<br>The Green For Life Team</p>
        </body>
        </html>
      `
    });

    if (emailError) {
      console.error("Email sending failed:", emailError);
      // Return success since payment was processed
      return NextResponse.json({ 
        success: true, 
        donation, 
        emailError: "Receipt email could not be sent" 
      }, { 
        status: 200,
        headers: corsHeaders 
      });
    }

    return NextResponse.json({ 
      success: true, 
      donation 
    }, { 
      status: 200,
      headers: corsHeaders 
    });

  } catch (error) {
    console.error('Donation API Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: error.errors 
      }, { 
        status: 400,
        headers: corsHeaders 
      });
    }

    // Handle Stripe errors specifically
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ 
        error: error.message,
        code: error.code
      }, { 
        status: 400,
        headers: corsHeaders 
      });
    }

    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Payment processing failed'
    }, { 
      status: 500,
      headers: corsHeaders 
    });
  }
}