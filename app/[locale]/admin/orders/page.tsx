import { OrdersTable } from "@/components/admin/orders-table"
import { DeliveryPartners } from "@/components/admin/delivery-partners"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Track and manage customer orders</p>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Partners</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <OrdersTable />
        </TabsContent>

        <TabsContent value="delivery">
          <DeliveryPartners />
        </TabsContent>
      </Tabs>
    </div>
  )
}
