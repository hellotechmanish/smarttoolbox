import { type NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Get quality parameter (default 80)
    const quality = Number.parseInt(formData.get("quality") as string) || 80;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Compress image using sharp
    const compressedBuffer = await sharp(buffer)
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    // Return compressed image (convert Buffer to Uint8Array for NextResponse)
    const outputBytes = new Uint8Array(compressedBuffer);

    return new NextResponse(outputBytes, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="compressed-${file.name}"`,
      },
    });
  } catch (error) {
    console.error("Image compression error:", error);
    return NextResponse.json(
      { error: "Failed to compress image" },
      { status: 500 }
    );
  }
}
