// Create the map and center it
const map = L.map('map').setView([28.6139, 77.2090], 12); // Center on Delhi (change as needed)

// Load tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load flood-prone streets (mocked or live)
fetch('flood_data.json')
  .then(response => response.json())
  .then(data => {
    data.streets.forEach(street => {
      const marker = L.circleMarker([street.lat, street.lng], {
        color: street.severity === 'high' ? 'red' : 'orange',
        radius: 10,
        fillOpacity: 0.7
      }).addTo(map);
      marker.bindPopup(`<b>${street.name}</b><br>Flood Severity: ${street.severity}`);
    });
  });