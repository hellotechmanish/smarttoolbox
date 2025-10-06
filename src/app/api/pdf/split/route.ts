import { type NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const pageNumber =
      Number.parseInt(formData.get("pageNumber") as string) || 1;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);

    // Create new PDF with single page
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNumber - 1]);
    newPdf.addPage(copiedPage);

    // Save split PDF
    const splitBytes = await newPdf.save();

    // Return split PDF (wrap bytes in a Blob)
    const ab = new Uint8Array(splitBytes as any).buffer;
    const blob = new Blob([ab], { type: "application/pdf" });

    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="page-${pageNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF split error:", error);
    return NextResponse.json({ error: "Failed to split PDF" }, { status: 500 });
  }
}
