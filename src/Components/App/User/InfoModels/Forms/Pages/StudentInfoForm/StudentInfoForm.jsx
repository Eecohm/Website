import React, { useState } from 'react';
import NavBar from '@/Components/App/NavBar/NavBar';
import PersonalDetailsForm from '@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm';
import AddressDetailsForm from '@/Components/App/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm';
import ContactDetailsForm from '@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm';
import StudentSpecificForm from '@/Components/App/User/InfoModels/Forms/Components/FormSections/StudentSpecificForm/StudentSpecificForm';
import styles from './StudentInfoForm.module.css';
const StudentInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', dateOfBirth: '', gender: '',
    photo: null, country: '', province: '', municipality: '', ward: '',
    tole: '', pinPoint: '', tellPhone: '', phone: '', alternatePhone: '',
    contactPerson: '', userId: '', userEmail: '', academicClassId: '',
    academicClassName: '', idCard: null, transferCertificate: null,
    class10Marksheet: null, createdByAdmin: ''
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
    console.log('Student form submitted:', formData);
  };

  return (
    <>
      <NavBar />
      <div className={styles.mainDiv}>
        <div className={styles.scrollContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>Student Information</h1>
          </div>

          <div className={styles.formContainer}>
            <PersonalDetailsForm formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />
            <AddressDetailsForm formData={formData} handleChange={handleChange} />
            <ContactDetailsForm formData={formData} handleChange={handleChange} />
            <StudentSpecificForm formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton}>Cancel</button>
            <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentInfoForm;