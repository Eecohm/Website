import React, { useState, useRef } from "react";
import { FiMapPin } from "react-icons/fi";
import FormSection from "@/Components/App/User/InfoModels/Forms/Components/FormComponents/FormSection/FormSection";
import GlassInput from "@/Components/App/User/InfoModels/Forms/Components/FormComponents/GlassInput/GlassInput";
import {
  validateRequiredString,
  validateRequiredWard,
  validateRequiredName,
} from "@/validators/formInputValidator/TextValidator";
import GlassSelect from "@/Components/App/User/InfoModels/Forms/Components/FormComponents/GlassSelect/GlassSelect";

const AddressDetailsForm = ({ formData, handleChange, onValidationChange }) => {
  const [validFields, setValidFields] = useState(new Set());
  const lastErrorsStringRef = useRef("");

  const getProvinceOptions = () => {
    const nepalProvinces = [
      "Koshi Province",
      "Madhesh Province",
      "Bagmati Province",
      "Gandaki Province",
      "Lumbini Province",
      "Karnali Province",
      "Sudurpashchim Province",
    ];

    return nepalProvinces.map((province) => ({
      value: province,
      label: province,
    }));
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

      if (onValidationChange) {
        setTimeout(() => {
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
            lastErrorsStringRef.current = errorsString;
            onValidationChange(allValid, errors);
          }
        }, 0);
      }

      return updated;
    });
  };

  return (
    <FormSection title="Address Details" icon={FiMapPin}>
      <GlassInput
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        required={true}
        placeholder="Country"
        validate={validateRequiredString}
        onValidate={handleFieldValidation}
      />
      <GlassSelect
        label="Province"
        name="province"
        value={formData.province}
        onChange={handleChange}
        required={true}
        options={getProvinceOptions()}
        placeholder="Select Province"
        disabled={formData.country !== "Nepal"}
        validate={validateRequiredString}
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
      />
    </FormSection>
  );
};

export default AddressDetailsForm;
