import { useRef, useEffect, useState } from "react";
import { useHolidays } from "./hooks/useHolidays";
import { Calendar } from "./components/Calendar";
import { AddHolidayModal } from "./components/AddHolidayModal";
import { FileUpload } from "./components/FileUpload";
import { ExportButton } from "./components/ExportButton";
import { ShareButton } from "./components/ShareButton";
import { getHolidaysFromUrl, clearUrlHolidays } from "./utils/urlShare";
import "./App.css";
import { ClearAllButton } from "./components/ClearAll";

const CURRENT_YEAR = 2026;

function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function App() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const { holidays, addHoliday, removeHoliday, importHolidays, clearAll } =
    useHolidays();
  const todayDateString = getTodayDateString();
  const isTodayHoliday = holidays.some((h) => h.date === todayDateString);
  const [selectedDateForAdd, setSelectedDateForAdd] = useState<string | null>(
    null,
  );

  const handleAddHolidayClick = (date: string) => {
    setSelectedDateForAdd(date);
  };

  const handleModalSave = (description: string) => {
    if (selectedDateForAdd) {
      addHoliday({ date: selectedDateForAdd, description });
      setSelectedDateForAdd(null);
    }
  };

  const handleModalCancel = () => {
    setSelectedDateForAdd(null);
  };

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
        <p
          className={`app__subtitle app__#{isTodayHoliday ? "holiday" : "not-holiday"}`}
        >
          {isTodayHoliday
            ? "🎉 YES!!! It's a holiday. Uninstall Slack, relax, and chill out. 🎉"
            : "😢 Boo hoo! You have to work today. 😢"}
        </p>
      </header>

      <div className="app__controls">
        <div className="app__input-section">
          <div className="app__instructions">
            <h3 className="app__instructions-title">Add Holiday</h3>
            <div className="app__instructions-content">
              <p>Click on any date to add a holiday</p>
              <p>Click on a holiday to remove it</p>
            </div>
          </div>
          <div className="app__separator">or</div>
          <FileUpload onImport={importHolidays} />
        </div>
        <div className="app__actions">
          <ShareButton holidays={holidays} />
          <ExportButton calendarRef={calendarRef} year={CURRENT_YEAR} />
          <ClearAllButton holidays={holidays} onClick={clearAll} />
        </div>
      </div>

      <main className="app__main">
        <Calendar
          ref={calendarRef}
          year={CURRENT_YEAR}
          holidays={holidays}
          todayDateString={todayDateString}
          onRemoveHoliday={removeHoliday}
          onAddHoliday={handleAddHolidayClick}
        />
      </main>

      {selectedDateForAdd && (
        <AddHolidayModal
          date={selectedDateForAdd}
          onSave={handleModalSave}
          onCancel={handleModalCancel}
        />
      )}

      <div className="app__status">
        <p className="app__holiday-count">
          {holidays.length} holiday{holidays.length !== 1 ? "s" : ""} marked
        </p>
      </div>
      <footer className="app__footer">
        <p>
          &copy; 2026 Holidaze • Made with ❤️ by{" "}
          <a href="https://github.com/istisiki">istisiki</a> •
        </p>
      </footer>
    </div>
  );
}

export default App;
