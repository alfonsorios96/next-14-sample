import { OrderDetails } from "@/components/order-details"
import { InvoiceUpload } from "@/components/invoice-upload"
import { OrderStatusUpdate } from "@/components/order-status-update"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/orders">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Order #{params.id}</h1>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
          <TabsTrigger value="status">Status Management</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
          <OrderDetails orderId={params.id} />
        </TabsContent>
        <TabsContent value="invoice" className="mt-6">
          <InvoiceUpload orderId={params.id} />
        </TabsContent>
        <TabsContent value="status" className="mt-6">
          <OrderStatusUpdate orderId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
