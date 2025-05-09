import { OrdersTable } from "@/components/orders-table"
import { OrderStatusFilter } from "@/components/order-status-filter"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <Button>Export Orders</Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <OrderStatusFilter />
        </div>

        <TabsContent value="all" className="mt-6">
          <OrdersTable />
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <OrdersTable status="Created" />
        </TabsContent>
        <TabsContent value="accepted" className="mt-6">
          <OrdersTable status="Accepted" />
        </TabsContent>
        <TabsContent value="shipping" className="mt-6">
          <OrdersTable status="Shipping in progress" />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <OrdersTable status="Shipped" />
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
          <OrdersTable status="Rejected" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
