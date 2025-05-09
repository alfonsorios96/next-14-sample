"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function OrderStatusUpdate() {
  const [currentStatus, setCurrentStatus] = useState("Created")
  const [newStatus, setNewStatus] = useState("")
  const [notes, setNotes] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateResult, setUpdateResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleStatusUpdate = async () => {
    if (!newStatus) return

    setIsUpdating(true)
    setUpdateResult(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, this would be an API call
    // const response = await fetch(`/api/orders/${orderId}/status`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: newStatus, notes }),
    // });
    // const data = await response.json();

    setCurrentStatus(newStatus)
    setUpdateResult({
      success: true,
      message: `Order status updated to ${newStatus}`,
    })
    setIsUpdating(false)
    setNotes("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Order Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {updateResult && (
          <Alert
            variant={updateResult.success ? "default" : "destructive"}
            className={updateResult.success ? "bg-green-50 text-green-800" : undefined}
          >
            {updateResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{updateResult.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{updateResult.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-status">Current Status</Label>
              <div
                id="current-status"
                className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm"
              >
                {currentStatus}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-status">New Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger id="new-status">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Created">Created</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Shipping in progress">Shipping in progress</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add notes about this status change"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button
            onClick={handleStatusUpdate}
            disabled={!newStatus || isUpdating || currentStatus === newStatus}
            className="w-full"
          >
            {isUpdating ? "Updating..." : "Update Status"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
