import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useBaseUrl } from '../../../../BaseUrlContext';
import { useAuth } from './AuthContext';
import PersonalDetailForm from './PersonalDetailForm';
import AddressDetailForm from './AddressDetailForm';
import ContactDetailForm from './ContactDetailForm';
import DocumentDetailForm from './DocumentDetailForm';

const OwnerForm = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    }
    try {
      const response = await fetch(`${baseUrl}/user/owner/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Failed to submit owner data');
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Owner Registration</h2>
      <PersonalDetailForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
      <AddressDetailForm formData={formData} setFormData={setFormData} />
      <ContactDetailForm formData={formData} setFormData={setFormData} />
      <DocumentDetailForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
      <div className={styles.formSection}>
        <h3>Owner Details</h3>
        <div className={styles.formGrid}>
          <div>
            <label>Institution Name *</label>
            <input
              type="text"
              value={formData.institution_name || ''}
              onChange={(e) => setFormData({ ...formData, institution_name: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default OwnerForm;