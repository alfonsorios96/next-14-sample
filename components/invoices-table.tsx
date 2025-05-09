"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Download } from "lucide-react"

// Mock data for invoices
const mockInvoices = [
  {
    id: "INV-001",
    orderId: "ORD-003",
    orderDate: "2023-05-03",
    customerName: "Robert Johnson",
    amount: 179.98,
    uploadDate: "2023-05-10",
    sentDate: null,
  },
  {
    id: "INV-002",
    orderId: "ORD-004",
    orderDate: "2023-05-04",
    customerName: "Emily Davis",
    amount: 1299.99,
    uploadDate: "2023-05-10",
    sentDate: "2023-05-12",
  },
]

export function InvoicesTable() {
  const [invoices] = useState(mockInvoices)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead className="hidden md:table-cell">Customer</TableHead>
            <TableHead className="hidden md:table-cell">Order Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No invoices found
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>
                  <Link href={`/orders/${invoice.orderId}`} className="text-primary hover:underline">
                    {invoice.orderId}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">{invoice.customerName}</TableCell>
                <TableCell className="hidden md:table-cell">{invoice.orderDate}</TableCell>
                <TableCell>€{invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={invoice.sentDate ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}
                  >
                    <FileText className="mr-1 h-3 w-3" />
                    {invoice.sentDate ? "Sent" : "Not Sent"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button size="icon" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button asChild size="icon" variant="ghost">
                      <Link href={`/orders/${invoice.orderId}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
