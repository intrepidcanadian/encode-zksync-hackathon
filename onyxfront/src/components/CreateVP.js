import React, { useState } from "react";
import vpimage from "./../images/BillofLadenVP.png";
import "./../styles/Home.css";

function CreateVP() {
  const [vpMessage, setvpMessage] = useState(null);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/create-vpdata", {
        method: "GET",
      });
      const data = await response.json();
      setvpMessage(data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const contentStyle = {
    maxHeight: "300px",
    maxWidth: "100%",
    overflowY: "none",
    whiteSpace: "pre-wrap",
    border: "1px solid #ccc",
    padding: "10px",
    borderbox: "box-sizing",
  };

  return (
    <div className = "container__vp">
      <button onClick={handleButtonClick}>
        Create Verifiable Presentation
      </button>

      {vpMessage && (
        <div className="vp__card">
          <img src={vpimage} alt="VP Image" className="card-image" />
          <div className="vp__card-overlay">
            <div className="vp__credentials">
              <strong>Type:</strong> {vpMessage.type}
              <br />
              <strong>Holder:</strong> {vpMessage.holder}
              <br />
              <strong>Verifiable Credential:</strong> {vpMessage.verifiableCredential}
              <br />
              <strong>Issuance Date:</strong> {vpMessage.issuanceDate}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateVP;
