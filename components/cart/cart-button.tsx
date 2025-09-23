"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { toggleCart } from "@/lib/features/cart/cartSlice"
import { useTranslations } from "next-intl"

export function CartButton() {
  const t = useTranslations("nav")
  const dispatch = useAppDispatch()
  const { totalItems } = useAppSelector((state) => state.cart)

  return (
    <Button variant="ghost" size="sm" className="relative" onClick={() => dispatch(toggleCart())}>
      <ShoppingCart className="h-4 w-4" />
      <span className="ml-2 hidden md:inline">{t("cart")}</span>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  )
}
