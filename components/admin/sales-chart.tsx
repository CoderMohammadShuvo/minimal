"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const salesData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 198 },
  { month: "Mar", sales: 5000, orders: 300 },
  { month: "Apr", sales: 4500, orders: 278 },
  { month: "May", sales: 6000, orders: 389 },
  { month: "Jun", sales: 5500, orders: 349 },
  { month: "Jul", sales: 7000, orders: 430 },
]

export function SalesChart() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Monthly sales and order statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="hsl(var(--primary))" />
            <Bar dataKey="orders" fill="hsl(var(--secondary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
