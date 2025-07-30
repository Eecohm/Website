// AcademicYearData.jsx
import React from "react";

const AcademicYearData = ({ data }) => {
  return (
    <div style={{ marginTop: "10px", color: "#ccc" }}>
      <strong>Start Date:</strong> {data.startDate}
      <br />
      <strong>End Date:</strong> {data.endDate}
    </div>
  );
};

export default AcademicYearData;
