import { DayCell } from "./DayCell";
import {
  getMonthName,
  getDaysInMonth,
  formatDate,
} from "../utils/calendarUtils";
import type { Holiday } from "../types/holiday";
import "./MonthGrid.css";

interface MonthGridProps {
  year: number;
  month: number; // 0-indexed
  holidays: Holiday[];
  todayDateString?: string;
  onRemoveHoliday?: (date: string) => void;
  onAddHoliday?: (date: string) => void;
}

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function MonthGrid({
  year,
  month,
  holidays,
  todayDateString,
  onRemoveHoliday,
  onAddHoliday,
}: MonthGridProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const monthName = getMonthName(month);

  // Get the day of week for the first day of the month (0 = Sunday)
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const holidayMap = new Map<string, Holiday>();
  for (const h of holidays) {
    holidayMap.set(h.date, h);
  }

  // Build the grid with leading empty cells for alignment
  const cells = [];

  // Add empty cells for days before the first of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(
      <div key={`empty-${i}`} className="month-grid__empty-cell" />
    );
  }

  // Add the actual day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(year, month, day);
    const holiday = holidayMap.get(dateStr);
    const dayOfWeek = new Date(year, month, day).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    cells.push(
      <DayCell
        key={day}
        day={day}
        date={dateStr}
        isValid={true}
        isWeekend={isWeekend}
        isToday={dateStr === todayDateString}
        holiday={holiday}
        onRemove={onRemoveHoliday}
        onAddHoliday={onAddHoliday}
      />
    );
  }

  return (
    <div className="month-grid">
      <div className="month-grid__header">{monthName}</div>
      <div className="month-grid__weekdays">
        {WEEKDAY_NAMES.map((name) => (
          <div key={name} className="month-grid__weekday">
            {name}
          </div>
        ))}
      </div>
      <div className="month-grid__days">{cells}</div>
    </div>
  );
}
