import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './CustomDatePicker.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * Parse MM/DD/YYYY string to Date
 */
export const parseDisplayDate = (str) => {
  if (!str || typeof str !== 'string') return null;
  const parts = str.trim().split('/');
  if (parts.length !== 3) return null;
  const m = parseInt(parts[0], 10);
  const d = parseInt(parts[1], 10);
  const y = parseInt(parts[2], 10);
  if (isNaN(m) || isNaN(d) || isNaN(y)) return null;
  if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1900 || y > 2100) return null;

  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return null;
  }
  return date;
};

/**
 * Safe date parsing function handling string, Date, timestamp
 */
export const parseAnyDate = (val) => {
  if (!val) return null;
  if (val instanceof Date) {
    return isNaN(val.getTime()) ? null : val;
  }
  if (typeof val === 'number') {
    const dt = new Date(val);
    return isNaN(dt.getTime()) ? null : dt;
  }
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!trimmed) return null;
    if (trimmed.includes('/')) {
      return parseDisplayDate(trimmed);
    }
    const datePart = trimmed.split('T')[0];
    const parts = datePart.split('-');
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      if (!isNaN(y) && !isNaN(m) && !isNaN(d) && y > 1900 && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
        const dt = new Date(y, m - 1, d);
        return isNaN(dt.getTime()) ? null : dt;
      }
    }
    const dt = new Date(trimmed);
    return isNaN(dt.getTime()) ? null : dt;
  }
  return null;
};

/**
 * Format Date or string to YYYY-MM-DD
 */
export const toISODateString = (dateInput) => {
  if (!dateInput) return '';
  const date = parseAnyDate(dateInput);
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

/**
 * Format YYYY-MM-DD, ISO, or Date object to MM/DD/YYYY
 */
export const toDisplayDateString = (dateInput) => {
  if (!dateInput) return '';
  if (typeof dateInput === 'string') {
    const trimmed = dateInput.trim();
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) return trimmed;
    const datePart = trimmed.split('T')[0];
    const parts = datePart.split('-');
    if (parts.length === 3) {
      const [y, m, d] = parts;
      const parsedY = parseInt(y, 10);
      const parsedM = parseInt(m, 10);
      const parsedD = parseInt(d, 10);
      if (!isNaN(parsedY) && !isNaN(parsedM) && !isNaN(parsedD)) {
        return `${String(parsedM).padStart(2, '0')}/${String(parsedD).padStart(2, '0')}/${parsedY}`;
      }
    }
  }
  const date = parseAnyDate(dateInput);
  if (!date) return '';
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const y = date.getFullYear();
  return `${m}/${d}/${y}`;
};

/**
 * CustomDatePicker Component
 */
