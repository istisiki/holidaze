import { useState, type RefObject } from "react";
import { exportCalendarToPdf } from "../utils/exportPdf";
import "./ExportButton.css";

interface ExportButtonProps {
  calendarRef: RefObject<HTMLDivElement | null>;
  year: number;
}

export function ExportButton({ calendarRef, year }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!calendarRef.current || isExporting) return;

    setIsExporting(true);
    try {
      await exportCalendarToPdf(
        calendarRef.current,
        `holiday-calendar-${year}.pdf`,
      );
    } catch (error) {
      console.error("Failed to export PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      className="export-button"
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? "Exporting..." : "Export PDF"}
    </button>
  );
}
