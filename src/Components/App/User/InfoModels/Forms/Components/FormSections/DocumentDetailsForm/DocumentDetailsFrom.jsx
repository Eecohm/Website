import React from 'react';
import { FileText } from 'lucide-react';
import FormSection from '../../FormComponents/FormSection/FormSection';
import GlassInput from '../../FormComponents/GlassInput/GlassInput';
import GlassFileUpload from '../../FormComponents/GlassFileUpload/GlassFileUpload';

const DocumentDetailsForm = ({ formData, handleChange, handleFileChange }) => (
  <FormSection title="Document Details" icon={FileText}>
    <GlassInput
      label="Nagarikta Number"
      name="nagariktaNo"
      value={formData.nagariktaNo}
      onChange={handleChange}
      required
      placeholder="Citizenship No."
    />
    <GlassInput
      label="PAN Number"
      name="panNo"
      value={formData.panNo}
      onChange={handleChange}
      required
      placeholder="PAN No."
    />
    <GlassFileUpload
      label="Nagarikta Photo"
      name="nagariktaPhoto"
      onChange={handleFileChange}
      accept="image/*"
    />
    <GlassFileUpload
      label="PAN Photo"
      name="panPhoto"
      onChange={handleFileChange}
      accept="image/*"
    />
  </FormSection>
);

export default DocumentDetailsForm;