import { useState, useCallback } from 'react';
import type { Holiday } from '../types/holiday';

export interface UseHolidaysReturn {
  holidays: Holiday[];
  addHoliday: (holiday: Holiday) => void;
  removeHoliday: (date: string) => void;
  importHolidays: (holidays: Holiday[]) => void;
  clearAll: () => void;
  getHolidayByDate: (date: string) => Holiday | undefined;
}

export function useHolidays(): UseHolidaysReturn {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const addHoliday = useCallback((holiday: Holiday) => {
    setHolidays(prev => {
      // Replace if same date exists, otherwise add
      const existing = prev.findIndex(h => h.date === holiday.date);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = holiday;
        return updated;
      }
      return [...prev, holiday];
    });
  }, []);

  const removeHoliday = useCallback((date: string) => {
    setHolidays(prev => prev.filter(h => h.date !== date));
  }, []);

  const importHolidays = useCallback((newHolidays: Holiday[]) => {
    setHolidays(prev => {
      const map = new Map<string, Holiday>();
      // Add existing holidays
      for (const h of prev) {
        map.set(h.date, h);
      }
      // Overwrite with new holidays
      for (const h of newHolidays) {
        map.set(h.date, h);
      }
      return Array.from(map.values());
    });
  }, []);

  const clearAll = useCallback(() => {
    setHolidays([]);
  }, []);

  const getHolidayByDate = useCallback((date: string): Holiday | undefined => {
    return holidays.find(h => h.date === date);
  }, [holidays]);

  return {
    holidays,
    addHoliday,
    removeHoliday,
    importHolidays,
    clearAll,
    getHolidayByDate
  };
}
