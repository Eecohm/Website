import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./styles/OrgCard.module.css/";
import axios from "axios";
import { useBaseUrl, useBaseMediaUrl } from '../../../BaseUrlContext'
import { useAuth } from "../Login/Auth/AuthContext";
import logo from "../../../assets/Images/aalok.jpg";
import panImg from "../../../assets/Images/aalok.jpg";
import regImg from "../../../assets/Images/aalok.jpg";
import vatImg from "../../../assets/Images/aalok.jpg";


const OrganizationData = () => {

  // context definations
  const baseUrl = useBaseUrl()
  const token = useAuth()
  const baseMediaUrl = useBaseMediaUrl()
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    orgName: "Acme Corporation",
    orgAddress: "1234 Elm Street, Springfield",
    telPhoneNo: "01-5551234",
    phoneNo: "9801234567",
    emailAddress: "info@acme.com",
    logoUrl: null,
    panNumber: "123456789",
    vatNumber: "987654321",
    panImage: null,
    registrationImage: null,
    vatImage: null,
  });

  const [previewImages, setPreviewImages] = useState({
    logoUrl: null,
    panImage: null,
    registrationImage: null,
    vatImage: null,
  });

  //Nav function definations
    const handleCancel = () => {
    navigate("/dashboard/profile");
  };
  


  return (
    <>
     
    </>
  );
};

export default OrganizationData;
