"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard } from "lucide-react"

interface CheckoutFormProps {
  clientSecret: string
  amount: number
  onSuccess: () => void
}

export function CheckoutForm({ clientSecret, amount, onSuccess }: CheckoutFormProps) {
  const t = useTranslations("checkout")
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setError(null)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message || "An error occurred")
      setIsLoading(false)
      return
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: "if_required",
    })

    if (confirmError) {
      setError(confirmError.message || "Payment failed")
    } else {
      onSuccess()
    }

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          {t("paymentDetails")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
          />

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600">{t("total")}</p>
              <p className="text-2xl font-bold">${amount.toFixed(2)}</p>
            </div>

            <Button type="submit" disabled={!stripe || !elements || isLoading} className="min-w-32">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t("processing")}
                </>
              ) : (
                t("payNow")
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
