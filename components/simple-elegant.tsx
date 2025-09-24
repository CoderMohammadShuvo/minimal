"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Shirt, Book, Home } from "lucide-react"
import Image from "next/image"

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
        <Image
          src="/1.svg"
          alt="Center Icon"
          width={331}
          height={282}
          className="absolute top-20 left-1/2 -translate-x-1/2"
        />

        {/* 2.svg - Left Bottom of 1.svg */}
        <Image
          src="/2.svg"
          alt="Left Bottom"
          width={253}
          height={213}
          className="absolute top-[400px] left-1/4 -translate-x-1/2 -translate-y-1/2"
        />

        {/* 3.svg - Right Bottom of 1.svg */}
        <Image
          src="/1.svg"
          alt="Right Bottom"
          width={232}
          height={248}
          className="absolute top-[400px] right-1/4 translate-x-1/2 -translate-y-1/2"
        />

        {/* 4.svg - Bottom Center */}
        <Image
          src="/5.svg"
          alt="Bottom Center"
          width={425}
          height={316}
          className="absolute bottom-[150px] left-[80px] -translate-x-1/2"
        />

        {/* 5.svg - Left Center */}
        <Image
          src="/4.svg"
          alt="Left Center"
          width={150}
          height={150}
          className="absolute top-[800px] right-0 -translate-y-1/2"
        />

        {/* 6.svg - Right Center */}
        <Image
          src="/6.svg"
          alt="Right Center"
          width={366}
          height={317}
          className="absolute top-[900px] left-1/2  -translate-y-1/2"
        />

        <div>
          <h1 className="text-center text-[64px] font-playfair leading-[1.1]">
            Simple. <br /> Elegant. <br /> Timeless
          </h1>

          <p className="text-center">Minimalist design meets handmade craftsmanship to <br /> elevate your space effortlessly.</p>
        </div>
      </div>

    </section>
  )
}
