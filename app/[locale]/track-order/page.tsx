import { OrderTracking } from "@/components/order-tracking"

export default function TrackOrderPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-muted-foreground">Enter your order ID to track your package</p>
      </div>

      <OrderTracking />
    </div>
  )
}
