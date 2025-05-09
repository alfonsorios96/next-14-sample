"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, FileText, Eye } from "lucide-react"

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    productId: "1",
    productName: "Wireless Headphones",
    customerId: "C001",
    customerName: "John Doe",
    sellerId: "S001",
    sellerName: "AudioTech",
    price: 199.99,
    quantity: 1,
    status: "Created",
    date: "2023-05-01",
    hasInvoice: false,
  },
  {
    id: "ORD-002",
    productId: "2",
    productName: "Smart Watch",
    customerId: "C002",
    customerName: "Jane Smith",
    sellerId: "S002",
    sellerName: "TechWear",
    price: 249.99,
    quantity: 1,
    status: "Accepted",
    date: "2023-05-02",
    hasInvoice: false,
  },
  {
    id: "ORD-003",
    productId: "3",
    productName: "Bluetooth Speaker",
    customerId: "C003",
    customerName: "Robert Johnson",
    sellerId: "S001",
    sellerName: "AudioTech",
    price: 89.99,
    quantity: 2,
    status: "Shipping in progress",
    date: "2023-05-03",
    hasInvoice: true,
  },
  {
    id: "ORD-004",
    productId: "4",
    productName: "Laptop",
    customerId: "C004",
    customerName: "Emily Davis",
    sellerId: "S003",
    sellerName: "ComputerPro",
    price: 1299.99,
    quantity: 1,
    status: "Shipped",
    date: "2023-05-04",
    hasInvoice: true,
  },
  {
    id: "ORD-005",
    productId: "5",
    productName: "Smartphone",
    customerId: "C005",
    customerName: "Michael Wilson",
    sellerId: "S004",
    sellerName: "MobileTech",
    price: 899.99,
    quantity: 1,
    status: "Rejected",
    date: "2023-05-05",
    hasInvoice: false,
  },
]

interface OrdersTableProps {
  status?: string
}

export function OrdersTable({ status }: OrdersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus = status ? order.status === status : true
    const matchesSearch = searchTerm
      ? order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      : true

    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8 w-full md:max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="hidden md:table-cell">Customer</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Invoice</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.customerName}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                  <TableCell>€{(order.price * order.quantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.hasInvoice ? (
                      <Badge variant="outline" className="bg-green-50">
                        <FileText className="mr-1 h-3 w-3" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50">
                        None
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/orders/${order.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function OrderStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Created":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          Created
        </Badge>
      )
    case "Accepted":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700">
          Accepted
        </Badge>
      )
    case "Rejected":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700">
          Rejected
        </Badge>
      )
    case "Shipping in progress":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700">
          Shipping
        </Badge>
      )
    case "Shipped":
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
          Shipped
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
