import "./ClearAll.css";
import type { Holiday } from "../types/holiday";

type Props = {
  holidays: Holiday[];
  onClick: () => void;
};
export function ClearAllButton({ holidays, onClick }: Props) {
  return (
    <button
      className="clear-all-button"
      onClick={onClick}
      disabled={holidays.length < 1}
    >
      Clear All
    </button>
  );
}
