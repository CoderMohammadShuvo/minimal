"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Shirt, Book, Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import RightArrorwIcon from "./icons/RightArrorwIcon"

const categories = [
  { key: "electronics", icon: Smartphone, color: "text-blue-500" },
  { key: "clothing", icon: Shirt, color: "text-green-500" },
  { key: "books", icon: Book, color: "text-purple-500" },
  { key: "home", icon: Home, color: "text-orange-500" },
]

export function SimpleElegant() {
  const t = useTranslations("categories")

  return (
   <section className="py-16 h-[1200px] bg-[#f8f8f8]">
  <div className="container h-full relative flex justify-center items-center mx-auto px-4 ">
    {/* 1.svg - Center Top */}
    <img
      src="/1.svg"
      alt="Center Icon"
      className="absolute top-20 left-1/2 -translate-x-1/2 
                 w-[200px] md:w-[260px] lg:w-[331px]"
    />

    {/* 2.svg - Left Bottom of 1.svg */}
    <img
      src="/2.svg"
      alt="Left Bottom"
    
      className="absolute top-[400px] left-1/4 -translate-x-1/2 -translate-y-1/2 
                 w-[140px] md:w-[200px] lg:w-[253px]"
    />

    {/* 3.svg - Right Bottom of 1.svg */}
    <img
      src="/1.svg"
      alt="Right Bottom"
    
      className="absolute top-[400px] right-1/4 translate-x-1/2 -translate-y-1/2
                 w-[130px] md:w-[180px] lg:w-[232px]"
    />

    {/* 4.svg - Bottom Center */}
    <img
      src="/5.svg"
      alt="Bottom Center"
   
      className="absolute bottom-[150px] left-[80px] -translate-x-1/2 
                 w-[220px] md:w-[300px] lg:w-[425px]"
    />

    {/* 5.svg - Left Center */}
    <img
      src="/4.svg"
      alt="Left Center"
      
      className="absolute top-[800px] right-0 -translate-y-1/2 
                 w-[80px] md:w-[120px] lg:w-[150px]"
    />

    {/* 6.svg - Right Center */}
    <img
      src="/6.svg"
      alt="Right Center"
    
      className="absolute top-[900px] left-1/2 -translate-y-1/2 
                 w-[200px] md:w-[280px] lg:w-[366px]"
    />

    {/* Text + Button */}
    <div className="relative z-10 flex flex-col items-center justify-center text-center">
      <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-playfair leading-[1.1]">
        Simple. <br /> Elegant. <br /> Timeless
      </h1>

      <p className="mt-4 text-sm md:text-base">
        Minimalist design meets handmade craftsmanship to <br /> elevate your space effortlessly.
      </p>

      <Link href="/products">
        <button className="px-4 mt-8 py-2 border border-[#dedede] rounded-md flex gap-4 mx-auto">
          Choice Your Product <RightArrorwIcon />
        </button>
      </Link>
    </div>
  </div>
</section>

  )
}
