import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"
import { SimpleElegant } from "@/components/simple-elegant"
import { WhyMinimal } from "@/components/why-minimal"
import ShopByCategory from "@/components/categories-section"
import ReviewSection from "@/components/reviewSection"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SimpleElegant />
        <WhyMinimal />
        <FeaturedProducts />
        <ShopByCategory />
        <ReviewSection />
        <div className="py-16 container mx-auto px-4">
          <h2 className="text-center text-[32px] md:text-[48px] lg:text-[64px] font-playfair">
            Live Example
          </h2>
          <p className="text-gray-600 mt-2 text-center text-sm md:text-base">
            Minimalist design meets handmade craftsmanship to elevate your space <br /> effortlessly.
          </p>

          <Image
            aria-hidden
            src="/hero-img-1.svg"
            alt="Globe icon"
            width={1920}
            height={1080}
            className="w-full h-auto rounded-md mt-8"
          />
        </div>
    
      </main>
      <Footer />
    </div>
  )
}
