async function fetchAmenities() {
    try {
        const response = await fetch('./data/amenities.json');
        if (!response.ok) {
            throw new Error('Failed to fetch amenities data');
        }
        const amenity = await response.json();
        displayAmenities(amenities);
    } catch (error) {
        console.error('Error fetching amenities:', error);
    }
}

function displayAmenitiess(amenity) {
    const amenityContainer = document.getElementById('amenityContainer');
    amenityContainer.innerHTML = '';

    amenity.forEach(amenity => {
        const amenityCard = document.createElement('div');
        amenityCard.classList.add('amenity-card');

        memberCard.innerHTML = `
            <div>
                <img src="./images/${amenity.image}" alt="Picture of ${member.title}">
                <div>
                    <h4>${amenity.title}</h4>
                    <p>${amenity.description}</p>
                </div>
            </div>
        `;

        amenityContainer.appendChild(amenityCard);
    });
}
async function fetchAmenities() {
    try {
        const response = await fetch('./data/amenities.json');
        if (!response.ok) {
            throw new Error('Failed to fetch amenities data');
        }
        const amenities = await response.json();
        displayAmenities(amenities);
    } catch (error) {
        console.error('Error fetching amenities:', error);
    }
}

function displayAmenities(amenities) {
    const amenityContainer = document.getElementById('amenityContainer');
    amenityContainer.innerHTML = '';

    amenities.forEach(amenity => {
        const amenityCard = document.createElement('div');
        amenityCard.classList.add('amenity-card');

        amenityCard.innerHTML = `
            <div class="amenity-image-wrapper">
                <img src="./images/${amenity.image}" alt="Picture of ${amenity.title}">
                <div class="amenity-info">
                    <h4>${amenity.title}</h4>
                    <p>${amenity.description}</p>
                </div>
            </div>
        `;

        amenityContainer.appendChild(amenityCard);
    });
}

fetchAmenities();