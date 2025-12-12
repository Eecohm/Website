import React from "react";
import { Briefcase } from "lucide-react";
import FormSection from "@/features/admin/User/InfoModels/Forms/Components/FormComponents/FormSection/FormSection";
import GlassInput from "@/features/admin/User/InfoModels/Forms/Components/FormComponents/GlassInput/GlassInput";
import GlassFileUpload from "@/features/admin/User/InfoModels/Forms/Components/FormComponents/GlassFileUpload/GlassFileUpload";

const EmployeeSpecificForm = ({ formData, handleChange, handleFileChange }) => (
  <FormSection title="Employee Details" icon={Briefcase}>
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
  </FormSection>
);

export default EmployeeSpecificForm;
