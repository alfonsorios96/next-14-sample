"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OrderStatusFilter() {
  const [status, setStatus] = useState("all")

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Filter by:</span>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="created">Created</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
          <SelectItem value="shipping">Shipping in progress</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
