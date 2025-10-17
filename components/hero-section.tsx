"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import RightArrorwIcon from "./icons/RightArrorwIcon"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative bg-white py-20 md:py-32">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-10">
        <div>
          <h1 className="font-sans text-[32px] sm:text-[36px] lg:text-[40px] font-regular leading-snug">
          Crafted{" "}
          <span className="text-[42px] sm:text-[52px] lg:text-[64px] font-playfair italic">
            Minimalism
          </span>{" "}
          <br className="hidden sm:block" />
          for{" "}
          <span className="text-[42px] sm:text-[52px] lg:text-[64px] font-playfair italic">
            Modern
          </span>{" "}
          Living
        </h1>
        <Link href="/products">
            <button className="px-4 mt-8 py-2 border border-[#dedede] bg-[#B96F4A] text-black rounded-md flex gap-4">Choice Your Product <RightArrorwIcon/></button>
        </Link>
        </div>
        <img
          aria-hidden
          src="/heroright.svg"
          alt="Globe icon"
          
          className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[646px] h-auto"
        />
      </div>

      <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 lg:mt-20">
        <div className="h-[100px] sm:h-[117px] bg-[#F8F8F8] flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
          <h1 className="text-[24px] sm:text-[32px] font-sans">100+</h1>
          <p className="font-playfair text-[14px] sm:text-[18px] text-[#5a5a5a]">
            <span className="text-[20px] sm:text-[26px]">H</span>appy Customer
          </p>
        </div>
        <div className="h-[100px] sm:h-[117px] bg-[#F8F8F8] flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
          <h1 className="text-[24px] sm:text-[32px] font-sans">80+</h1>
          <p className="font-playfair text-[14px] sm:text-[18px] text-[#5a5a5a]">
            <span className="text-[20px] sm:text-[26px]">T</span>otal Products
          </p>
        </div>
        <div className="h-[100px] sm:h-[117px] bg-[#F8F8F8] flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
          <h1 className="text-[24px] sm:text-[32px] font-sans">4.9</h1>
          <p className="font-playfair text-[14px] sm:text-[18px] text-[#5a5a5a]">
            <span className="text-[20px] sm:text-[26px]">C</span>lient Rating
          </p>
        </div>
        <div className="h-[100px] sm:h-[117px] bg-[#F8F8F8] flex flex-col justify-center items-center rounded-2xl sm:rounded-3xl">
          <h1 className="text-[24px] sm:text-[32px] font-sans">5+</h1>
          <p className="font-playfair text-[14px] sm:text-[18px] text-[#5a5a5a]">
            <span className="text-[20px] sm:text-[26px]">S</span>elling Count
          </p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
    </section>

  )
}
