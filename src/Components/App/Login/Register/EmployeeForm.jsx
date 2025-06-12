import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useBaseUrl } from '../../../../BaseUrlContext';
import { useAuth } from '../Auth/AuthContext';
import PersonalDetailForm from './PersonalDetailForm';
import AddressDetailForm from './AddressDetailForm';
import ContactDetailForm from './ContactDetailForm';
import DocumentDetailForm from './DocumentDetailForm';

const EmployeeForm = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file && file.size > maxFileSize) {
      setErrors((prev) => ({ ...prev, [field]: 'File size exceeds 5MB limit.' }));
      setFormData((prev) => ({ ...prev, [field]: null }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }));
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      if (!response.ok) throw new Error('Failed to submit employee data');
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Employee Registration</h2>
      <PersonalDetailForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
      <AddressDetailForm formData={formData} setFormData={setFormData} />
      <ContactDetailForm formData={formData} setFormData={setFormData} />
      <DocumentDetailForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
      <div className={styles.formSection}>
        <h3>Employee Details</h3>
        <div className={styles.formGrid}>
          <div>
            <label>Position *</label>
            <input
              type="text"
              value={formData.position || ''}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Department *</label>
            <input
              type="text"
              value={formData.department || ''}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Driving License Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'driving_license_photo')}
            />
            {errors.driving_license_photo && <p className={styles.error}>{errors.driving_license_photo}</p>}
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmployeeForm;