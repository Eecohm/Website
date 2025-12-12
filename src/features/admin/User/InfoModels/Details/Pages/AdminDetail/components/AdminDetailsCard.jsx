import React from "react";

const AdminDetailsCard = ({ admin, getKycStatusClass, onViewDocument }) => {
  if (!admin) return null;
  return (
    <div
      style={{
        background: "#202443",
        borderRadius: "12px",
        padding: "2rem",
        color: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        marginBottom: "2rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <div>
          <img
            src={
              admin.profileImage ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(admin.name)
            }
            alt="Admin Avatar"
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #4fc3f7",
            }}
          />
        </div>
        <div>
          <h3 style={{ margin: 0 }}>{admin.name}</h3>
          <p style={{ margin: "0.5rem 0", color: "#8bb1d4" }}>{admin.email}</p>
          <span
            className={getKycStatusClass(admin.kycStatus)}
            style={{ fontWeight: 600 }}
          >
            {admin.kycStatus}
          </span>
        </div>
      </div>
      {/* Documents section (dummy) */}
      <div style={{ marginTop: "1.5rem" }}>
        <h4>Documents</h4>
        {admin.documents && admin.documents.length > 0 ? (
          admin.documents.map((doc, idx) => (
            <button
              key={idx}
              onClick={() => onViewDocument(doc.url)}
              style={{ marginRight: "1rem" }}
            >
              View {doc.name}
            </button>
          ))
        ) : (
          <p>No documents uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDetailsCard;
