"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FileText, Upload, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface InvoiceUploadProps {
  orderId: string
}

export function InvoiceUpload({ orderId }: InvoiceUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const [invoice, setInvoice] = useState<{
    id: string
    filename: string
    uploadDate: string
    sentDate: string | null
  } | null>(null)

  // Simulate fetching invoice data
  useState(() => {
    // In a real app, this would be an API call
    // const fetchInvoice = async () => {
    //   const response = await fetch(`/api/orders/${orderId}/invoice`);
    //   if (response.ok) {
    //     const data = await response.json();
    //     setInvoice(data);
    //   }
    // };
    // fetchInvoice();

    // Mock data for demonstration
    if (orderId === "ORD-003" || orderId === "ORD-004") {
      setInvoice({
        id: `INV-${orderId.split("-")[1]}`,
        filename: "invoice.pdf",
        uploadDate: "2023-05-10",
        sentDate: orderId === "ORD-004" ? "2023-05-12" : null,
      })
    }
  }, [orderId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadResult(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, this would be an API call
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await fetch(`/api/orders/${orderId}/invoice`, {
    //   method: 'POST',
    //   body: formData,
    // });
    // const data = await response.json();

    setInvoice({
      id: `INV-${Math.floor(Math.random() * 1000)}`,
      filename: file.name,
      uploadDate: new Date().toISOString().split("T")[0],
      sentDate: null,
    })

    setUploadResult({
      success: true,
      message: "Invoice uploaded successfully",
    })
    setIsUploading(false)
    setFile(null)
  }

  const handleSendInvoice = async () => {
    if (!invoice) return

    setIsUploading(true)
    setUploadResult(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, this would be an API call
    // const response = await fetch(`/api/orders/${orderId}/invoice/send`, {
    //   method: 'POST',
    // });
    // const data = await response.json();

    setInvoice({
      ...invoice,
      sentDate: new Date().toISOString().split("T")[0],
    })

    setUploadResult({
      success: true,
      message: "Invoice sent successfully",
    })
    setIsUploading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {uploadResult && (
          <Alert
            variant={uploadResult.success ? "default" : "destructive"}
            className={uploadResult.success ? "bg-green-50 text-green-800" : undefined}
          >
            {uploadResult.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{uploadResult.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{uploadResult.message}</AlertDescription>
          </Alert>
        )}

        {invoice ? (
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Invoice #{invoice.id}</h3>
                    <p className="text-sm text-muted-foreground">{invoice.filename}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={invoice.sentDate ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}
                >
                  {invoice.sentDate ? "Sent" : "Not Sent"}
                </Badge>
              </div>

              <Separator className="my-4" />

              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-medium text-muted-foreground">Upload Date</dt>
                  <dd>{invoice.uploadDate}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Sent Date</dt>
                  <dd>{invoice.sentDate || "Not sent yet"}</dd>
                </div>
              </dl>

              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Download
                </Button>
                {!invoice.sentDate && (
                  <Button size="sm" onClick={handleSendInvoice} disabled={isUploading}>
                    {isUploading ? "Sending..." : "Send Invoice"}
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-4 text-sm font-medium">Upload New Version</h3>
              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="invoice-file">Invoice PDF</Label>
                  <Input id="invoice-file" type="file" accept=".pdf" onChange={handleFileChange} />
                </div>
                <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full max-w-sm">
                  {isUploading ? (
                    "Uploading..."
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Version
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-dashed p-8 text-center">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No Invoice Uploaded</h3>
              <p className="mt-1 text-sm text-muted-foreground">Upload an invoice PDF for this order</p>
            </div>

            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="invoice-file">Invoice PDF</Label>
                <Input id="invoice-file" type="file" accept=".pdf" onChange={handleFileChange} />
              </div>
              <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full">
                {isUploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Invoice
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
