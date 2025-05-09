"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export function CategoryFilter() {
  const [priceRange, setPriceRange] = useState([0, 2000])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Filters</h3>
        <Button variant="outline" size="sm" className="w-full">
          Clear All Filters
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price"]}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="electronics" />
                <Label htmlFor="electronics">Electronics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="computers" />
                <Label htmlFor="computers">Computers & Tablets</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="phones" />
                <Label htmlFor="phones">Phones & Wearables</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="audio" />
                <Label htmlFor="audio">Audio & Headphones</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cameras" />
                <Label htmlFor="cameras">Cameras</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 2000]} max={2000} step={10} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                  className="h-8"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 2000])}
                  className="h-8"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sellers">
          <AccordionTrigger>Sellers</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="audiotech" />
                <Label htmlFor="audiotech">AudioTech</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="techwear" />
                <Label htmlFor="techwear">TechWear</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="computerpro" />
                <Label htmlFor="computerpro">ComputerPro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mobiletech" />
                <Label htmlFor="mobiletech">MobileTech</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ratings">
          <AccordionTrigger>Ratings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="5stars" />
                <Label htmlFor="5stars">5 Stars</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="4stars" />
                <Label htmlFor="4stars">4 Stars & Up</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="3stars" />
                <Label htmlFor="3stars">3 Stars & Up</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="2stars" />
                <Label htmlFor="2stars">2 Stars & Up</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="1star" />
                <Label htmlFor="1star">1 Star & Up</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