const CustomDatePicker = ({
  name,
  value = '',
  onChange,
  isDOB = false,
  minDate,
  maxDate,
  required = false,
  placeholder = 'MM/DD/YYYY',
  disabled = false,
  className = '',
  id,
  style = {},
}) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Dynamic 18-year cutoff date: today minus 18 years
  const eighteenYearsAgo = useMemo(() => {
    const today = new Date();
    return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  }, []);

  // Compute effective maxDate and minDate
  const effectiveMaxDate = useMemo(() => {
    if (isDOB) {
      if (maxDate) {
        const customMax = parseAnyDate(maxDate);
        if (customMax && customMax < eighteenYearsAgo) return customMax;
      }
      return eighteenYearsAgo;
    }
    return maxDate ? parseAnyDate(maxDate) : null;
  }, [isDOB, maxDate, eighteenYearsAgo]);

  const effectiveMinDate = useMemo(() => {
    return minDate ? parseAnyDate(minDate) : null;
  }, [minDate]);

  // Selected date as Date object
  const selectedDateObj = useMemo(() => {
    return parseAnyDate(value);
  }, [value]);

  // Default initial view year and month
  const initialYearMonth = useMemo(() => {
    if (selectedDateObj) {
      return { year: selectedDateObj.getFullYear(), month: selectedDateObj.getMonth() };
    }
    if (isDOB) {
      return { year: eighteenYearsAgo.getFullYear(), month: eighteenYearsAgo.getMonth() };
    }
    const today = new Date();
    return { year: today.getFullYear(), month: today.getMonth() };
  }, [selectedDateObj, isDOB, eighteenYearsAgo]);

  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(initialYearMonth.year);
  const [viewMonth, setViewMonth] = useState(initialYearMonth.month);
  const [typedText, setTypedText] = useState(toDisplayDateString(value));
  const [validationError, setValidationError] = useState('');

  // Keep typedText in sync if external value changes
  useEffect(() => {
    const displayVal = toDisplayDateString(value);
    setTypedText(displayVal);
    if (!displayVal) {
      setValidationError('');
    }
  }, [value]);

  // Keep viewYear & viewMonth in sync when selected date changes or is opened
  useEffect(() => {
    if (selectedDateObj) {
      setViewYear(selectedDateObj.getFullYear());
      setViewMonth(selectedDateObj.getMonth());
    } else if (isDOB) {
      setViewYear(eighteenYearsAgo.getFullYear());
      setViewMonth(eighteenYearsAgo.getMonth());
    }
  }, [selectedDateObj, isDOB, eighteenYearsAgo]);

  // Close calendar on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Bulletproof guaranteed year and month (NEVER NaN or undefined)
  const currentViewYear = useMemo(() => {
    const y = parseInt(viewYear, 10);
    if (!isNaN(y) && y > 1900) return y;
    if (selectedDateObj) return selectedDateObj.getFullYear();
    if (isDOB) return eighteenYearsAgo.getFullYear();
    return new Date().getFullYear();
  }, [viewYear, selectedDateObj, isDOB, eighteenYearsAgo]);

  const currentViewMonth = useMemo(() => {
    const m = parseInt(viewMonth, 10);
    if (!isNaN(m) && m >= 0 && m <= 11) return m;
    if (selectedDateObj) return selectedDateObj.getMonth();
    if (isDOB) return eighteenYearsAgo.getMonth();
    return new Date().getMonth();
  }, [viewMonth, selectedDateObj, isDOB, eighteenYearsAgo]);

  // Year options for the Year <select> dropdown
  const yearOptions = useMemo(() => {
    const todayYear = new Date().getFullYear();
    const maxYear = isDOB ? todayYear - 18 : todayYear + 15;
    const minYear = isDOB ? todayYear - 100 : todayYear - 90;
    const years = [];
    for (let y = maxYear; y >= minYear; y--) {
      years.push(y);
    }
    // Guarantee currentViewYear is always in the list so <select> is NEVER blank
    if (!years.includes(currentViewYear)) {
      years.push(currentViewYear);
      years.sort((a, b) => b - a);
    }
    return years;
  }, [isDOB, currentViewYear]);

  // Check if a specific day is disabled
  const isDateDisabled = useCallback((year, month, day) => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    if (effectiveMaxDate) {
      const maxD = new Date(effectiveMaxDate);
      maxD.setHours(23, 59, 59, 999);
      if (date > maxD) return true;
    }

    if (effectiveMinDate) {
      const minD = new Date(effectiveMinDate);
      minD.setHours(0, 0, 0, 0);
      if (date < minD) return true;
    }

    return false;
  }, [effectiveMaxDate, effectiveMinDate]);

  // Emit change to parent
  const emitChange = useCallback((isoValue) => {
    if (onChange) {
      onChange({
        target: {
          name: name || '',
          value: isoValue || '',
          type: 'date',
        },
      });
    }
  }, [name, onChange]);

  // Day selection from grid
  const handleSelectDay = (day) => {
    if (isDateDisabled(currentViewYear, currentViewMonth, day)) return;
    const chosenDate = new Date(currentViewYear, currentViewMonth, day);
    const isoString = toISODateString(chosenDate);
    const displayString = toDisplayDateString(isoString);

    setTypedText(displayString);
    setValidationError('');
    emitChange(isoString);
    setIsOpen(false);
  };

  // Typing handler with auto-masking MM/DD/YYYY
  const handleInputChange = (e) => {
    let raw = e.target.value;

    if (raw.length < typedText.length) {
      setTypedText(raw);
      if (raw.length === 0) {
        setValidationError('');
        emitChange('');
      }
      return;
    }

    const digitsOnly = raw.replace(/\D/g, '').slice(0, 8);
    let formatted = '';

    if (digitsOnly.length > 0) {
      formatted += digitsOnly.slice(0, 2);
    }
    if (digitsOnly.length >= 3) {
      formatted += '/' + digitsOnly.slice(2, 4);
    }
    if (digitsOnly.length >= 5) {
      formatted += '/' + digitsOnly.slice(4, 8);
    }

    setTypedText(formatted);

    if (formatted.length === 10) {
      const parsed = parseDisplayDate(formatted);
      if (!parsed) {
        setValidationError('Invalid date format. Use MM/DD/YYYY.');
        return;
      }

      if (isDOB) {
        const maxLimit = new Date(eighteenYearsAgo);
        maxLimit.setHours(23, 59, 59, 999);
        if (parsed > maxLimit) {
          setValidationError(`Must be at least 18 years old (born on or before ${toDisplayDateString(eighteenYearsAgo)}).`);
          return;
        }
      }

      if (effectiveMinDate && parsed < effectiveMinDate) {
        setValidationError(`Date cannot be before ${toDisplayDateString(effectiveMinDate)}.`);
        return;
      }

      if (effectiveMaxDate && parsed > effectiveMaxDate) {
        setValidationError(`Date cannot be after ${toDisplayDateString(effectiveMaxDate)}.`);
        return;
      }

      setValidationError('');
      const iso = toISODateString(parsed);
      emitChange(iso);
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
    } else {
      setValidationError('');
    }
  };

  const handleInputBlur = () => {
    if (typedText && typedText.length < 10) {
      setValidationError('Please enter full date as MM/DD/YYYY');
    }
  };

  // Year navigation arrows
  const prevYear = () => {
    const minPossible = yearOptions[yearOptions.length - 1];
    if (currentViewYear > minPossible) setViewYear(currentViewYear - 1);
  };
  const nextYear = () => {
    const maxPossible = yearOptions[0];
    if (currentViewYear < maxPossible) setViewYear(currentViewYear + 1);
  };

  // Month navigation arrows
  const prevMonth = () => {
    if (currentViewMonth === 0) {
      const minPossible = yearOptions[yearOptions.length - 1];
      if (currentViewYear > minPossible) {
        setViewYear(currentViewYear - 1);
        setViewMonth(11);
      }
    } else {
      setViewMonth(currentViewMonth - 1);
    }
  };
  const nextMonth = () => {
    if (currentViewMonth === 11) {
      const maxPossible = yearOptions[0];
      if (currentViewYear < maxPossible) {
        setViewYear(currentViewYear + 1);
        setViewMonth(0);
      }
    } else {
      if (isDOB && currentViewYear === eighteenYearsAgo.getFullYear() && currentViewMonth + 1 > eighteenYearsAgo.getMonth()) {
        return;
      }
      setViewMonth(currentViewMonth + 1);
    }
  };

  // Calendar days computation
  const daysInMonth = useMemo(() => {
    return new Date(currentViewYear, currentViewMonth + 1, 0).getDate();
  }, [currentViewYear, currentViewMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(currentViewYear, currentViewMonth, 1).getDay(); // 0 = Sunday
  }, [currentViewYear, currentViewMonth]);

  const today = new Date();
  const isTodayCell = (day) => {
    return (
      today.getFullYear() === currentViewYear &&
      today.getMonth() === currentViewMonth &&
      today.getDate() === day
    );
  };

  const isSelectedCell = (day) => {
    if (!selectedDateObj) return false;
    return (
      selectedDateObj.getFullYear() === currentViewYear &&
      selectedDateObj.getMonth() === currentViewMonth &&
      selectedDateObj.getDate() === day
    );
  };

  // Render day cells
  const dayCells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    dayCells.push(<div key={`empty-${i}`} className="custom-datepicker-day-cell is-empty" aria-hidden="true" />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const disabled = isDateDisabled(currentViewYear, currentViewMonth, d);
    const selected = isSelectedCell(d);
    const todayIndicator = isTodayCell(d);

    let cellClass = 'custom-datepicker-day-cell';
    if (selected) cellClass += ' is-selected';
    if (todayIndicator) cellClass += ' is-today';
    if (disabled) cellClass += ' is-disabled';

    dayCells.push(
      <button
        key={`day-${d}`}
        type="button"
        className={cellClass}
        onClick={() => handleSelectDay(d)}
        disabled={disabled}
        aria-label={`${MONTH_NAMES[currentViewMonth]} ${d}, ${currentViewYear}`}
      >
        {d}
      </button>
    );
  }

  return (
    <div className={`custom-datepicker-wrapper ${className}`} ref={containerRef} style={style}>
      <div className="custom-datepicker-input-group">
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          className={`custom-datepicker-input ${validationError ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          value={typedText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setIsOpen(true)}
          required={required}
          disabled={disabled}
          autoComplete="off"
        />
        <button
          type="button"
          className="custom-datepicker-icon-btn"
          onClick={() => !disabled && setIsOpen(prev => !prev)}
          tabIndex={-1}
          aria-label="Toggle calendar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </button>
      </div>

      {validationError && (
        <div className="custom-datepicker-error">
          {validationError}
        </div>
      )}

      {/* POPUP / MODAL CALENDAR */}
      {isOpen && !disabled && (
        <>
          <div className="custom-datepicker-backdrop" onClick={() => setIsOpen(false)} />

          <div className="custom-datepicker-dropdown" role="dialog" aria-modal="true">
            {/* ROW 1: YEAR NAV */}
            <div className="custom-datepicker-nav-row">
              <button
                type="button"
                className="custom-datepicker-nav-btn"
                onClick={prevYear}
                disabled={currentViewYear <= yearOptions[yearOptions.length - 1]}
                aria-label="Previous Year"
              >
                &lt;
              </button>

              <div className="custom-datepicker-select-wrapper">
                <span className="custom-datepicker-select-label">
                  {currentViewYear}
                </span>
                <select
                  className="custom-datepicker-select"
                  value={currentViewYear}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) setViewYear(val);
                  }}
                  aria-label="Select year"
                >
                  {yearOptions.map(yr => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
                <span className="custom-datepicker-select-arrow">&#9662;</span>
              </div>

              <button
                type="button"
                className="custom-datepicker-nav-btn"
                onClick={nextYear}
                disabled={currentViewYear >= yearOptions[0]}
                aria-label="Next Year"
              >
                &gt;
              </button>
            </div>

            {/* ROW 2: MONTH NAV */}
            <div className="custom-datepicker-nav-row">
              <button
                type="button"
                className="custom-datepicker-nav-btn"
                onClick={prevMonth}
                aria-label="Previous Month"
              >
                &lt;
              </button>

              <div className="custom-datepicker-select-wrapper">
                <span className="custom-datepicker-select-label">
                  {MONTH_NAMES[currentViewMonth]}
                </span>
                <select
                  className="custom-datepicker-select"
                  value={currentViewMonth}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) setViewMonth(val);
                  }}
                  aria-label="Select month"
                >
                  {MONTH_NAMES.map((name, idx) => {
                    const isMonthDisabled = isDOB &&
                      currentViewYear === eighteenYearsAgo.getFullYear() &&
                      idx > eighteenYearsAgo.getMonth();
                    return (
                      <option key={name} value={idx} disabled={isMonthDisabled}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <span className="custom-datepicker-select-arrow">&#9662;</span>
              </div>

              <button
                type="button"
                className="custom-datepicker-nav-btn"
                onClick={nextMonth}
                disabled={
                  isDOB &&
                  currentViewYear === eighteenYearsAgo.getFullYear() &&
                  currentViewMonth >= eighteenYearsAgo.getMonth()
                }
                aria-label="Next Month"
              >
                &gt;
              </button>
            </div>

            {/* CALENDAR BODY */}
            <div className="custom-datepicker-calendar">
              {/* DARK HEADER WITH S M T W T F S */}
              <div className="custom-datepicker-weekdays">
                {WEEKDAY_NAMES.map((d, i) => (
                  <div key={`${d}-${i}`}>{d}</div>
                ))}
              </div>

              {/* CREAM DAYS GRID */}
              <div className="custom-datepicker-days-grid">
                {dayCells}
              </div>
            </div>

            {/* FOOTER */}
            <div className="custom-datepicker-footer">
              {isDOB ? (
                <div className="custom-datepicker-dob-notice">
                  Max: {toDisplayDateString(eighteenYearsAgo)} (18+ yrs)
                </div>
              ) : (
                <div className="custom-datepicker-footer-help">
                  Format: MM/DD/YYYY
                </div>
              )}

              <div className="custom-datepicker-footer-actions">
                <button
                  type="button"
                  className="custom-datepicker-action-btn"
                  onClick={() => {
                    setTypedText('');
                    setValidationError('');
                    emitChange('');
                  }}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="custom-datepicker-action-btn"
                  onClick={() => {
                    const target = isDOB ? eighteenYearsAgo : new Date();
                    setViewYear(target.getFullYear());
                    setViewMonth(target.getMonth());
                    handleSelectDay(target.getDate());
                  }}
                >
                  {isDOB ? '18 Yrs Ago' : 'Today'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomDatePicker;
