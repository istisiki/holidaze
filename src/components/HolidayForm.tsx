import { useState, type FormEvent } from 'react';
import type { Holiday } from '../types/holiday';
import './HolidayForm.css';

interface HolidayFormProps {
  onAddHoliday: (holiday: Holiday) => void;
  year: number;
}

export function HolidayForm({ onAddHoliday, year }: HolidayFormProps) {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!date || !description.trim()) return;

    onAddHoliday({ date, description: description.trim() });
    setDate('');
    setDescription('');
  };

  const minDate = `${year}-01-01`;
  const maxDate = `${year}-12-31`;

  return (
    <form className="holiday-form" onSubmit={handleSubmit}>
      <h3 className="holiday-form__title">Add Holiday</h3>
      <div className="holiday-form__fields">
        <input
          type="date"
          className="holiday-form__input holiday-form__date"
          value={date}
          onChange={e => setDate(e.target.value)}
          min={minDate}
          max={maxDate}
          required
        />
        <input
          type="text"
          className="holiday-form__input holiday-form__description"
          placeholder="Holiday description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="holiday-form__button">
          Add
        </button>
      </div>
    </form>
  );
}
