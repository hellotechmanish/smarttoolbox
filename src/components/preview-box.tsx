"use client"
import { FileText, ImageIcon, Music } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PreviewBoxProps {
  file: File | null
  previewUrl?: string
  type?: "image" | "video" | "audio" | "pdf" | "text"
}

export function PreviewBox({ file, previewUrl, type }: PreviewBoxProps) {
  if (!file && !previewUrl) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground">No file selected</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderPreview = () => {
    if (type === "image" && previewUrl) {
      return (
        <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="h-full w-full rounded-lg object-contain" />
      )
    }

    if (type === "video" && previewUrl) {
      return (
        <video src={previewUrl} controls className="h-full w-full rounded-lg">
          Your browser does not support the video tag.
        </video>
      )
    }

    if (type === "audio" && previewUrl) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <Music className="h-16 w-16 text-muted-foreground" />
          <audio src={previewUrl} controls className="w-full">
            Your browser does not support the audio tag.
          </audio>
        </div>
      )
    }

    if (type === "pdf") {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <FileText className="h-16 w-16 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{file?.name}</p>
        </div>
      )
    }

    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <ImageIcon className="h-16 w-16 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{file?.name}</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex min-h-64 items-center justify-center rounded-lg bg-muted p-4">{renderPreview()}</div>
      </CardContent>
    </Card>
  )
}
