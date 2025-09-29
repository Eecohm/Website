import NavBar from '@/Components/App/NavBar/NavBar';
import React from 'react';

const OwnerInfoForm = () => {
  return (
    <>
      <NavBar />
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "400px", // adjust vertical spacing
        }}
      >
        Owner Info
      </h1>
    </>
  );
};

export default OwnerInfoForm;
