import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useBaseUrl } from '../../../../BaseUrlContext';
import { useAuth } from '../Auth/AuthContext';
import PersonalDetailForm from './PersonalDetailForm';
import AddressDetailForm from './AddressDetailForm';
import ContactDetailForm from './ContactDetailForm';

const StudentForm = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [grades, setGrades] = useState([]);
  const [submissionError, setSubmissionError] = useState('');
  const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch(`${baseUrl}/sadmin/classes`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch grades');
        const data = await response.json();
        setGrades(data);
      } catch (error) {
        console.error('Error fetching grades:', error);
        setErrors((prev) => ({ ...prev, grade: 'Failed to load grades. Please try again.' }));
      }
    };
    if (token) {
      fetchGrades();
    } else {
      navigate('/login');
    }
  }, [baseUrl, token, navigate]);

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

  const validateName = (value, field) => {
    if (!value) return `${field.replace('_', ' ')} is required`;
    if (!/^[a-zA-Z\s]+$/.test(value)) return `${field.replace('_', ' ')} can only contain alphabets and spaces`;
    return '';
  };

  const validateContact = (value, field) => {
    if (!value && field === 'phone') return 'Phone is required';
    if (value && !/^(97|98)\d{8}$/.test(value)) return `${field.replace('_', ' ')} must be 10 digits starting with 97 or 98`;
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.full_name = validateName(formData.full_name, 'full_name');
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.photo) newErrors.photo = 'Photo is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.province) newErrors.province = 'Province is required';
    if (!formData.municipality) newErrors.municipality = 'Municipality is required';
    if (!formData.ward) newErrors.ward = 'Ward is required';
    if (!formData.tole) newErrors.tole = 'Tole is required';
    newErrors.phone = validateContact(formData.phone, 'phone');
    newErrors.mother_name = validateName(formData.mother_name, 'mother_name');
    newErrors.father_name = validateName(formData.father_name, 'father_name');
    newErrors.guardian_contact = validateContact(formData.guardian_contact, 'guardian_contact');
    if (!formData.birth_certificate_photo) newErrors.birth_certificate_photo = 'Birth certificate photo is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value)
    );
    setErrors((prev) => ({ ...prev, ...filteredErrors }));
    return Object.keys(filteredErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    setErrors({}); // Clear previous errors
    if (!validateForm()) {
      setSubmissionError('Please fill all required fields correctly.');
      return;
    }
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    }
    try {
      const response = await fetch(`${baseUrl}/user/student/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (typeof errorData === 'object' && !errorData.message) {
          // Map backend errors to fields
          const fieldErrors = {};
          for (const [field, messages] of Object.entries(errorData)) {
            fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages;
          }
          setErrors(fieldErrors);
          setSubmissionError('Please correct the errors in the form.');
          throw new Error('Validation errors');
        }
        throw new Error(errorData.message || 'Failed to submit student data');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      if (!errors) {
        setSubmissionError(error.message || 'An error occurred while submitting the form. Please try again.');
      }
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Student Registration</h2>
      {submissionError && <p className={styles.error}>{submissionError}</p>}
      <PersonalDetailForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} validateName={validateName} />
      <AddressDetailForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
      <ContactDetailForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} validateContact={validateContact} />
      <div className={styles.formSection}>
        <h3>Student Details</h3>
        <div className={styles.formGrid}>
          <div>
            <label>Mother's Name *</label>
            <input
              type="text"
              value={formData.mother_name || ''}
              onChange={(e) => {
                setFormData({ ...formData, mother_name: e.target.value });
                setErrors((prev) => ({ ...prev, mother_name: validateName(e.target.value, 'mother_name') }));
              }}
              className={errors.mother_name ? styles.errorInput : ''}
              required
            />
            {errors.mother_name && <p className={styles.error}>{errors.mother_name}</p>}
          </div>
          <div>
            <label>Father's Name *</label>
            <input
              type="text"
              value={formData.father_name || ''}
              onChange={(e) => {
                setFormData({ ...formData, father_name: e.target.value });
                setErrors((prev) => ({ ...prev, father_name: validateName(e.target.value, 'father_name') }));
              }}
              className={errors.father_name ? styles.errorInput : ''}
              required
            />
            {errors.father_name && <p className={styles.error}>{errors.father_name}</p>}
          </div>
          <div>
            <label>Guardian Contact</label>
            <input
              type="text"
              value={formData.guardian_contact || ''}
              onChange={(e) => {
                setFormData({ ...formData, guardian_contact: e.target.value });
                setErrors((prev) => ({ ...prev, guardian_contact: validateContact(e.target.value, 'guardian_contact') }));
              }}
              className={errors.guardian_contact ? styles.errorInput : ''}
            />
            {errors.guardian_contact && <p className={styles.error}>{errors.guardian_contact}</p>}
          </div>
          <div>
            <label>Birth Certificate Photo *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'birth_certificate_photo')}
              className={errors.birth_certificate_photo ? styles.errorInput : ''}
              required
            />
            {errors.birth_certificate_photo && <p className={styles.error}>{errors.birth_certificate_photo}</p>}
          </div>
          <div>
            <label>Grade *</label>
            <select
              value={formData.grade || ''}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className={errors.grade ? styles.errorInput : ''}
              required
              >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.grade_name} ({grade.section})
                </option>
              ))}
            </select>
            {errors.grade && <p className={styles.error}>{errors.grade}</p>}
          </div>
          <div>
            <label>Roll Number</label>
            <input
              type="number"
              value={formData.rollno || ''}
              onChange={(e) => setFormData({ ...formData, rollno: e.target.value })}
            />
          </div>
          <div>
            <label>Symbol Number</label>
            <input
              type="text"
              value={formData.symbol_number || ''}
              onChange={(e) => setFormData({ ...formData, symbol_number: e.target.value })}
            />
          </div>
          <div>
            <label>IEMIS Code</label>
            <input
              type="text"
            value={formData.iemis_code || ''}
              onChange={(e) => setFormData({ ...formData, iemis_code: e.target.value })}
            />
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;