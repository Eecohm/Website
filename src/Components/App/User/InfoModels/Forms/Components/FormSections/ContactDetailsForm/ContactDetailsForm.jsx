import React from 'react';
import { Phone } from 'lucide-react';
import FormSection from '../../FormComponents/FormSection/FormSection';
import GlassInput from '../../FormComponents/GlassInput/GlassInput';

const ContactDetailsForm = ({ formData, handleChange }) => (
  <FormSection title="Contact Details" icon={Phone}>
    <GlassInput
      label="Telephone"
      name="tellPhone"
      value={formData.tellPhone}
      onChange={handleChange}
      placeholder="Telephone"
    />
    <GlassInput
      label="Mobile Phone"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      required
      placeholder="Mobile"
    />
    <GlassInput
      label="Alternate Phone"
      name="alternatePhone"
      value={formData.alternatePhone}
      onChange={handleChange}
      placeholder="Alternate"
    />
    <GlassInput
      label="Website"
      name="website"
      type="url"
      value={formData.website}
      onChange={handleChange}
      placeholder="Website URL"
    />
    <GlassInput
      label="Contact Person"
      name="contactPerson"
      value={formData.contactPerson}
      onChange={handleChange}
      placeholder="Contact person"
    />
  </FormSection>
);

export default ContactDetailsForm;