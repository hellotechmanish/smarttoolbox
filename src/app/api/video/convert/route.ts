import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const format = (formData.get("format") as string) || "mp4"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Note: Video conversion requires ffmpeg which needs server-side execution
    // This is a placeholder that returns the original file
    // In production, you would use fluent-ffmpeg to convert formats

    const bytes = await file.arrayBuffer()

    return new NextResponse(bytes, {
      headers: {
        "Content-Type": `video/${format}`,
        "Content-Disposition": `attachment; filename="converted.${format}"`,
      },
    })
  } catch (error) {
    console.error("Video conversion error:", error)
    return NextResponse.json({ error: "Failed to convert video" }, { status: 500 })
  }
}
