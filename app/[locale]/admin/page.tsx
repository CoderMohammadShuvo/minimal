import { StatsCards } from "@/components/admin/stats-cards"
import { RecentOrders } from "@/components/admin/recent-orders"
import { SalesChart } from "@/components/admin/sales-chart"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2 h-[50vh] overflow-hidden ">
        <SalesChart />
        <RecentOrders />
      </div>
    </div>
  )
}
