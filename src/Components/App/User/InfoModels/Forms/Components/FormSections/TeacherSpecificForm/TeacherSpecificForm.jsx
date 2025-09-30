import React from 'react';
import { BookOpen } from 'lucide-react';
import FormSection from '../../FormComponents/FormSection/FormSection';
import GlassInput from '../../FormComponents/GlassInput/GlassInput';
import GlassFileUpload from '../../FormComponents/GlassFileUpload/GlassFileUpload';

const TeacherSpecificForm = ({ formData, handleChange, handleFileChange }) => (
  <FormSection title="Teacher Details" icon={BookOpen}>
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
      label="Academic Qualification"
      name="academicQualification"
      value={formData.academicQualification}
      onChange={handleChange}
      placeholder="Qualification"
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
    <GlassInput
      label="Subject IDs (comma-separated)"
      name="subjectIds"
      value={formData.subjectIds}
      onChange={handleChange}
      placeholder="e.g., 1, 2, 3"
    />
    <GlassInput
      label="Subject Names (comma-separated)"
      name="subjectNames"
      value={formData.subjectNames}
      onChange={handleChange}
      placeholder="e.g., Math, Science"
    />
    <GlassFileUpload
      label="Job Application"
      name="jobApplication"
      onChange={handleFileChange}
      accept="application/pdf,image/*"
    />
    <GlassFileUpload
      label="Hiring Letter"
      name="hiringLetter"
      onChange={handleFileChange}
      accept="application/pdf,image/*"
    />
    <GlassFileUpload
      label="Resume/CV"
      name="resumeCv"
      onChange={handleFileChange}
      accept="application/pdf"
    />
    <GlassFileUpload
      label="Skill Certifications"
      name="skillCertifications"
      onChange={handleFileChange}
      accept="application/pdf,image/*"
    />
  </FormSection>
);

export default TeacherSpecificForm;