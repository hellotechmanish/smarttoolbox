"use client"

import * as React from "react"
import { Upload, X, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatFileSize } from "@/lib/file-handler"

interface UploadBoxProps {
  onFileSelect: (files: File[]) => void
  acceptedTypes?: string[]
  maxFiles?: number
  multiple?: boolean
  children?: React.ReactNode
}

export function UploadBox({
  onFileSelect,
  acceptedTypes = ["*"],
  maxFiles = 1,
  multiple = false,
  children,
}: UploadBoxProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files).slice(0, maxFiles)
    if (files.length > 0) {
      setSelectedFiles(files)
      onFileSelect(files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).slice(0, maxFiles) : []
    if (files.length > 0) {
      setSelectedFiles(files)
      onFileSelect(files)
    }
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    onFileSelect(newFiles)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes.join(",")}
          multiple={multiple}
          onChange={handleFileInput}
        />

        {children || (
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium">Drop files here or click to upload</p>
              <p className="text-sm text-muted-foreground">
                {acceptedTypes[0] === "*" ? "Any file type" : acceptedTypes.join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
              <div className="flex items-center gap-3">
                <div className="rounded bg-primary/10 p-2">
                  <File className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFile(index)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
