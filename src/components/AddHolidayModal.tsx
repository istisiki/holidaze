import { useState, useEffect, useRef } from "react";
import "./AddHolidayModal.css";

interface AddHolidayModalProps {
  date: string;
  onSave: (description: string) => void;
  onCancel: () => void;
}

export function AddHolidayModal({
  date,
  onSave,
  onCancel,
}: AddHolidayModalProps) {
  const [description, setDescription] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSave(description.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <h2 className="modal__title">Add Holiday</h2>
        <p className="modal__date">{formatDisplayDate(date)}</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="modal__input"
            placeholder="Holiday name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="modal__buttons">
            <button
              type="button"
              className="modal__button modal__button--cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal__button modal__button--save"
              disabled={!description.trim()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
