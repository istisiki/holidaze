import { useRef, useEffect } from 'react';
import { useHolidays } from './hooks/useHolidays';
import { Calendar } from './components/Calendar';
import { HolidayForm } from './components/HolidayForm';
import { FileUpload } from './components/FileUpload';
import { ExportButton } from './components/ExportButton';
import { ShareButton } from './components/ShareButton';
import { getHolidaysFromUrl, clearUrlHolidays } from './utils/urlShare';
import './App.css';

const CURRENT_YEAR = 2026;

function App() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const { holidays, addHoliday, removeHoliday, importHolidays, clearAll } = useHolidays();

  useEffect(() => {
    const urlHolidays = getHolidaysFromUrl();
    if (urlHolidays.length > 0) {
      importHolidays(urlHolidays);
      clearUrlHolidays();
    }
  }, [importHolidays]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Holidaze</h1>
        <p className="app__subtitle">Holiday Calendar Visualizer</p>
      </header>

      <div className="app__controls">
        <div className="app__input-section">
          <HolidayForm onAddHoliday={addHoliday} year={CURRENT_YEAR} />
          <FileUpload onImport={importHolidays} />
        </div>
        <div className="app__actions">
          <ShareButton holidays={holidays} />
          <ExportButton calendarRef={calendarRef} year={CURRENT_YEAR} />
          {holidays.length > 0 && (
            <button className="app__clear-button" onClick={clearAll}>
              Clear All
            </button>
          )}
        </div>
      </div>

      <main className="app__main">
        <Calendar
          ref={calendarRef}
          year={CURRENT_YEAR}
          holidays={holidays}
          onRemoveHoliday={removeHoliday}
        />
      </main>

      <footer className="app__footer">
        <p className="app__holiday-count">
          {holidays.length} holiday{holidays.length !== 1 ? 's' : ''} marked
        </p>
        <p className="app__hint">Click on a holiday to remove it</p>
      </footer>
    </div>
  );
}

export default App;
