import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    address: '',
    panNo: '',
    gender: '',
    dob: '',
    userGroup: '',
    positionOrGrade: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">User Registration</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-section">
          <h3>Personal Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Enter your contact number"
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your address"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Account Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="panNo">PAN No.</label>
              <input
                type="text"
                id="panNo"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                required
                placeholder="Enter your PAN number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="userGroup">User Group</label>
              <select
                id="userGroup"
                name="userGroup"
                value={formData.userGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select User Group</option>
                <option value="admin">Admin</option>
                <option value="teaching">Teaching</option>
                <option value="non-teaching">Non-Teaching</option>
                <option value="student">Student</option>
              </select>
            </div>
            {(formData.userGroup === 'student' || formData.userGroup) && (
              <div className="form-group">
                <label htmlFor="positionOrGrade">
                  {formData.userGroup === 'student' ? 'Grade' : 'Position'}
                </label>
                <input
                  type="text"
                  id="positionOrGrade"
                  name="positionOrGrade"
                  value={formData.positionOrGrade}
                  onChange={handleChange}
                  placeholder={formData.userGroup === 'student' ? 'Enter your grade' : 'Enter your position'}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;