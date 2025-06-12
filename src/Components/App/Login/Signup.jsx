import React, { useState } from 'react';
import styles from './Signup.module.css'; // Changed to SCSS module
import { useBaseUrl } from '../../../BaseUrlContext';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    otp: '',
  });
  const baseUrl = useBaseUrl();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);

  const roleOptions = [
    { value: '', label: 'Select a role' },
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'employee', label: 'Employee' },
    { value: 'guardian', label: 'Guardian' },
    { value: 'owner', label: 'Owner' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    if (isOtpSent && formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!isOtpSent) {
      try {
        const response = await fetch(`${baseUrl}/user/signup/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword,
            role: formData.role,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          setErrors({ api: data.message || 'Failed to send OTP' });
          return;
        }
        setIsOtpSent(true);
        setErrors({});
        alert('OTP sent to your email!');
      } catch (error) {
        setErrors({ api: 'Network error. Please try again.' });
      }
    } else {
      try {
        const response = await fetch(`${baseUrl}/user/otp-verify/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            otp: formData.otp,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          setErrors({ api: data.message || 'Invalid OTP' });
          return;
        }
        alert('Form submitted successfully!');
        setFormData({ email: '', password: '', confirmPassword: '', role: '', otp: '' });
        setIsOtpSent(false);
      } catch (error) {
        setErrors({ api: 'Error verifying OTP. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        <h2>Register</h2>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="role">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.role && <span className={styles.error}>{errors.role}</span>}
        </div>

        {isOtpSent && (
          <div className={styles.formGroup}>
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              required
            />
            {errors.otp && <span className={styles.error}>{errors.otp}</span>}
          </div>
        )}

        {errors.api && <span className={styles.error}>{errors.api}</span>}

        <button type="submit" className={styles.submitBtn}>
          {isOtpSent ? 'Verify OTP' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
