
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useBaseUrl } from '../../../../Context/BaseUrlContext';
import { useAuth } from '../../../../Context/AuthContext';
import PersonalDetailForm from './PersonalDetailForm';
import ContactDetailForm from './ContactDetailForm';

const GuardianForm = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentQuery, setStudentQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const studentInputRef = useRef(null);

  // Fetch grades on mount
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch(`${baseUrl}/sadmin/classes/`, {
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
        setErrors((prev) => ({ ...prev, grade: 'Failed to load grades.' }));
      }
    };
    if (token) fetchGrades();
    else navigate('/login');
  }, [baseUrl, token, navigate]);

  // Fetch students when grade changes
  useEffect(() => {
    if (formData.grade) {
      const fetchStudents = async () => {
        try {
          const response = await fetch(`${baseUrl}/user/students/?grade_id=${formData.grade}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) throw new Error('Failed to fetch students');
          const data = await response.json();
          setStudents(data);
        } catch (error) {
          console.error('Error fetching students:', error);
          setErrors((prev) => ({ ...prev, student_id: 'Failed to load students.' }));
        }
      };
      fetchStudents();
    } else {
      setStudents([]);
      setStudentQuery('');
      setFormData((prev) => ({ ...prev, student_id: '', student_name: '' }));
    }
  }, [formData.grade, baseUrl, token]);

  const validateName = (value, field) => {
    if (!value || !value.trim()) return `${field.replace('_', ' ')} is required.`;
    if (value.length < 2) return `${field.replace('_', ' ')} must be at least 2 characters long.`;
    if (!/^[a-zA-Z\s]+$/.test(value)) return `${field.replace('_', ' ')} can only contain letters and spaces.`;
    return '';
  };

  const validateContact = (value, field) => {
    if (!value && field === 'phone') return 'Phone is required';
    if (value && !/^\+?\d{7,15}$/.test(value)) return `${field.replace('_', ' ')} must be a valid phone number (7-15 digits).`;
    return '';
  };

  const handleStudentSelect = (student) => {
    setFormData((prev) => ({
      ...prev,
      student_id: student.id,
      student_name: student.full_name,
    }));
    setStudentQuery(student.full_name);
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, student_id: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    setSuccessMessage('');
    const newErrors = {};

    newErrors.relation_to_student = validateName(formData.relation_to_student, 'relation_to_student');
    newErrors.grade = formData.grade ? '' : 'Grade is required';
    newErrors.student_id = formData.student_id ? '' : 'Student is required';

    if (Object.values(newErrors).some((error) => error) || Object.values(errors).some((error) => error)) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      setSubmissionError('Please correct the errors in the form.');
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] && key !== 'student_name') { // Exclude student_name
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(`${baseUrl}/api/user/guardian/`, {
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
        throw new Error('Failed to submit guardian data');
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

  const filteredStudents = students.filter((student) =>
    student.full_name.toLowerCase().includes(studentQuery.toLowerCase())
  ).slice(0, 3); // Limit to 3 suggestions

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Guardian Registration</h2>
      {submissionError && <p className={styles.error}>{submissionError}</p>}
      <PersonalDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateName={validateName}
      />
      <ContactDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateContact={validateContact}
      />
      <div className={styles.formSection}>
        <h3>Guardian Details</h3>
        <div className={styles.formGrid}>
          <div>
            <label htmlFor="grade">Grade <span className={styles.required}>*</span></label>
            <select
              id="grade"
              value={formData.grade || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, grade: value, student_id: '', student_name: '' }));
                setStudentQuery('');
                setErrors((prev) => ({ ...prev, grade: value ? '' : 'Grade is required' }));
              }}
              className={errors.grade ? styles.errorInput : ''}
              aria-invalid={!!errors.grade}
              aria-describedby={errors.grade ? 'grade-error' : undefined}
              required
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.grade_name} ({grade.section})
                </option>
              ))}
            </select>
            {errors.grade && <p id="grade-error" className={styles.error}>{errors.grade}</p>}
          </div>
          <div className={styles.autocompleteContainer}>
            <label htmlFor="student_id">Student <span className={styles.required}>*</span></label>
            <input
              id="student_id"
              type="text"
              value={studentQuery}
              onChange={(e) => {
                setStudentQuery(e.target.value);
                setShowSuggestions(true);
                if (!e.target.value) {
                  setFormData((prev) => ({ ...prev, student_id: '', student_name: '' }));
                  setErrors((prev) => ({ ...prev, student_id: 'Student is required' }));
                }
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className={errors.student_id ? styles.errorInput : ''}
              aria-invalid={!!errors.student_id}
              aria-describedby={errors.student_id ? 'student_id-error' : undefined}
              placeholder="Type to search students..."
              ref={studentInputRef}
              required
            />
            {showSuggestions && studentQuery && filteredStudents.length > 0 && (
              <ul className={styles.suggestionsList}>
                {filteredStudents.map((student) => (
                  <li
                    key={student.id}
                    onClick={() => handleStudentSelect(student)}
                    className={styles.suggestionItem}
                  >
                    {student.full_name}
                  </li>
                ))}
              </ul>
            )}
            {errors.student_id && <p id="student_id-error" className={styles.error}>{errors.student_id}</p>}
          </div>
          <div>
            <label htmlFor="relation_to_student">Relation to Student <span className={styles.required}>*</span></label>
            <input
              id="relation_to_student"
              type="text"
              value={formData.relation_to_student || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, relation_to_student: value }));
                setErrors((prev) => ({ ...prev, relation_to_student: validateName(value, 'relation_to_student') }));
              }}
              onBlur={(e) => setErrors((prev) => ({ ...prev, relation_to_student: validateName(e.target.value, 'relation_to_student') }))}
              className={errors.relation_to_student ? styles.errorInput : ''}
              aria-invalid={!!errors.relation_to_student}
              aria-describedby={errors.relation_to_student ? 'relation_to_student-error' : undefined}
              required
            />
            {errors.relation_to_student && (
              <p id="relation_to_student-error" className={styles.error}>{errors.relation_to_student}</p>
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

export default GuardianForm;