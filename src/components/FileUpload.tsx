import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { parseHolidayFile } from "../utils/parseHolidayFile";
import type { Holiday } from "../types/holiday";
import "./FileUpload.css";

interface FileUploadProps {
  onImport: (holidays: Holiday[]) => void;
}

export function FileUpload({ onImport }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.name.endsWith(".txt")) {
      setMessage("Please upload a .txt file");
      return;
    }

    try {
      const content = await file.text();
      const holidays = parseHolidayFile(content);
      if (holidays.length === 0) {
        setMessage("No valid holidays found in file");
      } else {
        onImport(holidays);
        setMessage(`Imported ${holidays.length} holiday(s)`);
      }
    } catch {
      setMessage("Error reading file");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="file-upload">
      <h3 className="file-upload__title">Import File</h3>
      <div
        className={`file-upload__dropzone ${isDragging ? "file-upload__dropzone--dragging" : ""}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".txt"
          className="file-upload__input"
          onChange={handleFileChange}
        />
        <p className="file-upload__text">
          Drop a .txt file here or click to browse
        </p>
        <p className="file-upload__format">Format: YYYY-MM-DD: Holiday Name</p>
        <p className="file-upload__format">One holiday per line</p>
      </div>
      {message && <p className="file-upload__message">{message}</p>}
    </div>
  );
}
