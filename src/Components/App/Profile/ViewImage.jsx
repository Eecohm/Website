import { useLocation, useNavigate } from "react-router-dom";
import styles from "@/Components/App/Profile/styles/Profile.module.css";

const ViewImage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image } = location.state || {};
  const { type } = useParams();

  const getTitle = () => {
    switch (type) {
      case "logoUrl":
        return "Organization Logo";
      case "panImage":
        return "PAN Image";
      case "registrationImage":
        return "Registration Image";
      case "vatImage":
        return "VAT Image";
      default:
        return "Image";
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!image) {
    return (
      <div className={styles.imageViewContainer}>
        <p>No image to display</p>
        <button onClick={handleBack} className={styles.backButton}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.imageViewContainer}>
      <h2>{getTitle()}</h2>
      <div className={styles.imageWrapper}>
        <img src={image} alt={getTitle()} className={styles.fullImage} />
      </div>
      <button onClick={handleBack} className={styles.backButton}>
        Back
      </button>
    </div>
  );
};

export default ViewImage;
