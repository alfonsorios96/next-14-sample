import { InvoicesTable } from "@/components/invoices-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function InvoicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search invoices..." className="pl-8 w-[250px]" />
          </div>
          <Button>Export Invoices</Button>
        </div>
      </div>

      <InvoicesTable />
    </div>
  )
}
