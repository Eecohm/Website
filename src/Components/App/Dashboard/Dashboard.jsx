import NavBar from "../NavBar/NavBar";
import { useBaseUrl } from "../../../Context/BaseUrlContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import styles from "./Dashboard.module.css";
import { StatusCheck } from "./utils/StatusCheck";


const DashBoard = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const { verified } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.warn("Access token missing");
        navigate("/login");
        return;
      }
    };
    fetchUserData();
    StatusCheck();
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.dashboard}>
        <h1>Welcome to the Dashboard</h1>
      </div>
    </>
  );
};
export default DashBoard;
