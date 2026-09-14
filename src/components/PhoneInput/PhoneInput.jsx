import React, { useState, useEffect, useRef, useCallback } from 'react';
import './PhoneInput.css';

/**
 * Format string of digits into US phone format: (XXX) XXX-XXXX
 * Strictly strips all alphabets and non-digits.
 */
export const formatPhoneNumber = (value) => {
  if (!value) return '';
  const digits = String(value).replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

/**
 * Check if value is a complete 10-digit phone number
 */
export const isValidPhoneNumber = (value) => {
  if (!value) return false;
  const digits = String(value).replace(/\D/g, '');
  return digits.length === 10;
};

/**
 * PhoneInput Component
 * - Masks input to (XXX) XXX-XXXX format
 * - Strictly supports only integer numbers (0-9), blocks all alphabets
 * - Default placeholder: (666) 667-7777
 * - Validates 10-digit pattern
 */
const PhoneInput = ({
  name,
  value = '',
  onChange,
  onBlur,
  required = false,
  placeholder = '(666) 667-7777',
  disabled = false,
  readOnly = false,
  className = '',
  id,
  style = {},
  autoComplete = 'tel',
  title = 'Phone number must be exactly 10 digits in (666) 667-7777 format',
}) => {
  const inputRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(() => formatPhoneNumber(value));
  const [error, setError] = useState('');

  // Keep displayValue in sync with external value
  useEffect(() => {
    const formatted = formatPhoneNumber(value);
    setDisplayValue(formatted);
    if (!formatted) {
      setError('');
    }
  }, [value]);

  const emitChange = useCallback((formattedVal) => {
    if (onChange) {
      onChange({
        target: {
          name: name || '',
          value: formattedVal,
          type: 'tel',
        },
      });
    }
  }, [name, onChange]);

  // Block non-digit keys (letters, symbols) except control keys
  const handleKeyDown = (e) => {
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'Tab' ||
      e.key === 'Escape' ||
      e.key === 'Enter' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'Home' ||
      e.key === 'End' ||
      (e.ctrlKey || e.metaKey)
    ) {
      return;
    }

    // Only integer digits 0-9 allowed, strictly block alphabets
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;

    // Extract only digits
    const digitsOnly = raw.replace(/\D/g, '').slice(0, 10);

    // Natural backspace: if user deleted a punctuation char, delete the previous digit
    let nextDigits = digitsOnly;
    if (raw.length < displayValue.length && digitsOnly === displayValue.replace(/\D/g, '')) {
      nextDigits = digitsOnly.slice(0, -1);
    }

    const formatted = formatPhoneNumber(nextDigits);
    setDisplayValue(formatted);
    emitChange(formatted);

    // Dynamic validation
    if (nextDigits.length === 10) {
      setError('');
      if (inputRef.current) inputRef.current.setCustomValidity('');
    } else if (nextDigits.length > 0 && nextDigits.length < 10) {
      // In progress
      setError('');
      if (inputRef.current) inputRef.current.setCustomValidity('');
    } else if (nextDigits.length === 0) {
      setError('');
      if (inputRef.current) inputRef.current.setCustomValidity('');
    }
  };

  const handleBlur = (e) => {
    const digits = displayValue.replace(/\D/g, '');
    if (digits.length > 0 && digits.length < 10) {
      const msg = 'Please enter a complete 10-digit phone number: (666) 667-7777';
      setError(msg);
      if (inputRef.current) inputRef.current.setCustomValidity(msg);
    } else if (required && digits.length === 0) {
      const msg = 'Phone number is required';
      setError(msg);
      if (inputRef.current) inputRef.current.setCustomValidity(msg);
    } else {
      setError('');
      if (inputRef.current) inputRef.current.setCustomValidity('');
    }

    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className="phone-input-wrapper" style={style}>
      <input
        ref={inputRef}
        type="tel"
        id={id}
        name={name}
        value={displayValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className={`phone-input-control ${className} ${error ? 'is-invalid' : ''}`}
        maxLength={14}
        pattern="^\(\d{3}\) \d{3}-\d{4}$"
        inputMode="numeric"
        autoComplete={autoComplete}
        title={title}
      />
      {error && <div className="phone-input-error">{error}</div>}
    </div>
  );
};

export default PhoneInput;
