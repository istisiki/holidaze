import { forwardRef } from "react";
import { MonthRow } from "./MonthRow";
import { MonthGrid } from "./MonthGrid";
import { Legend } from "./Legend";
import { HolidayList } from "./HolidayList";
import { useIsMobile } from "../hooks/useIsMobile";
import type { Holiday } from "../types/holiday";
import "./Calendar.css";

interface CalendarProps {
  year: number;
  holidays: Holiday[];
  todayDateString?: string;
  onRemoveHoliday?: (date: string) => void;
  onAddHoliday?: (date: string) => void;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar({ year, holidays, todayDateString, onRemoveHoliday, onAddHoliday }, ref) {
    const isMobile = useIsMobile();
    const months = Array.from({ length: 12 }, (_, i) => i);

    // Create day headers (1-31) for desktop view
    const dayHeaders = Array.from({ length: 31 }, (_, i) => (
      <div key={i} className="calendar__day-header">
        {i + 1}
      </div>
    ));

    return (
      <div className="calendar" ref={ref}>
        <div className="calendar__header">
          <div className="calendar__year-title">{year} Holiday Calendar</div>
          <Legend />
        </div>
        {isMobile ? (
          <div className="calendar__mobile-grid">
            {months.map((month) => (
              <MonthGrid
                key={month}
                year={year}
                month={month}
                holidays={holidays}
                todayDateString={todayDateString}
                onRemoveHoliday={onRemoveHoliday}
                onAddHoliday={onAddHoliday}
              />
            ))}
          </div>
        ) : (
          <div className="calendar__grid">
            <div className="calendar__day-headers">
              <div className="calendar__month-spacer" />
              <div className="calendar__day-header-row">{dayHeaders}</div>
            </div>
            {months.map((month) => (
              <MonthRow
                key={month}
                year={year}
                month={month}
                holidays={holidays}
                todayDateString={todayDateString}
                onRemoveHoliday={onRemoveHoliday}
                onAddHoliday={onAddHoliday}
              />
            ))}
          </div>
        )}
        <HolidayList holidays={holidays} />
      </div>
    );
  },
);
