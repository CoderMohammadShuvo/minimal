import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"
import { SimpleElegant } from "@/components/simple-elegant"
import { WhyMinimal } from "@/components/why-minimal"
import ShopByCategory from "@/components/categories-section"
import ReviewSection from "@/components/reviewSection"
import ProductPageSection from "@/components/products-section"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProductPageSection/>
      </main>
      <Footer />
    </div>
  )
}
