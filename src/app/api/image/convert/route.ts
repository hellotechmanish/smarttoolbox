import { type NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const format = (formData.get("format") as string) || "png";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert image format
    let convertedBuffer: Buffer;
    const sharpInstance = sharp(buffer);

    switch (format.toLowerCase()) {
      case "png":
        convertedBuffer = await sharpInstance.png().toBuffer();
        break;
      case "jpg":
      case "jpeg":
        convertedBuffer = await sharpInstance.jpeg().toBuffer();
        break;
      case "webp":
        convertedBuffer = await sharpInstance.webp().toBuffer();
        break;
      default:
        return NextResponse.json(
          { error: "Unsupported format" },
          { status: 400 }
        );
    }

    // Return converted image (convert Buffer to Uint8Array for NextResponse)
    const outputBytes = new Uint8Array(convertedBuffer);

    return new NextResponse(outputBytes, {
      headers: {
        "Content-Type": `image/${format}`,
        "Content-Disposition": `attachment; filename="converted.${format}"`,
      },
    });
  } catch (error) {
    console.error("Image conversion error:", error);
    return NextResponse.json(
      { error: "Failed to convert image" },
      { status: 500 }
    );
  }
}
