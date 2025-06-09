import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useBaseUrl } from '../../../../BaseUrlContext';
import { useAuth } from './AuthContext';
import PersonalDetailForm from './PersonalDetailForm';
import AddressDetailForm from './AddressDetailForm';
import ContactDetailForm from './ContactDetailForm';
import DocumentDetailForm from './DocumentDetailForm';

const TeacherForm = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [grades, setGrades] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [submissionError, setSubmissionError] = useState('');
  const [isGradesFinalized, setIsGradesFinalized] = useState(false);
  const [isLoadingGrades, setIsLoadingGrades] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);

  // Fetch grades
  useEffect(() => {
    const fetchGrades = async () => {
      setIsLoadingGrades(true);
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
        setErrors((prev) => ({ ...prev, grades: 'Failed to load grades. Please try again.' }));
      } finally {
        setIsLoadingGrades(false);
      }
    };

    if (token) {
      fetchGrades();
    } else {
      navigate('/login');
    }
  }, [baseUrl, token, navigate]);

  // Fetch subjects only when grades are finalized
  useEffect(() => {
    if (!isGradesFinalized || selectedGrades.length === 0) return;

    const fetchSubjects = async () => {
      setIsLoadingSubjects(true);
      // Map Class IDs to their Grade IDs (assuming Class has a 'grade' field with Grade ID)
      const gradeIds = grades
        .filter(grade => selectedGrades.includes(grade.id))
        .map(grade => grade.grade)
        .filter((id, index, self) => self.indexOf(id) === index) // Remove duplicates
        .join(',');
      try {
        const response = await fetch(`${baseUrl}/sadmin/subjects/?grade_ids=${gradeIds}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch subjects');
        const data = await response.json();
        setSubjects(data);
        // Clear selected subjects if they are not in the new subject list
        setSelectedSubjects(prev => prev.filter(id => data.some(subject => subject.id === id)));
        setFormData(prev => ({ ...prev, subjects: prev.subjects?.filter(id => data.some(subject => subject.id === id)) || [] }));
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setErrors((prev) => ({ ...prev, subjects: 'Failed to load subjects. Please try again.' }));
      } finally {
        setIsLoadingSubjects(false);
      }
    };

    fetchSubjects();
  }, [baseUrl, token, isGradesFinalized, selectedGrades, grades]);

  // Validation function for name fields
  const validateName = (value, field) => {
    if (!value || !value.trim()) {
      return `${field.replace('_', ' ')} is required.`;
    }
    if (value.length < 2) {
      return `${field.replace('_', ' ')} must be at least 2 characters long.`;
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return `${field.replace('_', ' ')} can only contain letters and spaces.`;
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.full_name = validateName(formData.full_name, 'full_name');
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.photo) newErrors.photo = 'Photo is required';
    if (!selectedSubjects.length) newErrors.subjects = 'At least one subject is required';
    if (!selectedGrades.length) newErrors.grades = 'At least one grade is required';
    if (!isGradesFinalized) newErrors.grades = 'Please finalize grade selection';
    if (!formData.hire_date) newErrors.hire_date = 'Hire date is required';

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value)
    );
    setErrors((prev) => ({ ...prev, ...filteredErrors }));
    return Object.keys(filteredErrors).length === 0;
  };

  const handleGradeSelect = (gradeId) => {
    if (!selectedGrades.includes(gradeId)) {
      setSelectedGrades([...selectedGrades, gradeId]);
      setErrors((prev) => ({ ...prev, grades: '' }));
    }
  };

  const handleGradeDeselect = (gradeId) => {
    const updatedGrades = selectedGrades.filter(id => id !== gradeId);
    setSelectedGrades(updatedGrades);
    setErrors((prev) => ({
      ...prev,
      grades: updatedGrades.length ? '' : 'At least one grade is required'
    }));
  };

  const handleFinalizeGrades = () => {
    if (selectedGrades.length === 0) {
      setErrors((prev) => ({ ...prev, grades: 'Please select at least one grade before finalizing' }));
      return;
    }
    setFormData({ ...formData, grades: selectedGrades });
    setIsGradesFinalized(true);
    setErrors((prev) => ({ ...prev, grades: '' }));
  };

  const handleClearGrades = () => {
    setSelectedGrades([]);
    setFormData({ ...formData, grades: [] });
    setIsGradesFinalized(false);
    setSelectedSubjects([]);
    setFormData(prev => ({ ...prev, subjects: [] }));
    setErrors((prev) => ({ ...prev, grades: '', subjects: '' }));
  };

  const handleSubjectSelect = (subjectId) => {
    if (!selectedSubjects.includes(subjectId)) {
      setSelectedSubjects([...selectedSubjects, subjectId]);
      setFormData({ ...formData, subjects: [...selectedSubjects, subjectId] });
      setErrors((prev) => ({ ...prev, subjects: '' }));
    }
  };

  const handleSubjectDeselect = (subjectId) => {
    const updatedSubjects = selectedSubjects.filter(id => id !== subjectId);
    setSelectedSubjects(updatedSubjects);
    setFormData({ ...formData, subjects: updatedSubjects });
    setErrors((prev) => ({
      ...prev,
      subjects: updatedSubjects.length ? '' : 'At least one subject is required'
    }));
  };

  const handleClearSubjects = () => {
    setSelectedSubjects([]);
    setFormData({ ...formData, subjects: [] });
    setErrors((prev) => ({ ...prev, subjects: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    setErrors({});

    if (!validateForm()) {
      setSubmissionError('Please fill all required fields correctly.');
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'subjects' || key === 'grades') {
        formData[key].forEach(item => formDataToSend.append(key, item));
      } else if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(`${baseUrl}/user/teacher/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (typeof errorData === 'object' && !errorData.message) {
          const fieldErrors = {};
          for (const [field, messages] of Object.entries(errorData)) {
            fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages;
          }
          setErrors(fieldErrors);
          setSubmissionError('Please correct the errors in the form.');
          throw new Error('Validation errors');
        }
        throw new Error(errorData.message || 'Failed to submit teacher data');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      if (Object.keys(errors).length === 0) {
        setSubmissionError(error.message || 'An error occurred while submitting the form. Please try again.');
      }
    }
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
      <AddressDetailForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
      <ContactDetailForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
      <DocumentDetailForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
      <div className={styles.formSection}>
        <h3>Teacher Details</h3>
        <div className={styles.formGrid}>
          <div className={styles.gradeContainer}>
            <label>Grades *</label>
            <div className={styles.gradeLists}>
              <div className={styles.gradeList}>
                <h4>Available Grades</h4>
                {isLoadingGrades ? (
                  <p className={styles.loading}>Loading grades...</p>
                ) : (
                  <ul>
                    {grades
                      .filter(grade => !selectedGrades.includes(grade.id))
                      .map(grade => (
                        <li
                          key={grade.id}
                          onClick={() => handleGradeSelect(grade.id)}
                          className={styles.gradeItem}
                          title={`Add ${grade.grade_name} (${grade.section})`}
                        >
                          {grade.grade_name} ({grade.section})
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div className={styles.gradeList}>
                <h4>Selected Grades</h4>
                <ul>
                  {selectedGrades.map(gradeId => {
                    const grade = grades.find(g => g.id === gradeId);
                    return grade ? (
                      <li
                        key={grade.id}
                        onClick={() => handleGradeDeselect(grade.id)}
                        className={styles.gradeItem}
                        title={`Remove ${grade.grade_name} (${grade.section})`}
                      >
                        {grade.grade_name} ({grade.section})
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={handleFinalizeGrades}
                disabled={isLoadingGrades || selectedGrades.length === 1}
              >
                Finalize Grades
              </button>
              <button
                type="button"
                className={styles.actionButton}
                onClick={handleClearGrades}
                disabled={isLoadingGrades || selectedGrades.length === 0}
              >
                Clear All
              </button>
            </div>
            {errors.grades && <p className={styles.error}>{errors.grades}</p>}
          </div>
          <div className={styles.subjectContainer}>
            <label>Subjects *</label>
            <div className={isGradesFinalized ? styles.subjectLists : styles.disabled}>
              <div className={styles.subjectList}>
                <h4>Available Subjects</h4>
                {!isGradesFinalized ? (
                  <p className={styles.info}>Please finalize grade selection to view subjects.</p>
                ) : isLoadingSubjects ? (
                  <p className={styles.loading}>Loading subjects...</p>
                ) : (
                  <ul>
                    {subjects
                      .filter(subject => !selectedSubjects.includes(subject.id))
                      .map(subject => (
                        <li
                          key={subject.id}
                          onClick={() => handleSubjectSelect(subject.id)}
                          className={styles.subjectItem}
                          title={`Add ${subject.name}`}
                        >
                          {subject.name}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div className={styles.subjectList}>
                <h4>Selected Subjects</h4>
                <ul>
                  {selectedSubjects.map(subjectId => {
                    const subject = subjects.find(s => s.id === subjectId);
                    return subject ? (
                      <li
                        key={subject.id}
                        onClick={() => handleSubjectDeselect(subject.id)}
                        className={styles.subjectItem}
                        title={`Remove ${subject.name}`}
                      >
                        {subject.name}
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={handleClearSubjects}
                disabled={isLoadingSubjects || !isGradesFinalized || !selectedSubjects.length}
              >
                Clear Subjects
              </button>
            </div>
            {errors.subjects && <p className={styles.error}>{errors.subjects}</p>}
          </div>
          <div>
            <label>Hire Date *</label>
            <input
              type="date"
              value={formData.hire_date || ''}
              onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
              className={errors.hire_date ? styles.errorInput : ''}
              required
            />
            {errors.hire_date && <p className={styles.error}>{errors.hire_date}</p>}
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TeacherForm;