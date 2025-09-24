// app/api/payments/create-intent/route.ts
import { NextResponse } from "next/server";

let stripe: any = null;

// Only initialize Stripe if the secret key exists
if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = require("stripe");
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });
}

export async function POST(req: Request) {
  if (!stripe) {
    // Return a dummy response during build / missing key
    return NextResponse.json({ message: "Stripe not initialized, skipping." });
  }

  // Your usual Stripe code here
  const body = await req.json();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: body.amount,
    currency: "usd",
  });

  return NextResponse.json(paymentIntent);
}
