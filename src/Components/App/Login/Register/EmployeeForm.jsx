import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useBaseUrl } from '../../../../Context/BaseUrlContext';
import { useAuth } from '../Auth/AuthContext';
import PersonalDetailForm from './PersonalDetailForm';
import AddressDetailForm from './AddressDetailForm';
import ContactDetailForm from './ContactDetailForm';
import DocumentDetailForm from './DocumentDetailForm';

const EmployeeForm = () => {
  const baseUrl = useBaseUrl();
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added state
  const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

  const validateTextField = (value, field) => {
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

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file && file.size > maxFileSize) {
      setErrors((prev) => ({ ...prev, [field]: 'File size exceeds 5MB limit.' }));
      setFormData((prev) => ({ ...prev, [field]: null }));
      e.target.value = '';
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }));
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    setSuccessMessage(''); // Reset success message
    const newErrors = {};

    newErrors.position = validateTextField(formData.position, 'position');
    newErrors.department = validateTextField(formData.department, 'department');

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
      const response = await fetch(`${baseUrl}/user/employee/`, {
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

      if (response.status === 401) {
        setToken(null);
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        if (typeof errorData === 'object' && !errorData.message) {
          setErrors(errorData);
          setSubmissionError('Please correct the errors in the form.');
          throw new Error('Validation errors');
        }
        throw new Error(errorData.message || 'Failed to submit employee data');
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionError(error.message || 'An error occurred while submitting the form.');
    }
  };

  const handleCloseSuccess = () => {
    setSuccessMessage('');
    navigate('/dashboard');
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Employee Registration</h2>
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
        <h3>Employee Details</h3>
        <div className={styles.formGrid}>
          <div>
            <label htmlFor="position">Position <span className={styles.required}>*</span></label>
            <input
              id="position"
              type="text"
              value={formData.position || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, position: value }));
                setErrors((prev) => ({ ...prev, position: validateTextField(value, 'position') }));
              }}
              onBlur={(e) => setErrors((prev) => ({ ...prev, position: validateTextField(e.target.value, 'position') }))}
              className={errors.position ? styles.errorInput : ''}
              aria-invalid={!!errors.position}
              aria-describedby={errors.position ? 'position-error' : undefined}
              required
            />
            {errors.position && <p id="position-error" className={styles.error}>{errors.position}</p>}
          </div>
          <div>
            <label htmlFor="department">Department <span className={styles.required}>*</span></label>
            <input
              id="department"
              type="text"
              value={formData.department || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, department: value }));
                setErrors((prev) => ({ ...prev, department: validateTextField(value, 'department') }));
              }}
              onBlur={(e) => setErrors((prev) => ({ ...prev, department: validateTextField(e.target.value, 'department') }))}
              className={errors.department ? styles.errorInput : ''}
              aria-invalid={!!errors.department}
              aria-describedby={errors.department ? 'department-error' : undefined}
              required
            />
            {errors.department && <p id="department-error" className={styles.error}>{errors.department}</p>}
          </div>
          <div>
            <label htmlFor="driving_license_photo">Driving License Photo</label>
            <input
              id="driving_license_photo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'driving_license_photo')}
              className={errors.driving_license_photo ? styles.errorInput : ''}
              aria-invalid={!!errors.driving_license_photo}
              aria-describedby={errors.driving_license_photo ? 'driving_license_photo-error' : undefined}
            />
            {errors.driving_license_photo && (
              <p id="driving_license_photo-error" className={styles.error}>{errors.driving_license_photo}</p>
            )}
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

export default EmployeeForm;