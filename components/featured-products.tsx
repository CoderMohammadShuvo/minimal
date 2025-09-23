"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye } from "lucide-react"
import productImage from '../public/2.svg'
import Image from "next/image"

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

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("featured")}</h2> */}
        <h1 className="text-[64px] text-center font-playfair">Enjoy our featured Product</h1>
        <p className="text-center font-sans text-[16px]">Minimalist design meets handmade craftsmanship to elevate your space effortlessly.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {featuredProducts.map((product) => (
            <div key={product.id}>
              <Card className="relative">
                {/* Badge */}
                {product?.isPopular && (
                  <span className="absolute top-2 right-2 bg-[#f8f8f8] text-gray-700 text-sm font-medium px-3 py-1 rounded-md">
                    Popular
                  </span>
                )}

                <Image
                  aria-hidden
                  src="/2.svg"
                  alt="Globe icon"
                  width={646}
                  height={271}
                  className="rounded-md"
                />
              </Card>

              <h1 className="text-[24px] font-playfair mt-4">{product?.name}</h1>
              <h2 className="text-[24px] font-sans font-semibold text-[#7f7f7f]">
                ${product?.price}
              </h2>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
