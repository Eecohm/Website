import React from "react";

const KycFormTest = () => {
  console.log("KycFormTest component rendering at:", window.location.href);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        color: "white",
        fontWeight: "bold",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>KYC FORM TEST PAGE</h1>
        <p>If you can see this, the route is working!</p>
        <p>Current URL: {window.location.href}</p>
      </div>
    </div>
  );
};

export default KycFormTest;
