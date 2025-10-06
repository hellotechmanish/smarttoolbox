import { type NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();

    // Load PDF
    const pdfDoc = await PDFDocument.load(bytes);

    // Save with compression
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });

    // Return compressed PDF (wrap bytes in a Blob for NextResponse)
    // Ensure we pass an ArrayBuffer (Blob expects ArrayBuffer or ArrayBufferView)
    // Create a new Uint8Array to ensure we have a real ArrayBuffer (not SharedArrayBuffer)
    const ab = new Uint8Array(compressedBytes as any).buffer;
    const blob = new Blob([ab], { type: "application/pdf" });

    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="compressed-${file.name}"`,
      },
    });
  } catch (error) {
    console.error("PDF compression error:", error);
    return NextResponse.json(
      { error: "Failed to compress PDF" },
      { status: 500 }
    );
  }
}
