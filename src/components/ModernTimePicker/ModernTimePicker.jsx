import React, { useState, useEffect, useCallback } from 'react';
import './ModernTimePicker.css';

/**
 * Parse time string to hour, minute, period (AM/PM)
 */
export const parseTimeToParts = (timeStr) => {
  if (!timeStr) {
    return { hour: '00', minute: '00', period: 'AM' };
  }

  const upper = String(timeStr).trim().toUpperCase();
  const isPM = upper.includes('PM');
  const isAM = upper.includes('AM');

  const cleanTime = upper.replace(/[AP]M/g, '').trim();
  const parts = cleanTime.split(':');

  if (parts.length >= 2) {
    let h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const validM = isNaN(m) ? 0 : Math.min(59, Math.max(0, m));

    if (isNaN(h)) {
      return { hour: '00', minute: '00', period: 'AM' };
    }

    let period = 'AM';
    if (isPM) {
      period = 'PM';
    } else if (isAM) {
      period = 'AM';
    } else {
      // 24-hour format
      if (h >= 12) {
        period = 'PM';
        if (h > 12) h -= 12;
      } else {
        period = 'AM';
        if (h === 0) h = 12;
      }
    }

    return {
      hour: String(h).padStart(2, '0'),
      minute: String(validM).padStart(2, '0'),
      period,
    };
  }

  return { hour: '00', minute: '00', period: 'AM' };
};

/**
 * Format hour, minute, period back to 24-hour HH:mm
 */
export const formatPartsToTime = (hour, minute, period) => {
  let h = parseInt(hour, 10);
  const m = parseInt(minute, 10);
  if (isNaN(h)) h = 0;
  const validM = isNaN(m) ? 0 : Math.min(59, Math.max(0, m));

  let h24 = h;
  if (period === 'PM') {
    if (h < 12) h24 = h + 12;
  } else if (period === 'AM') {
    if (h === 12) h24 = 0;
  }

  return `${String(h24).padStart(2, '0')}:${String(validM).padStart(2, '0')}`;
};

/**
 * ModernTimePicker Component
 * Renders hour stepper [00 ^v], minute stepper [00 ^v], and [AM v] select
 */
const ModernTimePicker = ({
  name,
  value = '',
  onChange,
  disabled = false,
  className = '',
  id,
}) => {
  const initial = parseTimeToParts(value);
  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);
  const [period, setPeriod] = useState(initial.period);

  useEffect(() => {
    const parsed = parseTimeToParts(value);
    setHour(parsed.hour);
    setMinute(parsed.minute);
    setPeriod(parsed.period);
  }, [value]);

  const emitTimeChange = useCallback((newH, newM, newP) => {
    const formatted = formatPartsToTime(newH, newM, newP);
    if (onChange) {
      onChange({
        target: {
          name: name || '',
          value: formatted,
          type: 'time',
        },
      });
    }
  }, [name, onChange]);

  // Hour controls
  const incrementHour = () => {
    if (disabled) return;
    let h = parseInt(hour, 10);
    h = isNaN(h) ? 1 : h + 1;
    if (h > 12) h = 1;
    const padded = String(h).padStart(2, '0');
    setHour(padded);
    emitTimeChange(padded, minute, period);
  };

  const decrementHour = () => {
    if (disabled) return;
    let h = parseInt(hour, 10);
    h = isNaN(h) ? 12 : h - 1;
    if (h < 1) h = 12;
    const padded = String(h).padStart(2, '0');
    setHour(padded);
    emitTimeChange(padded, minute, period);
  };

  const handleHourInput = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    setHour(raw);
    if (raw.length > 0) {
      let h = parseInt(raw, 10);
      if (h > 12) h = 12;
      const padded = String(h).padStart(2, '0');
      emitTimeChange(padded, minute, period);
    }
  };

  const handleHourBlur = () => {
    let h = parseInt(hour, 10);
    if (isNaN(h) || h < 1) h = 12;
    if (h > 12) h = 12;
    const padded = String(h).padStart(2, '0');
    setHour(padded);
    emitTimeChange(padded, minute, period);
  };

  // Minute controls
  const incrementMinute = () => {
    if (disabled) return;
    let m = parseInt(minute, 10);
    m = isNaN(m) ? 0 : (m + 5) % 60;
    const padded = String(m).padStart(2, '0');
    setMinute(padded);
    emitTimeChange(hour, padded, period);
  };

  const decrementMinute = () => {
    if (disabled) return;
    let m = parseInt(minute, 10);
    m = isNaN(m) ? 0 : (m - 5 + 60) % 60;
    const padded = String(m).padStart(2, '0');
    setMinute(padded);
    emitTimeChange(hour, padded, period);
  };

  const handleMinuteInput = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMinute(raw);
    if (raw.length > 0) {
      let m = parseInt(raw, 10);
      if (m > 59) m = 59;
      const padded = String(m).padStart(2, '0');
      emitTimeChange(hour, padded, period);
    }
  };

  const handleMinuteBlur = () => {
    let m = parseInt(minute, 10);
    if (isNaN(m) || m < 0) m = 0;
    if (m > 59) m = 59;
    const padded = String(m).padStart(2, '0');
    setMinute(padded);
    emitTimeChange(hour, padded, period);
  };

  // Period control
  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setPeriod(newPeriod);
    emitTimeChange(hour, minute, newPeriod);
  };

  return (
    <div className={`modern-time-picker ${className}`} id={id}>
      {/* Hour Stepper */}
      <div className="modern-time-stepper">
        <input
          type="text"
          inputMode="numeric"
          className="modern-time-input"
          value={hour}
          onChange={handleHourInput}
          onBlur={handleHourBlur}
          disabled={disabled}
          maxLength={2}
          aria-label="Hour"
        />
        <div className="modern-time-arrows">
          <button
            type="button"
            className="modern-time-arrow-btn"
            onClick={incrementHour}
            disabled={disabled}
            tabIndex={-1}
            aria-label="Increase Hour"
          >
            &#9652;
          </button>
          <button
            type="button"
            className="modern-time-arrow-btn"
            onClick={decrementHour}
            disabled={disabled}
            tabIndex={-1}
            aria-label="Decrease Hour"
          >
            &#9662;
          </button>
        </div>
      </div>

      {/* Minute Stepper */}
      <div className="modern-time-stepper">
        <input
          type="text"
          inputMode="numeric"
          className="modern-time-input"
          value={minute}
          onChange={handleMinuteInput}
          onBlur={handleMinuteBlur}
          disabled={disabled}
          maxLength={2}
          aria-label="Minute"
        />
        <div className="modern-time-arrows">
          <button
            type="button"
            className="modern-time-arrow-btn"
            onClick={incrementMinute}
            disabled={disabled}
            tabIndex={-1}
            aria-label="Increase Minute"
          >
            &#9652;
          </button>
          <button
            type="button"
            className="modern-time-arrow-btn"
            onClick={decrementMinute}
            disabled={disabled}
            tabIndex={-1}
            aria-label="Decrease Minute"
          >
            &#9662;
          </button>
        </div>
      </div>

      {/* AM/PM Dropdown */}
      <div className="modern-time-period-wrapper">
        <select
          className="modern-time-period-select"
          value={period}
          onChange={handlePeriodChange}
          disabled={disabled}
          aria-label="AM or PM"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <span className="modern-time-period-arrow">&#9662;</span>
      </div>
    </div>
  );
};

export default ModernTimePicker;
