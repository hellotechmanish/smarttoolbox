"use client"

import * as React from "react"
import { Download, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadBox } from "@/components/upload-box"
import { PreviewBox } from "@/components/preview-box"
import { useToast } from "@/hooks/use-toast"
import { createDownloadLink, readFileAsDataURL } from "@/lib/file-handler"
import type { Tool } from "@/lib/constants"

interface ToolUIProps {
  tool: Tool
}

export function ToolUI({ tool }: ToolUIProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string>("")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [processedBlob, setProcessedBlob] = React.useState<Blob | null>(null)
  const { toast } = useToast()

  const handleFileSelect = async (files: File[]) => {
    if (files.length === 0) {
      setSelectedFile(null)
      setPreviewUrl("")
      return
    }

    const file = files[0]
    setSelectedFile(file)

    // Generate preview for images
    if (file.type.startsWith("image/")) {
      const url = await readFileAsDataURL(file)
      setPreviewUrl(url)
    } else if (file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else if (file.type.startsWith("audio/")) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleProcess = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to process",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      // Determine API endpoint based on tool category
      let endpoint = ""
      if (tool.category === "image") {
        if (tool.slug === "image-compressor") {
          endpoint = "/api/image/compress"
        } else if (tool.slug === "image-resizer") {
          endpoint = "/api/image/resize"
        }
      } else if (tool.category === "pdf") {
        if (tool.slug === "pdf-compressor") {
          endpoint = "/api/pdf/compress"
        } else if (tool.slug === "pdf-merger") {
          endpoint = "/api/pdf/merge"
        }
      }

      if (!endpoint) {
        toast({
          title: "Coming Soon",
          description: "This tool is currently under development",
        })
        setIsProcessing(false)
        return
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Processing failed")
      }

      const blob = await response.blob()
      setProcessedBlob(blob)

      toast({
        title: "Success",
        description: "File processed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (processedBlob && selectedFile) {
      const extension = selectedFile.name.split(".").pop()
      const filename = `processed-${Date.now()}.${extension}`
      createDownloadLink(processedBlob, filename)
    }
  }

  const getFileType = (): "image" | "video" | "audio" | "pdf" | "text" => {
    if (!selectedFile) return "image"
    if (selectedFile.type.startsWith("image/")) return "image"
    if (selectedFile.type.startsWith("video/")) return "video"
    if (selectedFile.type.startsWith("audio/")) return "audio"
    if (selectedFile.type.includes("pdf")) return "pdf"
    return "text"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
          <CardDescription>Select a file to process with {tool.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <UploadBox onFileSelect={handleFileSelect} multiple={false} />

          <div className="mt-4 flex gap-2">
            <Button onClick={handleProcess} disabled={!selectedFile || isProcessing} className="flex-1">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Process File"
              )}
            </Button>

            {processedBlob && (
              <Button onClick={handleDownload} variant="secondary">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <PreviewBox file={selectedFile} previewUrl={previewUrl} type={getFileType()} />
    </div>
  )
}
