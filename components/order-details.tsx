"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface OrderDetailsProps {
  orderId: string
}

export function OrderDetails({ orderId }: OrderDetailsProps) {
  const [order, setOrder] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch order details
    const fetchOrder = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      // const response = await fetch(`/api/orders/${orderId}`);
      // const data = await response.json();

      // Mock data for demonstration
      const mockOrder = {
        id: orderId,
        productId: "1",
        productName: "Wireless Headphones",
        productImage: "/placeholder.svg?height=200&width=200",
        customerId: "C001",
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        customerPhone: "+49 123 456789",
        sellerId: "S001",
        sellerName: "AudioTech",
        price: 199.99,
        quantity: 1,
        status: "Created",
        date: "2023-05-01",
        shippingAddress: {
          street: "123 Main St",
          city: "Berlin",
          postalCode: "10115",
          country: "Germany",
        },
        billingAddress: {
          street: "123 Main St",
          city: "Berlin",
          postalCode: "10115",
          country: "Germany",
        },
        paymentMethod: "Credit Card",
        hasInvoice: false,
      }

      setOrder(mockOrder)
      setLoading(false)
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p>Order not found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Order ID</dt>
              <dd className="text-sm font-semibold">{order.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Date</dt>
              <dd className="text-sm">{order.date}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Status</dt>
              <dd className="text-sm">
                <Badge
                  variant="outline"
                  className={
                    order.status === "Created"
                      ? "bg-blue-50 text-blue-700"
                      : order.status === "Accepted"
                        ? "bg-green-50 text-green-700"
                        : order.status === "Rejected"
                          ? "bg-red-50 text-red-700"
                          : order.status === "Shipping in progress"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                  }
                >
                  {order.status}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Payment Method</dt>
              <dd className="text-sm">{order.paymentMethod}</dd>
            </div>
          </dl>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Product</h4>
              <div className="mt-2 flex items-center space-x-4">
                <div className="relative h-16 w-16 overflow-hidden rounded border">
                  <Image
                    src={order.productImage || "/placeholder.svg"}
                    alt={order.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{order.productName}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Price Details</h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Price</span>
                  <span className="text-sm">€{order.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Quantity</span>
                  <span className="text-sm">x{order.quantity}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>€{(order.price * order.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer & Shipping Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Customer Information</h4>
              <div className="mt-2 space-y-1">
                <p className="font-medium">{order.customerName}</p>
                <p className="text-sm">{order.customerEmail}</p>
                <p className="text-sm">{order.customerPhone}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Shipping Address</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm">{order.shippingAddress.street}</p>
                <p className="text-sm">
                  {order.shippingAddress.postalCode} {order.shippingAddress.city}
                </p>
                <p className="text-sm">{order.shippingAddress.country}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Billing Address</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm">{order.billingAddress.street}</p>
                <p className="text-sm">
                  {order.billingAddress.postalCode} {order.billingAddress.city}
                </p>
                <p className="text-sm">{order.billingAddress.country}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Seller Information</h4>
              <div className="mt-2 space-y-1">
                <p className="font-medium">{order.sellerName}</p>
                <p className="text-sm">Seller ID: {order.sellerId}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
