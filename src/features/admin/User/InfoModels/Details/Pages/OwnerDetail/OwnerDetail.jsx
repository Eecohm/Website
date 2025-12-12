import React from "react";
import { useOwnerDetail } from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/hooks/useOwnerDetail";
import { OwnerHeader } from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/components/OwnerHeader";
import { OwnerDetailsCard } from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/components/OwnerDetailsCard";
import { ImageModal } from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/components/ImageModal";
import {
  LoadingState,
  ErrorState,
} from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/components/StateComponents";
import styles from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/components/Container.module.css";

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
