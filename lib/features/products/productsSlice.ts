import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: string
  name: string
  nameEn: string
  nameBn: string
  slug: string
  description: string
  descriptionEn: string
  descriptionBn: string
  price: number
  salePrice?: number
  sku: string
  stock: number
  images: string[]
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK"
  featured: boolean
  categoryId: string
  category?: {
    id: string
    name: string
    nameEn: string
    nameBn: string
    slug: string
  }
  createdAt: string
  updatedAt: string
}

interface ProductsState {
  products: Product[]
  featuredProducts: Product[]
  currentProduct: Product | null
  categories: Array<{
    id: string
    name: string
    nameEn: string
    nameBn: string
    slug: string
  }>
  isLoading: boolean
  error: string | null
  filters: {
    category: string | null
    priceRange: [number, number] | null
    search: string
    sortBy: "name" | "price" | "createdAt"
    sortOrder: "asc" | "desc"
  }
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const initialState: ProductsState = {
  products: [],
  featuredProducts: [],
  currentProduct: null,
  categories: [],
  isLoading: false,
  error: null,
  filters: {
    category: null,
    priceRange: null,
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
}

// Async thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: {
    page?: number
    limit?: number
    category?: string
    search?: string
    sortBy?: string
    sortOrder?: string
  }) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, value.toString())
    })

    const response = await fetch(`/api/products?${searchParams}`)
    if (!response.ok) throw new Error("Failed to fetch products")
    return response.json()
  },
)

export const fetchFeaturedProducts = createAsyncThunk("products/fetchFeaturedProducts", async () => {
  const response = await fetch("/api/products/featured")
  if (!response.ok) throw new Error("Failed to fetch featured products")
  return response.json()
})

export const fetchProductBySlug = createAsyncThunk("products/fetchProductBySlug", async (slug: string) => {
  const response = await fetch(`/api/products/${slug}`)
  if (!response.ok) throw new Error("Failed to fetch product")
  return response.json()
})

export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await fetch("/api/categories")
  if (!response.ok) throw new Error("Failed to fetch categories")
  return response.json()
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductsState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.products
        state.pagination = action.payload.pagination
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch products"
      })
      // Fetch featured products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload
      })
      // Fetch product by slug
      .addCase(fetchProductBySlug.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch product"
      })
      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

export const { setFilters, clearFilters, setPage, clearError } = productsSlice.actions
export default productsSlice.reducer
