import { type NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (files.length < 2) {
      return NextResponse.json(
        { error: "At least 2 PDF files required" },
        { status: 400 }
      );
    }

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    // Merge all PDFs
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Save merged PDF
    const mergedBytes = await mergedPdf.save();

    // Return merged PDF (wrap bytes in a Blob)
    const ab = new Uint8Array(mergedBytes as any).buffer;
    const blob = new Blob([ab], { type: "application/pdf" });

    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="merged-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF merge error:", error);
    return NextResponse.json(
      { error: "Failed to merge PDFs" },
      { status: 500 }
    );
  }
}
