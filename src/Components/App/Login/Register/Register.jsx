import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import NavBar from "../../NavBar/NavBar";
import { useBaseUrl } from "../../../../BaseUrlContext";
import { useAuth } from "../Auth/AuthContext";
import StudentForm from "./StudentForm";
import TeacherForm from "./TeacherForm";
import GuardianForm from "./GuardianForm";
import EmployeeForm from "./EmployeeForm";
import OwnerForm from "./OwnerForm";

const Register = () => {
  const baseUrl = useBaseUrl();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(`${baseUrl}/user/me/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setRole(data.role.toLowerCase());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
        navigate("/login");
      }
    };
    fetchUserData();
  }, [baseUrl, navigate, token]);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  let FormComponent;
  switch (role) {
    case "student":
      FormComponent = StudentForm;
      break;
    case "teacher":
      FormComponent = TeacherForm;
      break;
    case "guardian":
      FormComponent = GuardianForm;
      break;
    case "employee":
      FormComponent = EmployeeForm;
      break;
    case "owner":
      FormComponent = OwnerForm;
      break;
    default:
      return (
        <>
          <NavBar />
          <div className={styles.registrationForm}>
            <div className={styles.formContainer}>
              <h2>Error</h2>
              <p>Invalid or unset role. Please contact support.</p>
            </div>
          </div>
        </>
      );
  }

  return (
    <>
      <NavBar />
      <div className={styles.registrationForm}>
        <FormComponent />
      </div>
    </>
  );
};

export default Register;
