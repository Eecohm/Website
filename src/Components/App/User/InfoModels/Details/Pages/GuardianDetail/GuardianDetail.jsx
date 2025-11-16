import React from "react";
import { useGuardianDetail } from "./hooks/useGuardianDetail";
import { GuardianHeader } from "./components/GuardianHeader";
import { GuardianDetailsCard } from "./components/GuardianDetailsCard";
import { ImageModal } from "../OwnerDetail/components/ImageModal";
import { LoadingState, ErrorState } from "./components/StateComponents";
import styles from "./components/Container.module.css";

const GuardianDetail = () => {
  const {
    guardian,
    loading,
    error,
    showModal,
    handleEdit,
    handleViewDocument,
    handleCloseModal,
    getKycStatusClass,
  } = useGuardianDetail();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!guardian) return <p>No guardian data found</p>;

  return (
    <div className={styles.detailContainer}>
      <GuardianHeader onEdit={handleEdit} />
      <GuardianDetailsCard
        guardian={guardian}
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

export default GuardianDetail;
