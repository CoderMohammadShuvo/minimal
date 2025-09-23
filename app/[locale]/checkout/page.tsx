"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { clearCart } from "@/lib/features/cart/cartSlice"
import { CheckoutWrapper } from "@/components/checkout/checkout-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, MapPin, CreditCard } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function CheckoutPage() {
  const t = useTranslations("checkout")
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { items, total } = useAppSelector((state) => state.cart)
  const { user } = useAppSelector((state) => state.auth)

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
  })

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/checkout")
      return
    }

    if (items.length === 0) {
      router.push("/")
      return
    }
  }, [user, items, router])

  const createPaymentIntent = async () => {
    try {
      setLoading(true)

      // First create the order
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          shippingAddress: shippingInfo,
          paymentMethod: "STRIPE",
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create order")
      }

      const order = await orderResponse.json()

      // Then create payment intent
      const paymentResponse = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          orderId: order.id,
        }),
      })

      if (!paymentResponse.ok) {
        throw new Error("Failed to create payment intent")
      }

      const { clientSecret } = await paymentResponse.json()
      setClientSecret(clientSecret)
    } catch (error) {
      console.error("Error creating payment intent:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    dispatch(clearCart())
    router.push("/checkout/success")
  }

  if (!user || items.length === 0) {
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("checkout")}</h1>
        <p className="text-muted-foreground">{t("completeOrder")}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                {t("orderSummary")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        {t("quantity")}: {item.quantity}
                      </p>
                    </div>
                    <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t("subtotal")}</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("shipping")}</span>
                  <span>{t("free")}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>{t("total")}</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t("shippingInformation")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">{t("fullName")}</Label>
                  <Input
                    id="fullName"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, fullName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <Input
                    id="phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">{t("city")}</Label>
                  <Input
                    id="city"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">{t("address")}</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">{t("postalCode")}</Label>
                  <Input
                    id="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, postalCode: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">{t("country")}</Label>
                  <Input
                    id="country"
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, country: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment */}
        <div>
          {clientSecret ? (
            <CheckoutWrapper clientSecret={clientSecret} amount={total} onSuccess={handlePaymentSuccess} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {t("payment")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={createPaymentIntent} disabled={loading} className="w-full">
                  {loading ? t("preparing") : t("proceedToPayment")}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
