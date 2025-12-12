import React from "react";

export const LoadingState = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <span>Loading...</span>
  </div>
);

export const ErrorState = ({ error }) => (
  <div style={{ padding: "2rem", textAlign: "center", color: "#f44336" }}>
    <span>Error: {error}</span>
  </div>
);
