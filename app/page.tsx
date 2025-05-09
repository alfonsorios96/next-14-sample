import { ProductGrid } from "@/components/product-grid"
import { HeroSection } from "@/components/hero-section"
import { CategoryFilter } from "@/components/category-filter"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <CategoryFilter />
        <ProductGrid />
      </div>
    </div>
  )
}
