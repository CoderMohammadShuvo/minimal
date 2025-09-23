"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface Order {
  id: string
  totalAmount: number
  status: string
  paymentStatus: string
  createdAt: string
  trackingNumber?: string
  items: Array<{
    quantity: number
    price: number
    product: {
      name: string
      nameEn: string
      nameBn: string
      images: string[]
    }
  }>
  shippingAddress: {
    fullName: string
    phone: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  deliveryPartner?: {
    name: string
    nameEn: string
    nameBn: string
    contactInfo: any
  }
}

export function OrderTracking() {
  const t = useTranslations("orders")
  const [trackingId, setTrackingId] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const trackOrder = async () => {
    if (!trackingId.trim()) return

    try {
      setLoading(true)
      setError("")

      const response = await fetch(`/api/orders/${trackingId}`)
      const data = await response.json()

      if (response.ok) {
        setOrder(data)
      } else {
        setError(data.error || "Order not found")
        setOrder(null)
      }
    } catch (error) {
      setError("Failed to track order")
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "CONFIRMED":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case "PROCESSING":
        return <Package className="h-5 w-5 text-orange-500" />
      case "SHIPPED":
        return <Truck className="h-5 w-5 text-purple-500" />
      case "DELIVERED":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      PENDING: "outline",
      CONFIRMED: "default",
      PROCESSING: "secondary",
      SHIPPED: "default",
      DELIVERED: "default",
      CANCELLED: "destructive",
    }
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>
  }

  const orderStatuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"]
  const currentStatusIndex = order ? orderStatuses.indexOf(order.status) : -1

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {t("trackOrder")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder={t("enterOrderId")}
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && trackOrder()}
            />
            <Button onClick={trackOrder} disabled={loading}>
              {loading ? t("tracking") : t("track")}
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>

      {order && (
        <div className="space-y-6">
          {/* Order Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order #{order.id.slice(-8)}</span>
                {getStatusBadge(order.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                {orderStatuses.map((status, index) => (
                  <div key={status} className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        index <= currentStatusIndex
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      {getStatusIcon(status)}
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        index <= currentStatusIndex ? "text-primary font-medium" : "text-gray-400"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>

              {order.trackingNumber && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span className="font-medium">
                      {t("trackingNumber")}: {order.trackingNumber}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>{t("orderItems")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      {item.product.images[0] ? (
                        <img
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">
                        {t("quantity")}: {item.quantity} × {formatCurrency(item.price)}
                      </p>
                    </div>
                    <div className="font-medium">{formatCurrency(item.quantity * item.price)}</div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span className="font-medium">{t("total")}</span>
                <span className="text-xl font-bold">{formatCurrency(order.totalAmount)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {t("shippingAddress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Phone className="h-4 w-4" />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {order.deliveryPartner && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    {t("deliveryPartner")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{order.deliveryPartner.name}</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{order.deliveryPartner.contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{order.deliveryPartner.contactInfo.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
