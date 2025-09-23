"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 flex justify-between">
        <h1 className="font-sans text-[40px] font-regular">Crafted <span className="text-[64px] font-playfair italic">Minimalism</span> <br /> for <span className="text-[64px] font-playfair italic">Modern</span>  Living</h1>
        <Image
          aria-hidden
          src="/hero-img-1.svg"
          alt="Globe icon"
          width={646}
          height={271}
        />
      </div>

      <div className="container mx-auto px-4 flex justify-between gap-2 mt-30">
        <div className="h-[117px] bg-[#F8F8F8] w-1/4 flex flex-col justify-center items-center rounded-3xl">
          <h1 className="text-[32px] font-sans">100+</h1>
          <p className="font-playfair text-[18px] text-[#5a5a5a]"><span className="text-[26px]">H</span>appy Customer</p>
        </div>
        <div className="h-[117px] bg-[#F8F8F8] w-1/4 flex flex-col justify-center items-center rounded-3xl">
          <h1 className="text-[32px] font-sans">80+</h1>
          <p className="font-playfair text-[18px] text-[#5a5a5a]"><span className="text-[26px]">T</span>otal Products</p>
        </div>
        <div className="h-[117px] bg-[#F8F8F8] w-1/4 flex flex-col justify-center items-center rounded-3xl">
          <h1 className="text-[32px] font-sans">4.9</h1>
          <p className="font-playfair text-[18px] text-[#5a5a5a]"><span className="text-[26px]">C</span>lient Rating</p>
        </div>
        <div className="h-[117px] bg-[#F8F8F8] w-1/4 flex flex-col justify-center items-center rounded-3xl">
          <h1 className="text-[32px] font-sans">5+</h1>
          <p className="font-playfair text-[18px] text-[#5a5a5a]"><span className="text-[26px]">S</span>elling Count</p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
    </section>
  )
}
