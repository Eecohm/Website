import React from 'react';
import { User } from 'lucide-react';
import FormSection from '../../FormComponents/FormSection/FormSection';
import GlassInput from '../../FormComponents/GlassInput/GlassInput';
import GlassSelect from '../../FormComponents/GlassSelect/GlassSelect';
import GlassFileUpload from '../../FormComponents/GlassFileUpload/GlassFileUpload';
import  { validateAlphabetOnly } from '@/validators/formInputValidator/TextValidator'
const PersonalDetailsForm = ({ formData, handleChange, handleFileChange }) => {
  return (
    <FormSection title="Personal Details" icon={User}>
      <GlassInput
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required={true}
        placeholder="First name"
        validate={validateAlphabetOnly}
      />

      <GlassInput
        label="Middle Name"
        name="middleName"
        value={formData.middleName}
        onChange={handleChange}
        placeholder="Middle name"
        validate={validateAlphabetOnly}
      />

      <GlassInput
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required={true}
        placeholder="Last name"
        validate={validateAlphabetOnly}
      />

      <GlassInput
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required={true}
      />

      <GlassSelect
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' }
        ]}
      />

      <GlassFileUpload
        label="Photo"
        name="photo"
        onChange={handleFileChange}
        accept="image/*"
      />
    </FormSection>
  );
};

export default PersonalDetailsForm;
