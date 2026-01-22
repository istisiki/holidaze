import './Legend.css';

export function Legend() {
  return (
    <div className="legend">
      <div className="legend__title">Legend</div>
      <div className="legend__items">
        <div className="legend__item">
          <div className="legend__color legend__color--holiday" />
          <span className="legend__label">Holiday</span>
        </div>
        <div className="legend__item">
          <div className="legend__color legend__color--weekend" />
          <span className="legend__label">Weekend</span>
        </div>
        <div className="legend__item">
          <div className="legend__color legend__color--weekday" />
          <span className="legend__label">Weekday</span>
        </div>
      </div>
    </div>
  );
}
