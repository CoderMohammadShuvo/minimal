// app/api/payments/webhook/route.ts
import { NextResponse } from "next/server";

let stripe: any = null;

// Only initialize Stripe if the secret key exists
if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = require("stripe");
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });
}

export async function POST(req: Request) {
  if (!stripe) {
    // Skip processing during build or missing key
    return NextResponse.json({ message: "Stripe not initialized, skipping." });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Handle your webhook event here
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
