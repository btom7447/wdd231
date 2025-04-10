document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map', {
        scrollWheelZoom: false 
    }).setView([4.9057, 8.3021], 24
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([4.9186, 8.3225]).addTo(map)
        .bindPopup('<b>Our Location</b><br>Godswill Akpabio International Stadium, Uyo')
        .openPopup();
    
    L.circle([4.9057, 8.3021], {
        color: '#243c74',
        fillColor: '#243c74',
        fillOpacity: 0.2,
        radius: 300
    }).addTo(map);
});