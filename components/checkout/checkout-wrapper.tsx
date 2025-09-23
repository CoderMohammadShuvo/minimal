"use client"

import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "@/lib/stripe"
import { CheckoutForm } from "./checkout-form"

interface CheckoutWrapperProps {
  clientSecret: string
  amount: number
  onSuccess: () => void
}

export function CheckoutWrapper({ clientSecret, amount, onSuccess }: CheckoutWrapperProps) {
  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#000000",
        colorBackground: "#ffffff",
        colorText: "#000000",
        colorDanger: "#df1b41",
        fontFamily: "Inter, system-ui, sans-serif",
        spacingUnit: "4px",
        borderRadius: "8px",
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm clientSecret={clientSecret} amount={amount} onSuccess={onSuccess} />
    </Elements>
  )
}
