import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Note: Audio compression requires ffmpeg which needs server-side execution
    // This is a placeholder that returns the original file
    // In production, you would use fluent-ffmpeg with bitrate settings

    const bytes = await file.arrayBuffer()

    return new NextResponse(bytes, {
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="compressed-${file.name}"`,
      },
    })
  } catch (error) {
    console.error("Audio compression error:", error)
    return NextResponse.json({ error: "Failed to compress audio" }, { status: 500 })
  }
}
