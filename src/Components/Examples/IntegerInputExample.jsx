// Example: Integer Input Field Component with Validation
// File: src/Components/Examples/IntegerInputExample.jsx

import React, { useState } from "react";
import {
  isValidInteger,
  isValidPositiveInteger,
  isValidIntegerWithMaxLength,
} from "@/validators/formInputValidator/ContactValidator";
import styles from "./IntegerInputExample.module.css"; // Optional CSS module

const IntegerInputExample = () => {
  // Example 1: Basic Integer Input (allows any integer, positive or negative)
  const [basicInteger, setBasicInteger] = useState("");
  const [basicError, setBasicError] = useState(null);

  const handleBasicIntegerChange = (e) => {
    const value = e.target.value;
    setBasicInteger(value); // ✅ Allow any character to be typed

    // Validate and show error message below
    const error = isValidInteger(value, true); // true = field is required
    setBasicError(error);
  };

  // Example 2: Positive Integer Input (no negatives)
  const [positiveInteger, setPositiveInteger] = useState("");
  const [positiveError, setPositiveError] = useState(null);

  const handlePositiveIntegerChange = (e) => {
    const value = e.target.value;
    setPositiveInteger(value); // ✅ Allow any character to be typed

    // Validate and show error message below
    const error = isValidPositiveInteger(value, false); // false = optional field
    setPositiveError(error);
  };

  // Example 3: Integer with Max Length (e.g., Zip Code - max 5 digits)
  const [zipCode, setZipCode] = useState("");
  const [zipError, setZipError] = useState(null);

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    setZipCode(value); // ✅ Allow any character to be typed

    // Validate and show error message below
    const error = isValidIntegerWithMaxLength(value, 5, true); // true = required
    setZipError(error);
  };

  return (
    <div className={styles.container}>
      <h2>Integer Input Examples - No Input Blocking</h2>

      {/* Example 1: Basic Integer */}
      <div className={styles.formGroup}>
        <label htmlFor="basicInt">Basic Integer (Required)</label>
        <input
          id="basicInt"
          type="text"
          value={basicInteger}
          onChange={handleBasicIntegerChange}
          placeholder="Type anything - validation shows below"
          className={basicError ? styles.inputError : styles.inputValid}
        />
        {basicError && <p className={styles.errorMessage}>{basicError}</p>}
        <small className={styles.hint}>
          You can type letters, symbols, anything. Error appears if non-numeric.
        </small>
      </div>

      {/* Example 2: Positive Integer */}
      <div className={styles.formGroup}>
        <label htmlFor="positiveInt">Positive Integer Only (Optional)</label>
        <input
          id="positiveInt"
          type="text"
          value={positiveInteger}
          onChange={handlePositiveIntegerChange}
          placeholder="Type anything - negative numbers show error"
          className={positiveError ? styles.inputError : styles.inputValid}
        />
        {positiveError && (
          <p className={styles.errorMessage}>{positiveError}</p>
        )}
        <small className={styles.hint}>
          Negative numbers will show an error message.
        </small>
      </div>

      {/* Example 3: Max Length Integer */}
      <div className={styles.formGroup}>
        <label htmlFor="zipCode">Zip Code (Max 5 digits)</label>
        <input
          id="zipCode"
          type="text"
          value={zipCode}
          onChange={handleZipCodeChange}
          placeholder="Type anything - error if more than 5 digits"
          className={zipError ? styles.inputError : styles.inputValid}
        />
        {zipError && <p className={styles.errorMessage}>{zipError}</p>}
        <small className={styles.hint}>
          Shows error if you type more than 5 characters.
        </small>
      </div>

      {/* Summary */}
      <div className={styles.summary}>
        <h3>Key Points:</h3>
        <ul>
          <li>✅ Users can type ANY characters (letters, symbols, numbers)</li>
          <li>✅ Error message appears BELOW the input if validation fails</li>
          <li>✅ Input is NOT blocked - users see what they typed</li>
          <li>✅ Error message is specific and helpful</li>
          <li>✅ Validation runs on every keystroke</li>
        </ul>
      </div>
    </div>
  );
};

export default IntegerInputExample;
