import React, { useState } from 'react';
import NavBar from '@/Components/App/NavBar/NavBar';
import PersonalDetailsForm from '@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm';
import AddressDetailsForm from '@/Components/App/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm';
import ContactDetailsForm from '@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm';
import DocumentDetailsForm from '@/Components/App/User/InfoModels/Forms/Components/FormSections/DocumentDetailsForm/DocumentDetailsFrom';
import OwnerSpecificForm from '@/Components/App/User/InfoModels/Forms/Components/FormSections/OwnerSpecificForm/OwnerSpecificForm';
import styles from './OwnerInfoForm.module.css';

const OwnerInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    photo: null,
    country: '',
    province: '',
    municipality: '',
    ward: '',
    tole: '',
    pinPoint: '',
    tellPhone: '',
    phone: '',
    alternatePhone: '',
    website: '',
    contactPerson: '',
    nagariktaNo: '',
    panNo: '',
    nagariktaPhoto: null,
    panPhoto: null,
    userId: '',
    userEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <NavBar />
      <form className={styles.mainDiv}>
        <div className={styles.scrollContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>Owner Information</h1>
          </div>

          <div className={styles.formContainer}>
            <PersonalDetailsForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
            />
            
            <AddressDetailsForm
              formData={formData}
              handleChange={handleChange}
            />
            
            <ContactDetailsForm
              formData={formData}
              handleChange={handleChange}
            />
            
            <DocumentDetailsForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
            />
            
            <OwnerSpecificForm
              formData={formData}
              handleChange={handleChange}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton}>
              Cancel
            </button>
            <button onClick={handleSubmit} className={styles.submitButton}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default OwnerInfoForm;
