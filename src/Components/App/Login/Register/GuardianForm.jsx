import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useBaseUrl } from '../../../../BaseUrlContext';
import { useAuth } from './AuthContext';
import PersonalDetailForm from './PersonalDetailForm';
import ContactDetailForm from './ContactDetailForm';

const GuardianForm = () => {
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
      const response = await fetch(`${baseUrl}/user/guardian/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Failed to submit guardian data');
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Guardian Registration</h2>
      <PersonalDetailForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
      <ContactDetailForm formData={formData} setFormData={setFormData} />
      <div className={styles.formSection}>
        <h3>Guardian Details</h3>
        <div className={styles.formGrid}>
          <div>
            <label>Relation to Student *</label>
            <input
              type="text"
              value={formData.relation_to_student || ''}
              onChange={(e) => setFormData({ ...formData, relation_to_student: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GuardianForm;