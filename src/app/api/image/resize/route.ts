import { type NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Get dimensions (default 800x600)
    const width = Number.parseInt(formData.get("width") as string) || 800;
    const height = Number.parseInt(formData.get("height") as string) || 600;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Resize image using sharp
    const resizedBuffer = await sharp(buffer)
      .resize(width, height, {
        fit: "inside",
        withoutEnlargement: false,
      })
      .toBuffer();

    // Return resized image (convert Buffer to Uint8Array for NextResponse)
    const outputBytes = new Uint8Array(resizedBuffer);

    return new NextResponse(outputBytes, {
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="resized-${file.name}"`,
      },
    });
  } catch (error) {
    console.error("Image resize error:", error);
    return NextResponse.json(
      { error: "Failed to resize image" },
      { status: 500 }
    );
  }
}
