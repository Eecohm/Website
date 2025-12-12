import React from "react";

const AdminHeader = ({ onEdit }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem",
    }}
  >
    <h2>Admin Details</h2>
    <button
      onClick={onEdit}
      style={{
        padding: "0.5rem 1.2rem",
        borderRadius: "8px",
        background: "#4fc3f7",
        color: "#fff",
        border: "none",
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      Edit
    </button>
  </div>
);

export default AdminHeader;
