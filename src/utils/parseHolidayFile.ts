import type { Holiday } from "../types/holiday";

export function parseHolidayFile(content: string): Holiday[] {
  const lines = content.split("\n");
  const holidays: Holiday[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Expected format: YYYY-MM-DD: Holiday Name
    const match = trimmed.match(/^(\d{4}-\d{2}-\d{2}):\s*(.+)$/);
    if (match) {
      const [, date, description] = match;
      holidays.push({ date, description });
    }
  }

  return holidays;
}
