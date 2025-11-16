import React from "react";
import { useOwnerDetail } from "./hooks/useOwnerDetail";
import { OwnerHeader } from "./components/OwnerHeader";
import { OwnerDetailsCard } from "./components/OwnerDetailsCard";
import { ImageModal } from "./components/ImageModal";
import { LoadingState, ErrorState } from "./components/StateComponents";
import styles from "./components/Container.module.css";

const OwnerDetail = () => {
  const {
    owner,
    loading,
    error,
    showModal,
    handleEdit,
    handleViewDocument,
    handleCloseModal,
    getKycStatusClass,
  } = useOwnerDetail();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!owner) return null;

  return (
    <div className={styles.detailContainer}>
      <OwnerHeader onEdit={handleEdit} />
      <OwnerDetailsCard
        owner={owner}
        getKycStatusClass={getKycStatusClass}
        onViewDocument={handleViewDocument}
      />
      <ImageModal
        show={showModal.show}
        url={showModal.url}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default OwnerDetail;
