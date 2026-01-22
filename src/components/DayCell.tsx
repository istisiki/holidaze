import { useState, useEffect, useCallback } from "react";
import type { Holiday } from "../types/holiday";
import "./DayCell.css";

interface DayCellProps {
  day: number;
  date: string;
  isValid: boolean;
  isWeekend: boolean;
  isToday: boolean;
  holiday: Holiday | undefined;
  onRemove?: (date: string) => void;
  onAddHoliday?: (date: string) => void;
}

export function DayCell({
  day,
  date,
  isValid,
  isWeekend,
  isToday,
  holiday,
  onRemove,
  onAddHoliday,
}: DayCellProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Auto-hide tooltip on mobile after 2 seconds
  useEffect(() => {
    if (showTooltip && holiday) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip, holiday]);

  const handleClick = useCallback(() => {
    if (holiday && onRemove) {
      onRemove(holiday.date);
    } else if (!holiday && onAddHoliday) {
      onAddHoliday(date);
    }
  }, [holiday, onRemove, onAddHoliday, date]);

  const handleTouchStart = useCallback(() => {
    if (holiday) {
      setShowTooltip(true);
    }
  }, [holiday]);

  if (!isValid) {
    return <div className="day-cell day-cell--invalid" />;
  }

  const classNames = ["day-cell", "day-cell--clickable"];
  if (isWeekend) classNames.push("day-cell--weekend");
  if (holiday) classNames.push("day-cell--holiday");
  if (isToday) classNames.push("day-cell--today");

  return (
    <div
      className={classNames.join(" ")}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      title={holiday?.description}
    >
      <span className="day-cell__number">{day}</span>
      {holiday && showTooltip && (
        <div className="day-cell__tooltip">{holiday.description}</div>
      )}
    </div>
  );
}
