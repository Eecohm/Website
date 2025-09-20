import React from "react";

const DiagnosticKycForm = () => {
  console.log("=== DIAGNOSTIC: KYC Form is rendering ===");
  console.log("Current URL:", window.location.href);
  console.log("Timestamp:", new Date().toISOString());

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ff0000",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        textAlign: "center",
        zIndex: 9999,
      }}
    >
      <h1>🔥 DIAGNOSTIC: KYC ROUTE IS WORKING! 🔥</h1>
      <p>URL: {window.location.href}</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
      <p style={{ fontSize: "1rem", marginTop: "2rem" }}>
        If you can see this RED screen, the route is working correctly!
      </p>
    </div>
  );
};

export default DiagnosticKycForm;
