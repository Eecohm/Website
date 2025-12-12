import React from "react";
import { useGuardianDetail } from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/hooks/useGuardianDetail";
import { GuardianHeader } from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/components/GuardianHeader";
import { GuardianDetailsCard } from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/components/GuardianDetailsCard";
import { ImageModal } from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/components/ImageModal";
import {
  LoadingState,
  ErrorState,
} from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/components/StateComponents";
import styles from "@/features/admin/User/InfoModels/Details/Pages/GuardianDetail/components/Container.module.css";

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
