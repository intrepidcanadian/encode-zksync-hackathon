import React, { useState } from 'react';
import "./../styles/Home.css";
import vcImage from "./../images/BillofLaden.png";
import CreateContract from "./CreateContract/CreateContract";

function CreateVC() {

  // this is to save the userdata
  const [responseMessage, setResponseMessage] = useState(null);

  // this is to save the vc
  const [vcMessage, setvcMessage] = useState(null);

  const [vcData, setVCData] = useState({
    Shipper: '',
    Carrier: '',
    Consignee: '',
    Product: '',
    Quantity: '',
    Weight: '',
  });

  const handlevcInputChange = (event) => {
    event.preventDefault();
    const {name, value } = event.target;
    setVCData({...vcData, [name]:value})
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    try {

      console.log(vcData)
      const response = await fetch('http://localhost:3001/post-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vcData),

      })
      const data = await response.json();
      setResponseMessage(data);

    } catch (error) {
      console.error('Error sending data:', error);
    }

    try {

      const response = await fetch('http://localhost:3001/get-data', {
        method: 'GET',
      })
      const data = await response.json();
      setvcMessage(data);

    } catch (error) {
      console.error('Error sending data:', error);
    }

  };

  return (

    <div className="Form">

      <form>
      <label htmlFor="shipper">Shipper:</label>
        <input
          type="text"
          id="Shipper"
          name="Shipper"
          value={vcData.Shipper}
          onChange={handlevcInputChange}
          required
        /><br /><br />
      <label htmlFor="carrier">Carrier:</label>
        <input
          type="text"
          id="Carrier"
          name="Carrier"
          value={vcData.Carrier}
          onChange={handlevcInputChange}
          required
        /><br /><br />

        <label htmlFor="consignee">Consignee:</label>
        <input
          type="text"
          id="Consignee"
          name="Consignee"
          value={vcData.Consignee}
          onChange={handlevcInputChange}
          required
        /><br /><br />

        <label htmlFor="product">Product:</label>
        <input
          type="text"
          id="Product"
          name="Product"
          value={vcData.Product}
          onChange={handlevcInputChange}
          required
        /><br /><br />

        <label htmlFor="quantity">Quantity - Packages:</label>
        <input
          type="text"
          id="Quantity"
          name="Quantity"
          value={vcData.Quantity}
          onChange={handlevcInputChange}
          required
        /><br /><br />

        <label htmlFor="weight">Weight - Pounds:</label>
        <input
          type="text"
          id="Weight"
          name="Weight"
          value={vcData.Weight}
          onChange={handlevcInputChange}
          required
        /><br /><br />


        <button onClick={handleButtonClick}>Create a Verfiable Credential</button>
      </form>

      {vcMessage && (
    <div className="vc__card">
        <img src={vcImage} alt="VC Image" className="card-image" />
        <div className="vc__card-overlay">
            <div className = "vc__credentials">
                <strong>Shipper DID:</strong> {vcMessage.credentialSubject.id}<br />
                <strong>Issuer DID:</strong> {vcMessage.issuer.id}<br />
                <strong>Issuance Date:</strong> {vcMessage.issuanceDate}<br />
                <strong>Document DID:</strong> {vcMessage.id}
            </div>
            <div>
                <strong>Shipper:</strong> {vcMessage.credentialSubject.Shipper}<br />
                <strong>Carrier:</strong> {vcMessage.credentialSubject.Carrier}<br />
                <strong>Consignee:</strong> {vcMessage.credentialSubject.Consignee}<br />
                <strong>Product:</strong> {vcMessage.credentialSubject.Product}<br />
                <strong>Quantity:</strong> {vcMessage.credentialSubject.Quantity}<br />
                <strong>Weight:</strong> {vcMessage.credentialSubject.Weight}
            </div>
        </div>
    </div>
)}

      <CreateContract />

    </div>
  );
}


export default CreateVC;
