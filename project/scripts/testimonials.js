// DOM Elements
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-buttons .prev');
const nextBtn = document.querySelector('.carousel-buttons .next');
let currentIndex = 0;
let testimonials = [];
let cardsPerView = 2; // Default number of visible cards

// Set number of cards based on screen size
function setCardsPerView() {
    cardsPerView = window.innerWidth <= 1024 ? 1 : 2;
}

// Fetch testimonials from JSON file
async function fetchTestimonials() {
    try {
        const response = await fetch('./data/testimonials.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error loading testimonials:', error);
        return [{
            name: "Default User",
            text: "We're having trouble loading testimonials. Please check back later.",
            image: "default-user.jpg"
        }];
    }
}

// Create testimonial cards
function createTestimonialCards() {
    track.innerHTML = '';
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <span class="quote-mark">"</span>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="client">
                <img src="./images/${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">
                <div>
                    <h5>${testimonial.name}</h5>
                    <h6 class="testimonial-name">${testimonial.title}</h6>
                </div>
                
            </div>
        `;
        track.appendChild(card);
    });
}

// Update carousel position
function updateCarousel() {
    const cardWidth = 100 / cardsPerView;
    track.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
}

// Navigation functions
function goToPrev() {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateCarousel();
    toggleNavButtons();
}

function goToNext() {
    const maxIndex = Math.ceil(testimonials.length / cardsPerView) - 1;
    currentIndex = Math.min(currentIndex + 1, maxIndex);
    updateCarousel();
    toggleNavButtons();
}

// Toggle navigation buttons
function toggleNavButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= Math.ceil(testimonials.length / cardsPerView) - 1;
}

// Initialize carousel
async function initCarousel() {
    setCardsPerView();
    window.addEventListener('resize', () => {
        const oldCardsPerView = cardsPerView;
        setCardsPerView();
        
        // Only update if view changed
        if (oldCardsPerView !== cardsPerView) {
            currentIndex = 0; // Reset to first slide
            updateCarousel();
            toggleNavButtons();
        }
    });

    track.innerHTML = '<div class="loading">Loading testimonials...</div>';
    testimonials = await fetchTestimonials();
    createTestimonialCards();
    updateCarousel();
    toggleNavButtons();
}

// Event listeners
prevBtn.addEventListener('click', goToPrev);
nextBtn.addEventListener('click', goToNext);
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToPrev();
    if (e.key === 'ArrowRight') goToNext();
});

// Initialize
document.addEventListener('DOMContentLoaded', initCarousel);