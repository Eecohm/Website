import React from "react";

const ImageModal = ({ show, url, onClose }) => {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "2rem",
          position: "relative",
        }}
      >
        <img
          src={url}
          alt="Document"
          style={{ maxWidth: "80vw", maxHeight: "80vh" }}
        />
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
