import type { Holiday } from "../types/holiday";
import { getMonthName } from "../utils/calendarUtils";
import "./HolidayList.css";

interface HolidayListProps {
  holidays: Holiday[];
}

function formatHolidayDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const monthName = getMonthName(month - 1);
  return `${monthName} ${day}, ${year}`;
}

export function HolidayList({ holidays }: HolidayListProps) {
  if (holidays.length === 0) {
    return null;
  }

  // Sort holidays by date
  const sortedHolidays = [...holidays].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return (
    <div className="holiday-list">
      <div className="holiday-list__title">Holidays</div>
      <ul className="holiday-list__items">
        {sortedHolidays.map((holiday) => (
          <li key={holiday.date} className="holiday-list__item">
            <span className="holiday-list__date">
              {formatHolidayDate(holiday.date)}
            </span>
            <span className="holiday-list__description">
              {holiday.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
