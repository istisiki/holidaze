import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function exportCalendarToPdf(
  element: HTMLElement,
  filename: string = "holiday-calendar.pdf",
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // Add extra space at bottom for attribution (100px extra height)
  const extraHeight = 100;
  const pdfHeight = imgHeight + extraHeight;

  // Use landscape orientation for better fit
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [imgWidth, pdfHeight],
  });

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

  // Add attribution text at bottom of the extra space
  pdf.setFontSize(24);
  pdf.setTextColor(102, 102, 102); // #666 in RGB
  const attributionText = `© ${new Date().getFullYear()} Holidaze • Made with <3 by istisiki`;
  const textWidth = pdf.getTextWidth(attributionText);
  const centerX = imgWidth / 2 - textWidth / 2;
  const attributionY = imgHeight + 40; // 40px into the extra space
  pdf.text(attributionText, centerX, attributionY);

  pdf.save(filename);
}
