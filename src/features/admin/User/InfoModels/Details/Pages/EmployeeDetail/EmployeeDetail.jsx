import React from "react";
import { useEmployeeDetail } from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/hooks/useEmployeeDetail";
import { EmployeeHeader } from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeHeader";
import { EmployeeDetailsCard } from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/components/EmployeeDetailsCard";
import { ImageModal } from "@/features/admin/User/InfoModels/Details/Pages/OwnerDetail/components/ImageModal";
import {
  LoadingState,
  ErrorState,
} from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/components/StateComponents";
import styles from "@/features/admin/User/InfoModels/Details/Pages/EmployeeDetail/components/Container.module.css";

const EmployeeDetail = () => {
  const {
    employee,
    loading,
    error,
    showModal,
    handleEdit,
    handleViewDocument,
    handleCloseModal,
    getKycStatusClass,
  } = useEmployeeDetail();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!employee) return <p>No employee data found</p>;

  return (
    <div className={styles.detailContainer}>
      <EmployeeHeader onEdit={handleEdit} />
      <EmployeeDetailsCard
        employee={employee}
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

export default EmployeeDetail;
