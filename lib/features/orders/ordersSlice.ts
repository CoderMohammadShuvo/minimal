import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface Order {
  id: string
  orderNumber?: string
  userId: string
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED"
  totalAmount: number
  shippingAmount: number
  taxAmount: number
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED"
  paymentMethod?: string
  shippingAddress: any
  billingAddress?: any
  deliveryPartnerId?: string
  trackingNumber?: string
  estimatedDelivery?: string
  deliveredAt?: string
  createdAt: string
  updatedAt: string
  orderItems: Array<{
    id: string
    productId: string
    quantity: number
    price: number
    product: {
      name: string
      nameBn: string
      images: string[]
    }
  }>
}

interface OrdersState {
  orders: Order[]
  currentOrder: Order | null
  isLoading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
}

// Async thunks
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (params: { page?: number; limit?: number; status?: string }) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, value.toString())
    })

    const response = await fetch(`/api/orders?${searchParams}`)
    if (!response.ok) throw new Error("Failed to fetch orders")
    return response.json()
  },
)

export const fetchOrderById = createAsyncThunk("orders/fetchOrderById", async (orderId: string) => {
  const response = await fetch(`/api/orders/${orderId}`)
  if (!response.ok) throw new Error("Failed to fetch order")
  return response.json()
})

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: {
    items: Array<{ productId: string; quantity: number; price: number }>
    shippingAddress: any
    billingAddress?: any
    paymentMethod: string
  }) => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) throw new Error("Failed to create order")
    return response.json()
  },
)

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }: { orderId: string; status: string }) => {
    const response = await fetch(`/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) throw new Error("Failed to update order status")
    return response.json()
  },
)

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload.orders
        state.pagination = action.payload.pagination
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch orders"
      })
      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentOrder = action.payload
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch order"
      })
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders.unshift(action.payload)
        state.currentOrder = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to create order"
      })
      // Update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex((order) => order.id === action.payload.id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload
        }
      })
  },
})

export const { clearError, setPage } = ordersSlice.actions
export default ordersSlice.reducer
