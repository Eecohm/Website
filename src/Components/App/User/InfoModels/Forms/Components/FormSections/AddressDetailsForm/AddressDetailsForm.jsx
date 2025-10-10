import React, { useState, useRef } from "react";
import { MapPin } from "lucide-react";
import FormSection from "../../FormComponents/FormSection/FormSection";
import GlassInput from "../../FormComponents/GlassInput/GlassInput";
import {
  validateRequiredString,
  validateOptionalString,
  validateRequiredWard,
  validateRequiredName,
} from "@/validators/formInputValidator/TextValidator";
import { getProvincesByCountry } from "@/validators/formInputValidator/provincesData";
import GlassSelect from "../../FormComponents/GlassSelect/GlassSelect";

const AddressDetailsForm = ({ formData, handleChange, onValidationChange }) => {
  const [validFields, setValidFields] = useState(new Set());
  const lastErrorsStringRef = useRef("");

  const countryOptions = [{ value: "Nepal", label: "Nepal" }];

  const getProvinceOptions = () => {
    const provinces = getProvincesByCountry(formData.country);
    return provinces.map((province) => ({
      value: province,
      label: province,
    }));
  };

  // Custom handler for country changes
  const handleCountryChange = (e) => {
    const { name, value } = e.target;

    // If country changed, clear province
    if (name === "country" && value !== formData.country) {
      handleChange({ target: { name: "province", value: "" } });
    }

    handleChange(e);
  };

  const handleFieldValidation = (fieldName, isValid) => {
    setValidFields((prev) => {
      const updated = new Set(prev);
      if (isValid) {
        updated.add(fieldName);
      } else {
        updated.delete(fieldName);
      }

      const requiredFields = [
        "country",
        "province",
        "municipality",
        "ward",
        "tole",
      ];
      const allValid = requiredFields.every((field) => updated.has(field));

      // Call the parent validation callback - defer to avoid state update during render
      if (onValidationChange) {
        setTimeout(() => {
          // Create proper errors object - only include invalid fields with error messages
          const errors = {};
          requiredFields.forEach((field) => {
            if (!updated.has(field)) {
              errors[field] = `${
                field.charAt(0).toUpperCase() + field.slice(1)
              } is required`;
            }
          });

          const errorsString = JSON.stringify(errors);

          if (errorsString !== lastErrorsStringRef.current) {
            console.log("🔄 AddressDetailsForm - Errors changed:", errors);
            lastErrorsStringRef.current = errorsString;
            onValidationChange(allValid, errors);
          } else {
            console.log(
              "✅ AddressDetailsForm - Errors unchanged, skipping onValidationChange"
            );
          }
        }, 0);
      }

      return updated;
    });
  };

  return (
    <FormSection title="Address Details" icon={MapPin}>
      <GlassInput
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required={true}
        placeholder="Search country"
        onValidate={handleFieldValidation}
      />
      <GlassSelect
        label="Province"
        name="province"
        value={formData.province}
        onChange={handleChange}
        required={true}
        options={getProvinceOptions()}
        placeholder={
          formData.country ? "Select Province" : "Select Country First"
        }
        disabled={formData.country !== "Nepal"}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Municipality"
        name="municipality"
        value={formData.municipality}
        onChange={handleChange}
        required={true}
        placeholder="Municipality"
        validate={validateRequiredName}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Ward"
        name="ward"
        value={formData.ward}
        onChange={handleChange}
        required={true}
        placeholder="Ward"
        validate={validateRequiredWard}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Tole"
        name="tole"
        value={formData.tole}
        onChange={handleChange}
        required={true}
        placeholder="Tole/Area"
        validate={validateRequiredString}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Pin Point"
        name="pinPoint"
        type="url"
        value={formData.pinPoint}
        onChange={handleChange}
        required={false}
        placeholder="Map URL (Optional)"
        validate={validateOptionalString}
        onValidate={handleFieldValidation}
      />
    </FormSection>
  );
};

export default AddressDetailsForm;
