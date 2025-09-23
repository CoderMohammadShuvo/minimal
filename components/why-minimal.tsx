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
      <div className="container mx-auto px-4 flex-col items-center">
        <h1 className="text-[64px] text-center font-playfair">Why Minimal?</h1>
        <p className="text-center font-sans text-[16px]">Minimalist design meets handmade <br /> craftsmanship to elevate your space <br /> effortlessly.</p>
      </div>
      <div className="container mx-auto flex gap-4 mt-16">
        <div className="h-[294px] w-1/3 border rounded-md p-10">
          <RecycleIcon />
          <ul className="list-disc pl-5">
            <li className="font-sans text-[16px] mt-6">Sustainable</li>
          </ul>
          <p className="text-[32px] mt-6 font-playfair">We use recycled & eco-friendly materials.</p>
        </div>
        <div className="h-[294px] w-1/3 border rounded-md p-10 ">
          <AffordableIcon />
          <ul className="list-disc pl-5">
            <li className="font-sans text-[16px] mt-6">Affordable</li>
          </ul>
          <p className="text-[32px] mt-6 font-playfair">Designed for quality without the high price.  </p>
        </div>
        <div className="h-[294px] w-1/3 border rounded-md p-10">
          <TimelessIcon />
          <ul className="list-disc pl-5">
            <li className="font-sans text-[16px] mt-6">Timeless Design</li>
          </ul>
          <p className="text-[32px] mt-6 font-playfair">Simple forms that never go out of style.</p>
        </div>
      </div>
    </section>
  )
}
