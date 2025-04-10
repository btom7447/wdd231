async function fetchMemberships() {
    try {
        const response = await fetch('./data/membership.json');
        if (!response.ok) {
            throw new Error('Failed to fetch membership data');
        }
        const memberships = await response.json();
        displayMemberships(memberships);
    } catch (error) {
        console.error('Error fetching memberships:', error);
        // Display error message to user
        const container = document.getElementById('membershipContainer');
        container.innerHTML = '<p class="error">Unable to load membership plans. Please try again later.</p>';
    }
}

function displayMemberships(memberships) {
    const membershipContainer = document.getElementById('membershipContainer');
    membershipContainer.innerHTML = '';

    memberships.forEach(membership => {
        const membershipCard = document.createElement('div');
        membershipCard.classList.add('membership-card');

        // Highlight featured plan (middle one)
        if (membership.title === "Open Space") {
            membershipCard.classList.add('featured');
        }

        membershipCard.innerHTML = `
            <h3>${membership.title}</h3>
            <p class="offer">${membership.offer}</p>
            <div class="card-price">
                <h2><span class="currency">₦</span>${membership.price.toLocaleString()}<span class="period">/month</span></h2>
            </div>
            <hr>
            <ul class="benefits-list">${membership.offer_list.map(item => `<li>${item}</li>`).join('')}</ul>
            <a href="signup.html" class="purchase-now">
                ${membership.price === 0 ? 'Get Started' : 'Purchase Now'}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right">
                    <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                </svg>
            </a>
        `;

        membershipContainer.appendChild(membershipCard);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', fetchMemberships);