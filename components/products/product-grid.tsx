"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"                     
import { ShoppingCart, Eye, Heart } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/lib/features/products/productsSlice"

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  const t = useTranslations("products")

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-64 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">{t("noProducts")}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-2">
      {products.map((product) => (
        <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="relative overflow-hidden">
            <img
              src={product.images[0] || `/placeholder.svg?height=300&width=300&query=${product.nameEn}`}
              alt={product.nameEn}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.salePrice && <Badge className="bg-red-500 hover:bg-red-600">{t("sale")}</Badge>}
              {product.featured && <Badge className="bg-blue-500 hover:bg-blue-600">{t("featured")}</Badge>}
              {product.stock === 0 && <Badge variant="destructive">{t("outOfStock")}</Badge>}
            </div>

            {/* Wishlist Button */}
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Heart className="h-4 w-4" />
            </Button>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
              <Button size="sm" variant="secondary">
                <Eye className="h-4 w-4 mr-1" />
                {t("quickView")}
              </Button>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                {product.nameEn}
              </h3>

              {product.category && <p className="text-sm text-muted-foreground">{product.category.nameEn}</p>}

              <div className="flex items-center gap-2">
                {product.salePrice ? (
                  <>
                    <span className="text-lg font-bold text-red-600">{formatCurrency(product.salePrice)}</span>
                    <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.price)}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                    </Badge>
                  </>
                ) : (
                  <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} in stock` : t("outOfStock")}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★★★★☆</span>
                  <span className="text-muted-foreground">(4.2)</span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button
              className="w-full"
              disabled={product.stock === 0}
              variant={product.stock === 0 ? "secondary" : "default"}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.stock === 0 ? t("outOfStock") : t("addToCart")}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
