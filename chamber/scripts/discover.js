// Load attractions data and display cards
fetch('./data/discover.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.getElementById('attractions-gallery');
        
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'discover-card';
            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button class="learn-more">Learn More</button>
            `;
            gallery.appendChild(card);
        });
    });

// Visit tracking functionality
function displayVisitMessage() {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysSinceLastVisit === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', now.toString());
}

// Call the function when the page loads
window.addEventListener('load', displayVisitMessage);