import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import "./../../styles/Home.css";

function LocationSaver() {
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    if ("geolocation" in navigator) {
        const updateLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLat(position.coords.latitude);
                    setUserLng(position.coords.longitude);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        };

        updateLocation(); 
        const intervalId = setInterval(updateLocation, 10 * 1000);

        return () => {
            clearInterval(intervalId);
        };
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}, []);

  useEffect(() => {
    const getConnectedAccount = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWalletAddress(accounts[0]);
        } catch (error) {
          console.error("Error accessing the Ethereum account:", error);
        }
      } else {
        console.error("Ethereum browser extension not detected!");
      }
    };

    getConnectedAccount();
  }, []);

  useEffect(() => {
    const sendDataToServer = () => {
        const timestamp = Date.now();

      fetch('http://localhost:3002/save-data-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: walletAddress,
          lat: userLat,
          lng: userLng,
          timestamp: timestamp 
        })
      }).then(response => response.json()).then(data => {
        console.log('Data saved:', data);
      }).catch(error => {
        console.error('Error saving data:', error);
      });
    };

    const intervalId = setInterval(sendDataToServer, 10 * 1000);
    return () => clearInterval(intervalId);

  }, [walletAddress, userLat, userLng]);

  return (  
    <div>
    </div>
  );
}

export default LocationSaver;
