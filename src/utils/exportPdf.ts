import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportCalendarToPdf(
  element: HTMLElement,
  filename: string = 'holiday-calendar.pdf'
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // Use landscape orientation for better fit
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [imgWidth, imgHeight]
  });

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(filename);
}
