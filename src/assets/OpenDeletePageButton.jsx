import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";


const OpenDeletePageButton = () => {
  const handleOpenInNewTab = () => {
    window.open("/deleteemp", "");
  };

  return (
    <button
      onClick={handleOpenInNewTab}
      style={{
        padding: "10px 20px",
        margin: "20px",
        backgroundColor: "#e74c3c",
        color: "#fff",
        fontWeight: "bold",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      <AiTwotoneDelete />Open Delete Employee Page
    </button>
  );
};

export default OpenDeletePageButton;
