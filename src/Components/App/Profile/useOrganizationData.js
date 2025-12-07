import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../../../Context/BaseUrlContext";
import { useAuth } from "../../../Context/AuthContext";

export default function useOrganizationData() {
  const baseUrl = useBaseUrl();
  const token = useAuth();
  const navigate = useNavigate();
  const tokenString = token ? token.token : null; //normalize

  const [formData, setFormData] = useState({});
  const [modalImage, setModalImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/org/orgs`, {
          headers: { Authorization: `Bearer ${tokenString}` },
        });
        if (!mounted) return;
        if (response.status === 200) {
          setFormData(response.data);
        }
      } catch (err) {
        console.error("Error fetching data", err);
        if (!mounted) return;
        setError("Failed to load organization data");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (tokenString) {
      fetchData(); //only fetch when token is avaiabel
    }

    return () => {
      mounted = false;
    };
  }, [baseUrl, tokenString]); //depend on token string

  const openModal = (imgUrl) => setModalImage(imgUrl);
  const closeModal = () => setModalImage(null);
  const handleBack = () => navigate("/dashboard/profile");

  const downloadImage = (imageUrl, filename) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    formData,
    modalImage,
    loading,
    error,
    openModal,
    closeModal,
    handleBack,
    downloadImage,
  };
}
