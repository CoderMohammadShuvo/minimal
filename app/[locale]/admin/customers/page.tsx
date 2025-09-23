import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">Manage customer accounts and information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>View customer profiles, orders, and support tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Customer management interface coming soon.</p>
        </CardContent>
      </Card>
    </div>
  )
}
