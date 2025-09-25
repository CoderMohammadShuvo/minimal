"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import RecycleIcon from "./icons/recycle-icon"
import AffordableIcon from "./icons/affordable-icon"
import TimelessIcon from "./icons/timeless-icon"

export function WhyMinimal() {
  const t = useTranslations("whyminimal")

  return (
   <section className="relative bg-white py-20 md:py-32">
  {/* Heading */}
  <div className="container mx-auto px-4 flex flex-col items-center text-center">
    <h1 className="text-[36px] sm:text-[48px] lg:text-[64px] font-playfair">
      Why Minimal?
    </h1>
    <p className="mt-4 font-sans text-[14px] sm:text-[16px] text-[#333]">
      Minimalist design meets handmade <br className="hidden sm:block" />
      craftsmanship to elevate your space <br className="hidden sm:block" />
      effortlessly.
    </p>
  </div>

  {/* Cards */}
  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 lg:mt-16 px-4">
    {/* Card 1 */}
    <div className="border rounded-md p-6 sm:p-8 lg:p-10 flex flex-col h-auto">
      <RecycleIcon className="w-8 h-8 sm:w-10 sm:h-10" />
      <ul className="list-disc pl-5 mt-4 sm:mt-6">
        <li className="font-sans text-[14px] sm:text-[16px]">Sustainable</li>
      </ul>
      <p className="text-[20px] sm:text-[24px] lg:text-[32px] mt-4 sm:mt-6 font-playfair leading-snug">
        We use recycled & eco-friendly materials.
      </p>
    </div>

    {/* Card 2 */}
    <div className="border rounded-md p-6 sm:p-8 lg:p-10 flex flex-col h-auto">
      <AffordableIcon className="w-8 h-8 sm:w-10 sm:h-10" />
      <ul className="list-disc pl-5 mt-4 sm:mt-6">
        <li className="font-sans text-[14px] sm:text-[16px]">Affordable</li>
      </ul>
      <p className="text-[20px] sm:text-[24px] lg:text-[32px] mt-4 sm:mt-6 font-playfair leading-snug">
        Designed for quality without the high price.
      </p>
    </div>

    {/* Card 3 */}
    <div className="border rounded-md p-6 sm:p-8 lg:p-10 flex flex-col h-auto">
      <TimelessIcon className="w-8 h-8 sm:w-10 sm:h-10" />
      <ul className="list-disc pl-5 mt-4 sm:mt-6">
        <li className="font-sans text-[14px] sm:text-[16px]">Timeless Design</li>
      </ul>
      <p className="text-[20px] sm:text-[24px] lg:text-[32px] mt-4 sm:mt-6 font-playfair leading-snug">
        Simple forms that never go out of style.
      </p>
    </div>
  </div>
</section>

  )
}
