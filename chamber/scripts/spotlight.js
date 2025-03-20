// Function to get the membership level text
function getMembershipLevel(level) {
    switch (level) {
        case 1:
            return "Bronze";
        case 2:
            return "Silver";
        case 3:
            return "Gold";
        default:
            return "Unknown";
    }
}

// Fetch the JSON data
fetch('../chamber/data/members.json')
    .then(response => response.json())
    .then(data => {
        // Filter members with membershipLevel of 3
        const spotlightMembers = data.filter(member => member.membershipLevel === 3);

        // Get the spotlight section
        const spotlightSection = document.querySelector('.spotlight-container');

        // Loop through the filtered members and create business cards
        spotlightMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('business-card');

            // Populate the business card with member data
            memberCard.innerHTML = `
                <div class="business-card-header">
                    <h4>${member.name}</h4>
                    <p>${getMembershipLevel(member.membershipLevel)} Member</p>
                </div>
                <div class="business-card-body">
                    <img src="./images/${member.image}" alt="Logo of ${member.name}">
                    <div>
                        <h6><strong>Address:</strong> ${member.address}</h6>
                        <h6><strong>Phone:</strong> ${member.phone}</h6>
                        <h6><strong>Email:</strong> ${member.email}</h6>
                        <h6><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></h6>
                    </div>
                </div>
            `;

            // Append the business card to the spotlight section
            spotlightSection.appendChild(memberCard);
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));