import React, { useEffect, useState } from "react";
import NavBar from "@/Components/App/NavBar/NavBar";
import PersonalDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/Components/App/User/InfoModels/Forms/Components//FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import DocumentDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/DocumentDetailsForm/DocumentDetailsFrom";
import TeacherSpecificForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/TeacherSpecificForm/TeacherSpecificForm";
import styles from "./TeacherInfoForm.module.css";
import { useAuth } from "@/Context/AuthContext";
import { useBaseUrl } from "@/Context/BaseUrlContext";

const TeacherInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    photo: null,
    country: "",
    province: "",
    municipality: "",
    ward: "",
    tole: "",
    pinPoint: "",
    tellPhone: "",
    phone: "",
    alternatePhone: "",
    contactPerson: "",
    nagariktaNo: "",
    panNo: "",
    nagariktaPhoto: null,
    panPhoto: null,
    userId: "",
    userEmail: "",
    academicQualification: "",
    jobApplication: null,
    hiringLetter: null,
    resumeCv: null,
    academicClassId: "",
    academicClassName: "",
    subjectIds: "",
    subjectNames: "",
    skillCertifications: null,
  });

  const [modalNotification, setModalNotification] = useState(null);
  const [EditDetail, SetEditDetail] = useState(false);

  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, error: {} },
    addressDetails: { isValid: false, error: {} },
    contactDetails: { isValid: false, error: {} },
    documentDetails: { isValid: false, error: {} },
    teacherDetails: { isValid: false, error: {} },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // const {isSubmitting, submitForm} = {};
  // const baseUrl = useBaseUrl();
  // const {login, setToken} = useAuth();

  useEffect(() => {
    const allSectionValid = Object.values(sectionValidations).every(
      (section) => section.isValid
    );
    setIsFormValid(allSectionValid);
  }, [
    sectionValidations.personalDetails.isValid,
    sectionValidations.addressDetails.isValid,
    sectionValidations.contactDetails.isValid,
    sectionValidations.documentDetails.isValid,
    sectionValidations.teacherDetails.isValid,
  ]);

  const updateSectionValidation = (sectionName, isValid, errors = {}) => {
    setSectionValidations((prev) => ({
      ...prev,
      [sectionName]: { isValid, errors },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = () => {
    e.preventDefault();

    if (!isFormValid) {
      setModalNotification({
        type: "error",
        message:
          "Please fill all required fields correctly before submitting the form.",
      });
      return;
    }

    
  };

  return (
    <>
      <NavBar />
      <form className={styles.mainDiv}>
        <div className={styles.scrollContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>Teacher Information</h1>
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
            <TeacherSpecificForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton}>Cancel</button>
            <button onClick={handleSubmit} className={styles.submitButton}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TeacherInfoForm;
