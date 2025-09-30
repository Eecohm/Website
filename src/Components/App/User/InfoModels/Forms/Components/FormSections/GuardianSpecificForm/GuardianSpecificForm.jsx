import React from 'react';
import { Users } from 'lucide-react';
import FormSection from '../../FormComponents/FormSection/FormSection';
import GlassInput from '../../FormComponents/GlassInput/GlassInput';

const GuardianSpecificForm = ({ formData, handleChange }) => (
  <FormSection title="Guardian Details" icon={Users}>
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
    <div style={{ gridColumn: '1 / -1' }}>
      <GlassInput
        label="Student IDs (comma-separated)"
        name="studentIds"
        value={formData.studentIds}
        onChange={handleChange}
        placeholder="e.g., 101, 102, 103"
      />
    </div>
  </FormSection>
);

export default GuardianSpecificForm;