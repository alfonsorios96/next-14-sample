"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, ShoppingCart } from "lucide-react"

// Mock data for products
const mockProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: "AudioTech",
    sellerId: "s1",
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Fitness and health tracking smartwatch",
    price: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: "TechWear",
    sellerId: "s2",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    description: "Portable waterproof bluetooth speaker",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: "AudioTech",
    sellerId: "s1",
  },
  {
    id: "4",
    name: "Laptop",
    description: "Ultra-thin laptop with high performance",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: "ComputerPro",
    sellerId: "s3",
  },
  {
    id: "5",
    name: "Smartphone",
    description: "Latest model with advanced camera system",
    price: 899.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: "MobileTech",
    sellerId: "s4",
  },
  {
    id: "6",
    name: "Tablet",
    description: "Lightweight tablet with stunning display",
    price: 499.99,
    image: "/placeholder.svg?height=300&width=300",
    seller: "ComputerPro",
    sellerId: "s3",
  },
]

export function ProductGrid() {
  const [sortOption, setSortOption] = useState("featured")
  const [products, setProducts] = useState(mockProducts)

  const handleSort = (option: string) => {
    setSortOption(option)
    const sortedProducts = [...mockProducts]

    switch (option) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // featured - no sorting
        break
    }

    setProducts(sortedProducts)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold" id="products">
          Products
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort by: {getSortLabel(sortOption)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSort("featured")}>Featured</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("price-asc")}>Price: Low to High</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("price-desc")}>Price: High to Low</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("name-asc")}>Name: A to Z</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("name-desc")}>Name: Z to A</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xl font-bold">€{product.price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">Seller: {product.seller}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function getSortLabel(option: string): string {
  switch (option) {
    case "price-asc":
      return "Price: Low to High"
    case "price-desc":
      return "Price: High to Low"
    case "name-asc":
      return "Name: A to Z"
    case "name-desc":
      return "Name: Z to A"
    default:
      return "Featured"
  }
}
