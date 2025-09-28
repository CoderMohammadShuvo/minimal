'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ProductDetails from "@/components/product-details"
import { FeaturedProducts } from "@/components/featured-products"
import ReviewSection from "@/components/reviewSection"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ProductData {
  id: string
  name: string
  price: number
  description: string
  // Add other product fields as needed
}

export default function ProductsPage() {
  const params = useParams()
  const productId = params.id as string
  const [productData, setProductData] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProductData() {
      try {
        setLoading(true)
        setError(null)
        
        // Use relative URL since we're on the client
        const res = await fetch(`/api/products/${productId}`)
        
        if (!res.ok) {
          throw new Error('Failed to fetch product data')
        }
        
        const data = await res.json()
        setProductData(data)
      } catch (err) {
        console.error('Failed to fetch product data:', err)
        setError('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProductData()
    }
  }, [productId])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">Loading product details...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center text-red-500">{error}</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProductDetails productId={productId} productData={productData} />
        
        <div className="w-full bg-[#f8f8f8] py-10">
          <ReviewSection productId={productId} />
        </div>
        
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}