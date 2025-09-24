"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setFilters, clearFilters } from "@/lib/features/products/productsSlice"

interface ProductFiltersProps {
  categories: Array<{
    id: string
    name: string
    nameEn: string
    nameBn: string
    slug: string
  }>
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const t = useTranslations("filters")
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector((state) => state.products)

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<string[]>([])

  // Mock brands and ratings data
  const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony", "LG"]
  const ratings = ["5", "4", "3", "2", "1"]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const updated = checked ? [...selectedCategories, categoryId] : selectedCategories.filter((id) => id !== categoryId)
    setSelectedCategories(updated)
    dispatch(setFilters({ category: updated.length > 0 ? updated.join(",") : null }))
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const updated = checked ? [...selectedBrands, brand] : selectedBrands.filter((b) => b !== brand)
    setSelectedBrands(updated)
  }

  const handleRatingChange = (rating: string, checked: boolean) => {
    const updated = checked ? [...selectedRatings, rating] : selectedRatings.filter((r) => r !== rating)
    setSelectedRatings(updated)
  }

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value)
    dispatch(setFilters({ priceRange: value }))
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedRatings([])
    setPriceRange([0, 1000])
    dispatch(clearFilters())
  }

  const activeFiltersCount =
    selectedCategories.length + selectedBrands.length + selectedRatings.length + (filters.priceRange ? 1 : 0)

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t("filters")}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{activeFiltersCount}</Badge>
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Accordion type="multiple" defaultValue={["categories", "price", "brands", "ratings"]} className="w-full">
          {/* Categories Filter */}
          <AccordionItem value="categories">
            <AccordionTrigger className="text-sm font-medium">{t("categories")}</AccordionTrigger>
            <AccordionContent className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                    {category.nameEn}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Price Range Filter */}
          <AccordionItem value="price">
            <AccordionTrigger className="text-sm font-medium">{t("priceRange")}</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Brands Filter */}
          <AccordionItem value="brands">
            <AccordionTrigger className="text-sm font-medium">{t("brands")}</AccordionTrigger>
            <AccordionContent className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Ratings Filter */}
          <AccordionItem value="ratings">
            <AccordionTrigger className="text-sm font-medium">{t("ratings")}</AccordionTrigger>
            <AccordionContent className="space-y-3">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-normal cursor-pointer flex items-center gap-1"
                  >
                    {rating} ⭐ & up
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* Availability Filter */}
          <AccordionItem value="availability">
            <AccordionTrigger className="text-sm font-medium">{t("availability")}</AccordionTrigger>
            <AccordionContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" />
                <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                  {t("inStock")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="on-sale" />
                <Label htmlFor="on-sale" className="text-sm font-normal cursor-pointer">
                  {t("onSale")}
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
