import React, { useEffect, useState } from "react";
import NavBar from "@/Components/App/NavBar/NavBar";
import PersonalDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import StudentSpecificForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/StudentSpecificForm/StudentSpecificForm";
import styles from "./StudentInfoForm.module.css";
const StudentInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    photo: null,
    country: "Nepal",
    province: "",
    municipality: "",
    ward: "",
    tole: "",
    pinPoint: "",
    tellPhone: "",
    phone: "",
    alternatePhone: "",
    contactPerson: "",
    userId: "",
    userEmail: "",
    academicClassId: "",
    academicClassName: "",
    idCard: null,
    transferCertificate: null,
    class10Marksheet: null,
    createdByAdmin: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  //validation state for each section
  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, errors: {} },
    addressDetails: { isValid: false, errors: {} },
    contactDetails: { isValid: false, errors: {} },
    studentDetails: { isValid: false, errors: {} },
  });
  useEffect(() => {
    console.log("🔍 Section Validations:", sectionValidations);
    const allSectionsValid = Object.values(sectionValidations).every(
      (section) => section.isValid
    );
    console.log("🎯 All sections valid:", allSectionsValid);
    setIsFormValid(allSectionsValid);
  }, [
    sectionValidations.personalDetails.isValid,
    sectionValidations.addressDetails.isValid,
    sectionValidations.contactDetails.isValid,
    sectionValidations.studentDetails.isValid,
  ]);
  const updateSectionValidation = (sectionName, isValid, errors = {}) => {
    setSectionValidations((prev) => ({
      ...prev,
      [sectionName]: { isValid, errors },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fix all validation errors before submitting");
      return;
    }
    alert("✅ Student form submitted successfully! All validation passed.");
    console.log("Student form submitted:", formData);
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

  return (
    <>
      <NavBar />
      <form className={styles.mainDiv}>
        <div className={styles.scrollContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>Student Information</h1>
          </div>

          <div className={styles.formContainer}>
            <PersonalDetailsForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("personalDetails", isValid, errors)
              }
            />
            <AddressDetailsForm
              formData={formData}
              handleChange={handleChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("addressDetails", isValid, errors)
              }
            />
            <ContactDetailsForm
              formData={formData}
              handleChange={handleChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("contactDetails", isValid, errors)
              }
            />
            <StudentSpecificForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("studentDetails", isValid, errors)
              }
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

export default StudentInfoForm;
