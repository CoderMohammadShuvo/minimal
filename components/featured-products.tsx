"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye } from "lucide-react"
import productImage from '../public/2.svg'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Product } from "@/lib/features/products/productsSlice"

// Mock data - will be replaced with real data from database
const featuredProducts = [
  {
    id: 1,
    name: "Premium Headphones",
    nameBn: "প্রিমিয়াম হেডফোন",
    price: 299,
    salePrice: 249,
    image: productImage,
    featured: true,
    isPopular: false
  },
  {
    id: 2,
    name: "Elegant Watch",
    nameBn: "মার্জিত ঘড়ি",
    price: 599,
    image: "productImage",
    featured: true,
    isPopular: true
  },
  {
    id: 3,
    name: "Designer Bag",
    nameBn: "ডিজাইনার ব্যাগ",
    price: 199,
    salePrice: 149,
    image: "/luxury-handbag.png",
    featured: true,
    isPopular: true
  },
  {
    id: 4,
    name: "Smart Phone",
    nameBn: "স্মার্ট ফোন",
    price: 899,
    image: "/modern-smartphone.png",
    featured: true,
    isPopular: false
  },
]



export function FeaturedProducts() {
  const t = useTranslations("products")


  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  
  
    const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()

        // ✅ Filter only "feature-product" category
        const featured = data.products.filter(
          (product: Product) => product.category?.slug === "feature-product"
        )

        setProducts(featured)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setIsLoading(false)
    }
  }



  useEffect(() => {
    fetchProducts()
  }, [])


  console.log("product", products)


  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <h1 className="text-[36px] sm:text-[48px] lg:text-[64px] text-center font-playfair leading-tight">
          Enjoy our featured Product
        </h1>
        <p className="mt-3 text-sm md:text-base lg:text-[16px] text-center font-sans max-w-2xl mx-auto">
          Minimalist design meets handmade craftsmanship to elevate your space effortlessly.
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 md:mt-16">
          {products.map((product) => (
            <Link href="/products/1">

              <div key={product.id} className="flex flex-col items-start text-left">
                <Card className="relative w-full border-none">
                  {/* Badge */}
                  {product?.isPopular && (
                    <span className="absolute top-2 right-2 bg-[#f8f8f8] text-gray-700 text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-md">
                      Popular
                    </span>
                  )}

                  <Image
                    aria-hidden
                    src={product?.images[0]}
                    alt="Globe icon"
                    width={646}
                    height={271}
                    className="rounded-md w-full object-cover"
                  />
                </Card>

                <h1 className="text-lg md:text-xl lg:text-[24px] font-playfair mt-3 md:mt-4">
                  {product?.name}
                </h1>
                <h2 className="text-base md:text-lg lg:text-[24px] font-sans font-semibold text-[#7f7f7f]">
                  ${product?.price}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

  )
}
