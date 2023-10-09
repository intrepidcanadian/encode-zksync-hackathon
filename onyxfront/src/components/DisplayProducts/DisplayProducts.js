import React, { useState, useEffect } from "react";
import DIDRegistry from "./../Contract/DIDRegistry.json";
import { Web3Provider } from "zksync-web3";
import { ethers } from "ethers";

function DisplayProducts() {
  const [walletData, setWalletData] = useState({});
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/data-endpoint");
        const data = await response.json();

        if (contract) {
          const updatedData = {};

          for (const [walletAddress, locationData] of Object.entries(data)) {
            const dids = await contract.getDIDsForCarrier(walletAddress);
            updatedData[walletAddress] = {
              ...locationData,
              dids: dids,
            };
          }

          setWalletData(updatedData);
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10 * 1000);
    return () => clearInterval(intervalId);
  }, [contract]);

  const contractAddress = "0xE7f12fb7e014B9Bd5c87FF3F81f0E5F7D2FaDA94";

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new Web3Provider(window.ethereum);
      setProvider(web3Provider);
      const didRegistry = new ethers.Contract(
        contractAddress,
        DIDRegistry,
        web3Provider
      );
      setContract(didRegistry);
    } else {
      console.log("Please install MetaMask!");
    }
  }, []);

  return (
    <div>
      <h2>DIDs for Bill of Lading</h2>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Wallet Address</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Timestamp</th>
            <th>DIDs</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(walletData).map(([walletAddress, locationData]) => {
            const firstAddress = locationData.dids;
            console.log(locationData.dids);
            return (
              <tr key={walletAddress}>
                <td>{walletAddress}</td>
                <td>{locationData.lat}</td>
                <td>{locationData.lng}</td>
                <td>{new Date(locationData.timestamp).toLocaleString()}</td>
                <td
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  DID
                  {showTooltip && (
                    <span
                      style={{
                        position: "absolute",
                        border: "1px solid black",
                        padding: "5px",
                        zIndex: 10,
                        // left: "50px",
                        maxWidth: "20px",
                      }}
                    >
                      {locationData.dids.join(", ")}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayProducts;
