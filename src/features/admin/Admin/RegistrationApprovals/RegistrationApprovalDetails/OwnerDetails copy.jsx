import styles from "@/features/admin/Admin/RegistrationApprovals/RegistartionApprovals.module.css";
import { useBaseMediaUrl } from "@/Context/BaseUrlContext";
import { useState } from "react";

const OwnerDetails = ({ details }) => {
  const basemediaUrl = useBaseMediaUrl();
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  const openModal = (photoUrl) => {
    setCurrentPhoto(photoUrl);
    setShowPhotoModal(true);
  };

  const closeModal = () => {
    setShowPhotoModal(false);
    setCurrentPhoto(null);
  };

  return (
    <div className={styles.detailsContainer}>
      {/* Modal */}
      {showPhotoModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className={styles.closeButton}>
              X
            </button>
            <img
              src={currentPhoto}
              alt="Zoomed"
              className={styles.zoomedImage}
            />
          </div>
        </div>
      )}

      <h3 className={styles.detailsTitle}>Owner Details</h3>
      <p>
        <strong>Full Name:</strong> {details.full_name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {details.user?.email || "N/A"}
      </p>
      <p>
        <strong>Date of Birth:</strong> {details.date_of_birth || "N/A"}
      </p>
      <p>
        <strong>Gender:</strong> {details.gender || "N/A"}
      </p>
      <p>
        <strong>Country:</strong> {details.country || "N/A"}
      </p>
      <p>
        <strong>Province:</strong> {details.province || "N/A"}
      </p>
      <p>
        <strong>Municipality:</strong> {details.municipality || "N/A"}
      </p>
      <p>
        <strong>Ward:</strong> {details.ward || "N/A"}
      </p>
      <p>
        <strong>Tole:</strong> {details.tole || "N/A"}
      </p>
      <p>
        <strong>Phone:</strong> {details.phone || "N/A"}
      </p>
      <p>
        <strong>Alternate Phone:</strong> {details.alternate_phone || "N/A"}
      </p>
      <p>
        <strong>Nagarikta No:</strong> {details.nagarikta_no || "N/A"}
      </p>
      <p>
        <strong>PAN No:</strong> {details.pan_no || "N/A"}
      </p>

      {details.photo && (
        <div className={styles.detailImageWrapper}>
          <p>
            <strong>Photo:</strong>
          </p>
          <img
            src={`${basemediaUrl}${details.photo}`}
            alt="Owner"
            className={styles.detailImage}
            onClick={() => openModal(`${basemediaUrl}${details.photo}`)}
          />
        </div>
      )}

      {details.nagarikta_photo && (
        <div className={styles.detailImageWrapper}>
          <p>
            <strong>Nagarikta Photo:</strong>
          </p>
          <img
            src={`${basemediaUrl}${details.nagarikta_photo}`}
            alt="Nagarikta"
            className={styles.detailImage}
            onClick={() =>
              openModal(`${basemediaUrl}${details.nagarikta_photo}`)
            }
          />
        </div>
      )}

      {details.pan_photo && (
        <div className={styles.detailImageWrapper}>
          <p>
            <strong>PAN Photo:</strong>
          </p>
          <img
            src={`${basemediaUrl}${details.pan_photo}`}
            alt="PAN"
            className={styles.detailImage}
            onClick={() => openModal(`${basemediaUrl}${details.pan_photo}`)}
          />
        </div>
      )}
    </div>
  );
};

export default OwnerDetails;
