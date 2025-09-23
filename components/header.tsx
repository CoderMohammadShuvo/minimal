"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LanguageSwitcher } from "./language-switcher"
import { CartButton } from "./cart/cart-button"
import { UserMenu } from "./auth/user-menu"
import MenuIcon from "./icons/menu-icon"
import Logo from "./icons/logo"

export function Header() {
  const t = useTranslations("nav")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">

          <div className="flex gap-2 items-center">
            <MenuIcon/>
            <p>SHOP</p>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo/>
          </Link>

          {/* Desktop Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              {t("home")}
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              {t("products")}
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              {t("categories")}
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              {t("about")}
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              {t("contact")}
            </Link>
          </nav> */}

         

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* <LanguageSwitcher /> */}
            {/* <UserMenu /> */}
            {/* <CartButton /> */}

            <p>Craft Studio <span>  EST. 2025</span></p>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input type="search" placeholder={t("search")} className="pl-10 pr-4" />
              </div>

              <nav className="flex flex-col space-y-2">
                <Link href="/" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  {t("home")}
                </Link>
                <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  {t("products")}
                </Link>
                <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  {t("categories")}
                </Link>
                <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  {t("about")}
                </Link>
                <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  {t("contact")}
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
