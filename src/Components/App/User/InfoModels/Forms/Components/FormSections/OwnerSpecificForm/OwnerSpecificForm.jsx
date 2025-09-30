import React from 'react';
import { Mail } from 'lucide-react';
import FormSection from '../../FormComponents/FormSection/FormSection';
import GlassInput from '../../FormComponents/GlassInput/GlassInput';

const OwnerSpecificForm = ({ formData, handleChange }) => (
  <FormSection title="Owner Details" icon={Mail}>
    <GlassInput
      label="User ID"
      name="userId"
      value={formData.userId}
      onChange={handleChange}
      placeholder="User ID"
    />
    <GlassInput
      label="User Email"
      name="userEmail"
      value={formData.userEmail}
      onChange={handleChange}
      type="email"
      placeholder="Email (read-only)"
      disabled={true}
    />
  </FormSection>
);

export default OwnerSpecificForm;