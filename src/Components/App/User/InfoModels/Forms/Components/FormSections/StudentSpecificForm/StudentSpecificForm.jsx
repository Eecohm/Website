import React from 'react';
import { GraduationCap } from 'lucide-react';
import FormSection from '../../FormComponents/FormSection/FormSection';
import GlassInput from '../../FormComponents/GlassInput/GlassInput';
import GlassFileUpload from '../../FormComponents/GlassFileUpload/GlassFileUpload';

const StudentSpecificForm = ({ formData, handleChange, handleFileChange }) => (
  <FormSection title="Student Details" icon={GraduationCap}>
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
    <GlassInput
      label="Academic Class ID"
      name="academicClassId"
      value={formData.academicClassId}
      onChange={handleChange}
      placeholder="Class ID"
    />
    <GlassInput
      label="Academic Class Name"
      name="academicClassName"
      value={formData.academicClassName}
      onChange={handleChange}
      placeholder="Class Name"
    />
    <GlassFileUpload
      label="ID Card"
      name="idCard"
      onChange={handleFileChange}
      accept="image/*"
    />
    <GlassFileUpload
      label="Transfer Certificate"
      name="transferCertificate"
      onChange={handleFileChange}
      accept="application/pdf,image/*"
    />
    <GlassFileUpload
      label="Class 10 Marksheet"
      name="class10Marksheet"
      onChange={handleFileChange}
      accept="application/pdf,image/*"
    />
    <GlassInput
      label="Created By Admin"
      name="createdByAdmin"
      value={formData.createdByAdmin}
      onChange={handleChange}
      placeholder="Admin ID"
    />
  </FormSection>
);

export default StudentSpecificForm;