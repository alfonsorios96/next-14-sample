import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-red-800 px-6 py-16 text-white shadow-xl sm:px-12">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">MediaMarktSaturn Marketplace</h1>
        <p className="mb-8 text-lg">
          Discover a wide range of products from trusted sellers. From electronics to home appliances, find everything
          you need in one place.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          <Button asChild size="lg" variant="secondary">
            <Link href="#products">Browse Products</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10">
            <Link href="/orders">Manage Orders</Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 z-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
    </div>
  )
}
