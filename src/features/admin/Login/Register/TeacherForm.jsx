import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/features/admin/Login/Register/Register.module.css';
import { useBaseUrl } from '@/Context/BaseUrlContext';
import { useAuth } from '@/Context/AuthContext';
import PersonalDetailForm from '@/features/admin/Login/Register/PersonalDetailForm';
import AddressDetailForm from '@/features/admin/Login/Register/AddressDetailForm';
import ContactDetailForm from '@/features/admin/Login/Register/ContactDetailForm';
import DocumentDetailForm from '@/features/admin/Login/Register/DocumentDetailForm';

const TeacherForm = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateName = (value, field) => {
    if (!value || !value.trim()) return `${field.replace('_', ' ')} is required.`;
    if (value.length < 2) return `${field.replace('_', ' ')} must be at least 2 characters long.`;
    if (!/^[a-zA-Z\s]+$/.test(value)) return `${field.replace('_', ' ')} can only contain letters and spaces.`;
    return '';
  };

  const validateRequiredField = (value, field) => {
    if (!value || !value.trim()) return `${field.replace('_', ' ')} is required.`;
    return '';
  };

  const validateContact = (value, field) => {
    if (!value && field === 'phone') return 'Phone is required';
    if (value && !/^\+?\d{7,15}$/.test(value)) return `${field.replace('_', ' ')} must be a valid phone number (7-15 digits).`;
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    setSuccessMessage('');
    const newErrors = {};

    newErrors.hire_date = formData.hire_date ? '' : 'Hire date is required';

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
      const response = await fetch(`${baseUrl}/user/teacher/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (response.status === 201) {
        setSuccessMessage('Registration form submitted correctly. Please wait while your form is verified.');
        // Optional: Redirect after 5 seconds
        setTimeout(() => navigate('/dashboard'), 5000);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        setSubmissionError('Please correct the errors in the form.');
        throw new Error('Failed to submit teacher data');
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
      <h2>Teacher Registration</h2>
      {submissionError && <p className={styles.error}>{submissionError}</p>}
      <PersonalDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateName={validateName}
      />
      <AddressDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateField={validateRequiredField}
      />
      <ContactDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateContact={validateContact}
      />
      <DocumentDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateField={validateRequiredField}
      />
      <div className={styles.formSection}>
        <div className={styles.formGrid}>
          <div>
            <label htmlFor="hire_date">Hire Date <span className={styles.required}>*</span></label>
            <input
              id="hire_date"
              type="date"
              value={formData.hire_date || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, hire_date: value }));
                setErrors((prev) => ({ ...prev, hire_date: value ? '' : 'Hire date is required' }));
              }}
              className={errors.hire_date ? styles.errorInput : ''}
              aria-invalid={!!errors.hire_date}
              aria-describedby={errors.hire_date ? 'hire_date-error' : undefined}
              required
            />
            {errors.hire_date && <p id="hire_date-error" className={styles.error}>{errors.hire_date}</p>}
          </div>
        </div>
      </div>
      <button type="submit" disabled={successMessage}>Submit</button>
      {successMessage && (
        <div className={styles.successAlert} aria-live="polite">
          <span className={styles.alertSymbol}>✅</span>
          <p className={styles.successText}>{successMessage}</p>
          <button
            className={styles.dismissButton}
            onClick={handleCloseSuccess}
          >
            OK
          </button>
        </div>
      )}
    </form>
  );
};

export default TeacherForm;