import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { getNames } from "country-list";
import { Country } from "country-state-city";
import styles from "@/features/admin/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/GlassSearchableSelect.module.css";

const GlassSearchableSelect = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = "Search or select...",
  validate,
  onValidate,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [error, setError] = useState("");

  const dropdownRef = useRef(null);
  const allCountries = getNames(); // Gets all country names from country-list

  // Initialize countries and set initial search term based on value
  useEffect(() => {
    setFilteredCountries(allCountries);
    if (value) {
      setSearchTerm(value);
    }
  }, [value]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initial validation on mount
  useEffect(() => {
    if (onValidate && required) {
      onValidate(name, !!value); // Initially invalid if required and no value
    }
  }, [name, required, value]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter countries based on search term
    const filtered = allCountries.filter((country) =>
      country.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCountries(filtered);

    // If input is cleared, clear the selection
    if (!term) {
      onChange({ target: { name, value: "" } });
      if (onValidate) {
        onValidate(name, !required); // Invalid if required
      }
    }
  };

  // Handle country selection from dropdown
  const handleCountrySelect = (country) => {
    setSearchTerm(country);
    setIsOpen(false);
    setError("");

    // Call parent onChange
    onChange({ target: { name, value: country } });

    // Trigger validation
    if (validate && onValidate) {
      const validationResult = validate(country);
      setError(validationResult || "");
      onValidate(name, !validationResult); // true if no error
    } else if (onValidate) {
      onValidate(name, true); // Valid since a country is selected
    }
  };

  // Handle input focus
  const handleFocus = () => {
    setIsOpen(true);
    // Reset filtered countries when opening
    setFilteredCountries(allCountries);
  };

  // Handle input blur
  const handleBlur = () => {
    // Small delay to allow for country selection
    setTimeout(() => {
      // If the search term doesn't match any country exactly, validate
      if (searchTerm && !allCountries.includes(searchTerm)) {
        if (validate && onValidate) {
          const validationResult = validate(searchTerm);
          setError(validationResult || "");
          onValidate(name, !validationResult);
        } else if (onValidate && required) {
          setError("Please select a valid country");
          onValidate(name, false);
        }
      }
    }, 150);
  };

  return (
    <div className={styles.selectContainer} ref={dropdownRef}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          autoComplete="off"
          {...props}
        />
        <ChevronDown
          className={`${styles.icon} ${isOpen ? styles.iconRotated : ""}`}
          size={16}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                key={country}
                className={`${styles.option} ${
                  searchTerm === country ? styles.optionSelected : ""
                }`}
                onClick={() => handleCountrySelect(country)}
              >
                {country}
              </div>
            ))
          ) : (
            <div className={styles.noResults}>No countries found</div>
          )}
        </div>
      )}

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default GlassSearchableSelect;
