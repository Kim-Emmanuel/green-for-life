import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' });
const resend = new Resend(process.env.RESEND_API_KEY);

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
        items: [{ price_data: {
          currency: 'usd',
          unit_amount: amount * 100,
          product: product.id,
          recurring: {
            interval: frequency === 'MONTHLY' ? 'month' : 'year'
          }
        }}],
        payment_settings: { payment_method_types: ['card'] }
      });

      if (subscription.status !== 'active') {
        throw new Error('Subscription setup failed');
      }
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
    }

    // Send receipt
    await resend.emails.send({
      from: 'Donations <donations@greenlife.org>',
      to: donorEmail,
      subject: 'Donation Receipt',
      html: `
        <h3>Thank you for your ${frequency === 'ONE_TIME' ? '' : frequency.toLowerCase()} donation of $${amount}!</h3>
        <p>Your contribution supports our sustainability initiatives.</p>
        ${frequency !== 'ONE_TIME' ? '<p>Your donation will be automatically processed according to your selected frequency.</p>' : ''}
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Donation API Error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Payment processing failed'
    }, { status: 500 });
  }
}