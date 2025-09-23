"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "./icons/logo"
import ArrowIcon from "./icons/rightArrow"

export function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="bg-[#f8f8f8] rounded-2xl container mx-auto mb-16">
      <div className="w-full mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo/>
            <p className="text-muted-foreground">We Craft Art</p>
          
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-[42px] font-playfair">Stay updated with our latest product</h4>
            <p className="text-muted-foreground text-[16px] font-sans mt-4">Our initiatives engage diverse audiences across various channels.</p>
            <div className="flex gap-2 border-b pb-2">
              <input type="email" placeholder="Your email address" className="flex-1 b" />
                <ArrowIcon/>
            </div>
          </div>

         <div className="flex justify-center gap-10 mt-4">
           {/* Quick Links */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Link href="/Home" className="block text-muted-foreground hover:text-primary transition-colors">
                {("Home")}
              </Link>
              <Link href="/About" className="block text-muted-foreground hover:text-primary transition-colors">
                {("About")}
              </Link>
              <Link href="/ourproject" className="block text-muted-foreground hover:text-primary transition-colors">
                {("Our Project")}
              </Link>
              <Link href="/Blog" className="block text-muted-foreground hover:text-primary transition-colors">
                {("Blog")}
              </Link>
              <Link href="/Contact Us" className="block text-muted-foreground hover:text-primary transition-colors">
                {("Contact Us")}
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Link
                href="/categories/electronics"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Facebook
              </Link>
              <Link
                href="/categories/clothing"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Instagram
              </Link>
              <Link
                href="/categories/books"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Tik Tok
              </Link>
              <Link
                href="/categories/home"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                
                Threads
              </Link>
              <Link
                href="/categories/home"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                
                X
              </Link>
            </div>
          </div>
         </div>

          
        </div>

        <div className=" mt-8 pt-8 flex justify-between items-center text-muted-foreground">
            <div>
              <p className="font-sans text-[20px] ">01711244963</p>
              <h1 className="font-sans text-[24px] font-bold">minimalcrafts.art</h1>
            </div>
            <p className="text-[12px]">&copy; 2024 Minimal. All rights reserved.</p>
            <div className="flex gap-4 text-[12px]">
              <Link href="#">Cookies Policy</Link>
              <Link href="#">Terms of Use</Link>
              <Link href="#">Term of Service  </Link>
              <Link href="#">Privacy Policy</Link>
            </div>
        </div>

      </div>
    </footer>
  )
}
