import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ProductPageSection from "@/components/products-section"
import ProductDetails from "@/components/product-details"
import { FeaturedProducts } from "@/components/featured-products"
import ReviewSection from "@/components/reviewSection"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
       <ProductDetails/>
       <div className="w-full bg-[#f8f8f8] py-10">
        <ReviewSection/>
       </div>
       <FeaturedProducts/>
       
      </main>
      <Footer />
    </div>
  )
}
