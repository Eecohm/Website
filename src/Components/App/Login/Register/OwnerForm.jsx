
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useBaseUrl } from '../../../../BaseUrlContext';
import { useAuth } from '../Auth/AuthContext';
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
  const [submissionError, setSubmissionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateTextField = (value, field) => {
    if (!value || !value.trim()) return `${field.replace('_', ' ')} is required.`;
    if (value.length < 2) return `${field.replace('_', ' ')} must be at least 2 characters long.`;
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    setSuccessMessage('');
    const newErrors = {};

    newErrors.institution_name = validateTextField(formData.institution_name, 'institution_name');

    if (Object.values(newErrors).some((error) => error) || Object.values(errors).some((error) => error)) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      setSubmissionError('Please correct the errors in the form.');
      return;
    }

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

      if (response.status === 201) {
        setSuccessMessage('Registration form submitted correctly. Please wait while your form is verified.');
        setTimeout(() => navigate('/dashboard'), 5000);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        setSubmissionError('Please correct the errors in the form.');
        throw new Error('Failed to submit owner data');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionError('An error occurred while submitting the form.');
    }
  };

  const handleCloseSuccess = () => {
    setSuccessMessage('');
    navigate('/dashboard');
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Owner Registration</h2>
      {submissionError && <p className={styles.error}>{submissionError}</p>}
      <PersonalDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateName={validateTextField}
      />
      <AddressDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateField={validateTextField}
      />
      <ContactDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateContact={(value, field) => {
          if (!value && field === 'phone') return 'Phone is required';
          if (value && !/^\+?\d{7,15}$/.test(value)) return `${field.replace('_', ' ')} must be a valid phone number (7-15 digits).`;
          return '';
        }}
      />
      <DocumentDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateField={validateTextField}
      />
      <div className={styles.formSection}>
        <h3>Owner Details</h3>
        <div className={styles.formGrid}>
          <div>
            <label htmlFor="institution_name">Institution Name <span className={styles.required}>*</span></label>
            <input
              id="institution_name"
              type="text"
              value={formData.institution_name || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, institution_name: value }));
                setErrors((prev) => ({ ...prev, institution_name: validateTextField(value, 'institution_name') }));
              }}
              onBlur={(e) => setErrors((prev) => ({ ...prev, institution_name: validateTextField(e.target.value, 'institution_name') }))}
              className={errors.institution_name ? styles.errorInput : ''}
              aria-invalid={!!errors.institution_name}
              aria-describedby={errors.institution_name ? 'institution_name-error' : undefined}
              required
            />
            {errors.institution_name && (
              <p id="institution_name-error" className={styles.error}>{errors.institution_name}</p>
            )}
          </div>
        </div>
      </div>
      <button type="submit" disabled={successMessage}>Submit</button>
      {successMessage && (
        <div className={styles.successAlert} aria-live="polite">
          <span className={styles.alertSymbol}>✅</span>
          <p className={styles.successText}>{successMessage}</p>
          <button className={styles.dismissButton} onClick={handleCloseSuccess}>
            OK
          </button>
        </div>
      )}
    </form>
  );
};

export default OwnerForm;
