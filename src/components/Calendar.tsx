import { forwardRef } from 'react';
import { MonthRow } from './MonthRow';
import { Legend } from './Legend';
import { HolidayList } from './HolidayList';
import type { Holiday } from '../types/holiday';
import './Calendar.css';

interface CalendarProps {
  year: number;
  holidays: Holiday[];
  onRemoveHoliday?: (date: string) => void;
  onAddHoliday?: (date: string) => void;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar({ year, holidays, onRemoveHoliday, onAddHoliday }, ref) {
    const months = Array.from({ length: 12 }, (_, i) => i);

    // Create day headers (1-31)
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
        <div className="calendar__grid">
          <div className="calendar__day-headers">
            <div className="calendar__month-spacer" />
            <div className="calendar__day-header-row">{dayHeaders}</div>
          </div>
          {months.map(month => (
            <MonthRow
              key={month}
              year={year}
              month={month}
              holidays={holidays}
              onRemoveHoliday={onRemoveHoliday}
              onAddHoliday={onAddHoliday}
            />
          ))}
        </div>
        <HolidayList holidays={holidays} />
      </div>
    );
  }
);
