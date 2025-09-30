import React from 'react';
import { MapPin } from 'lucide-react';
import FormSection from '../../FormComponents/FormSection/FormSection';
import GlassInput from '../../FormComponents/GlassInput/GlassInput';

const AddressDetailsForm = ({ formData, handleChange }) => (
  <FormSection title="Address Details" icon={MapPin}>
    <GlassInput
      label="Country"
      name="country"
      value={formData.country}
      onChange={handleChange}
      required
      placeholder="Country"
    />
    <GlassInput
      label="Province"
      name="province"
      value={formData.province}
      onChange={handleChange}
      required
      placeholder="Province"
    />
    <GlassInput
      label="Municipality"
      name="municipality"
      value={formData.municipality}
      onChange={handleChange}
      required
      placeholder="Municipality"
    />
    <GlassInput
      label="Ward"
      name="ward"
      value={formData.ward}
      onChange={handleChange}
      required
      placeholder="Ward"
    />
    <GlassInput
      label="Tole"
      name="tole"
      value={formData.tole}
      onChange={handleChange}
      required
      placeholder="Tole/Area"
    />
    <GlassInput
      label="Pin Point"
      name="pinPoint"
      type="url"
      value={formData.pinPoint}
      onChange={handleChange}
      placeholder="Map URL"
    />
  </FormSection>
);

export default AddressDetailsForm;