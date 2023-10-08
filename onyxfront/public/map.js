let map;
let userMarker;
let markers = [];
let infoWindow; 

function updateUserLocation() {
  if (!userMarker) return;

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(`Latitude: ${lat}, longitude: ${lng}`);

        const pos = { lat: lat, lng: lng };

        userMarker.setPosition(pos);
        map.setCenter(pos);                
        
      },
      function (error) {
        console.error("Error getting user location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function fetchDataAndUpdateMarkers() {
  fetch("http://localhost:3002/data-endpoint")
    .then((response) => response.json())
    .then((data) => {
      markers.forEach(marker => marker.setMap(null));
      markers = [];

      for (const [walletAddress, location] of Object.entries(data)) {
        const latLng = { lat: parseFloat(location.lat), lng: parseFloat(location.lng) };
        const marker = new google.maps.Marker({
          map: map,
          position: latLng,
          title: walletAddress,
          opacity: 1.0,
        });

        marker.addListener("click", () => {
          const contentString = `
            <div style="color: black;">
              <p style="font-weight: bold;">Wallet Address: ${walletAddress}</p>
              <p style="font-weight: bold;">Latitude: ${latLng.lat}</p>
              <p style="font-weight: bold;">Longitude: ${latLng.lng}</p>
            </div>
          `;
          infoWindow.setContent(contentString);
          infoWindow.open(map, marker);
        });

        markers.push(marker); 
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function initMap() {
  const pos = { lat: 0, lng: 0 }; 

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: pos,  
    mapId: "MAP_ID",
  });

  userMarker = new google.maps.Marker({
    map: map,
    position: pos,
    title: "Current Location",
  });

  infoWindow = new google.maps.InfoWindow();

  updateUserLocation();
  fetchDataAndUpdateMarkers();

  setInterval(() => {
    updateUserLocation();
    fetchDataAndUpdateMarkers();
  }, 30 * 1000);
}

initMap();
