import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Update order payment status
        if (paymentIntent.metadata.orderId) {
          await prisma.order.update({
            where: { id: paymentIntent.metadata.orderId },
            data: {
              paymentStatus: "PAID",
              status: "CONFIRMED",
              paymentIntentId: paymentIntent.id,
            },
          })
        }
        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent

        if (failedPayment.metadata.orderId) {
          await prisma.order.update({
            where: { id: failedPayment.metadata.orderId },
            data: {
              paymentStatus: "FAILED",
            },
          })
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}
