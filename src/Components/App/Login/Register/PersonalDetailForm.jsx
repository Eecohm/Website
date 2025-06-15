import React from 'react';
import styles from './Register.module.css';

const PersonalDetailForm = ({ formData, setFormData, errors, setErrors, validateName }) => {
  const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
  const minWidth = 400; // Passport photo width in pixels
  const maxWidth = 450;
  const minHeight = 500; // Passport photo height in pixels
  const maxHeight = 600;
  const minAspectRatio = 1.25; // Approx. 45mm/35mm
  const maxAspectRatio = 1.35;

  const validateImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const { width, height } = img;
        const aspectRatio = height / width;
        URL.revokeObjectURL(img.src); // Clean up
        if (width < minWidth || width > maxWidth || height < minHeight || height > maxHeight) {
          reject(`Photo must be a passport-sized image (approx. ${minWidth}-${maxWidth}px width, ${minHeight}-${maxHeight}px height).`);
        } else if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
          reject('Photo aspect ratio is incorrect for a passport-sized image.');
        } else {
          resolve();
        }
      };
      img.onerror = () => {
        reject('Invalid image file.');
        URL.revokeObjectURL(img.src);
      };
    });
  };

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (!file) {
      setErrors((prev) => ({ ...prev, [field]: 'This field is required.' }));
      setFormData((prev) => ({ ...prev, [field]: null }));
      e.target.value = '';
      return;
    }

    if (file.size > maxFileSize) {
      setErrors((prev) => ({ ...prev, [field]: 'File size exceeds 5MB limit.' }));
      setFormData((prev) => ({ ...prev, [field]: null }));
      e.target.value = '';
      return;
    }

    try {
      await validateImageDimensions(file);
      setErrors((prev) => ({ ...prev, [field]: '' }));
      setFormData((prev) => ({ ...prev, [field]: file }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
      setFormData((prev) => ({ ...prev, [field]: null }));
      e.target.value = '';
    }
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'full_name') {
      setErrors((prev) => ({ ...prev, [field]: validateName(value, field) }));
    } else if (field === 'date_of_birth' || field === 'gender') {
      setErrors((prev) => ({ ...prev, [field]: value ? '' : `${field.replace('_', ' ')} is required.` }));
    }
  };

  const handleBlur = (e, field) => {
    const value = e.target.value;
    if (field === 'full_name') {
      setErrors((prev) => ({ ...prev, [field]: validateName(value, field) }));
    }
  };

  return (
    <div className={styles.formSection}>
      <h3>Personal Details</h3>
      <div className={styles.formGrid}>
        <div>
          <label htmlFor="full_name">Full Name <span className={styles.required}>*</span></label>
          <input
            id="full_name"
            type="text"
            value={formData.full_name || ''}
            onChange={(e) => handleChange(e, 'full_name')}
            onBlur={(e) => handleBlur(e, 'full_name')}
            className={errors.full_name ? styles.errorInput : ''}
            aria-invalid={!!errors.full_name}
            aria-describedby={errors.full_name ? 'full_name-error' : undefined}
            required
          />
          {errors.full_name && <p id="full_name-error" className={styles.error}>{errors.full_name}</p>}
        </div>
        <div>
          <label htmlFor="date_of_birth">Date of Birth <span className={styles.required}>*</span></label>
          <input
            id="date_of_birth"
            type="date"
            value={formData.date_of_birth || ''}
            onChange={(e) => handleChange(e, 'date_of_birth')}
            className={errors.date_of_birth ? styles.errorInput : ''}
            aria-invalid={!!errors.date_of_birth}
            aria-describedby={errors.date_of_birth ? 'date_of_birth-error' : undefined}
            required
          />
          {errors.date_of_birth && <p id="date_of_birth-error" className={styles.error}>{errors.date_of_birth}</p>}
        </div>
        <div>
          <label htmlFor="gender">Gender <span className={styles.required}>*</span></label>
          <select
            id="gender"
            value={formData.gender || ''}
            onChange={(e) => handleChange(e, 'gender')}
            className={errors.gender ? styles.errorInput : ''}
            aria-invalid={!!errors.gender}
            aria-describedby={errors.gender ? 'gender-error' : undefined}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p id="gender-error" className={styles.error}>{errors.gender}</p>}
        </div>
        <div>
          <label htmlFor="photo">Passport Size Photo <span className={styles.required}>*</span></label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'photo')}
            className={errors.photo ? styles.errorInput : ''}
            aria-invalid={!!errors.photo}
            aria-describedby={errors.photo ? 'photo-error' : undefined}
            required
          />
          {errors.photo && <p id="photo-error" className={styles.error}>{errors.photo}</p>}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailForm;