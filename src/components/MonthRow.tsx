import { DayCell } from "./DayCell";
import {
  getMonthName,
  getDaysInMonth,
  formatDate,
} from "../utils/calendarUtils";
import type { Holiday } from "../types/holiday";
import "./MonthRow.css";

interface MonthRowProps {
  year: number;
  month: number; // 0-indexed
  holidays: Holiday[];
  onRemoveHoliday?: (date: string) => void;
  onAddHoliday?: (date: string) => void;
}

export function MonthRow({
  year,
  month,
  holidays,
  onRemoveHoliday,
  onAddHoliday,
}: MonthRowProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const monthName = getMonthName(month);
  const MAX_DAYS = 31;

  const holidayMap = new Map<string, Holiday>();
  for (const h of holidays) {
    holidayMap.set(h.date, h);
  }

  const days = [];
  for (let day = 1; day <= MAX_DAYS; day++) {
    const isValid = day <= daysInMonth;
    const dateStr = formatDate(year, month, day);
    const holiday = isValid ? holidayMap.get(dateStr) : undefined;

    // Check if this day is a weekend (Saturday=6, Sunday=0)
    const dayOfWeek = isValid ? new Date(year, month, day).getDay() : 0;
    const isWeekend = isValid && (dayOfWeek === 0 || dayOfWeek === 6);

    days.push(
      <DayCell
        key={day}
        day={day}
        date={dateStr}
        isValid={isValid}
        isWeekend={isWeekend}
        holiday={holiday}
        onRemove={onRemoveHoliday}
        onAddHoliday={onAddHoliday}
      />,
    );
  }

  return (
    <div className="month-row">
      <div className="month-row__label">{monthName}</div>
      <div className="month-row__days">{days}</div>
    </div>
  );
}
