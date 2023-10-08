import React, { useState, useEffect } from 'react';

function DisplayProducts() {
  const [walletData, setWalletData] = useState({});

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:3002/data-endpoint')
        .then(response => response.json())
        .then(data => {
          setWalletData(data);
        })
        .catch(error => {
          console.error('Error fetching wallet data:', error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10 * 1000); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Wallet Data</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Wallet Address</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(walletData).map(([walletAddress, locationData]) => (
            <tr key={walletAddress}>
              <td>{walletAddress}</td>
              <td>{locationData.lat}</td>
              <td>{locationData.lng}</td>
              <td>{new Date(locationData.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayProducts;
