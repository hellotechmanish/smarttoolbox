import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const startTime = Number.parseFloat(formData.get("startTime") as string) || 0
    const endTime = Number.parseFloat(formData.get("endTime") as string) || 10

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Note: Audio trimming requires ffmpeg which needs server-side execution
    // This is a placeholder that returns the original file
    // In production, you would use fluent-ffmpeg with seek and duration options

    const bytes = await file.arrayBuffer()

    return new NextResponse(bytes, {
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="trimmed-${file.name}"`,
      },
    })
  } catch (error) {
    console.error("Audio trim error:", error)
    return NextResponse.json({ error: "Failed to trim audio" }, { status: 500 })
  }
}
