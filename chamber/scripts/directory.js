async function fetchMembers() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error('Failed to fetch member data');
        }
        const members = await response.json();
        displayMembers(members);
        setupViewToggle();
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displayMembers(members) {
    const memberContainer = document.getElementById('member-container');
    memberContainer.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('business-card');

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

        memberContainer.appendChild(memberCard);
    });
}

function getMembershipLevel(level) {
    switch (level) {
        case 1:
            return 'Basic';
        case 2:
            return 'Silver';
        case 3:
            return 'Gold';
        default:
            return 'Unknown';
    }
}

function setupViewToggle() {
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const memberContainer = document.getElementById('member-container');

    function setActiveButton(activeBtn, inactiveBtn) {
        activeBtn.classList.add('active');   
        inactiveBtn.classList.remove('active'); 
    }

    gridViewBtn.addEventListener('click', () => {
        memberContainer.classList.remove('list-view');
        memberContainer.classList.add('grid-view');
        setActiveButton(gridViewBtn, listViewBtn);
    });

    listViewBtn.addEventListener('click', () => {
        memberContainer.classList.remove('grid-view');
        memberContainer.classList.add('list-view');
        setActiveButton(listViewBtn, gridViewBtn);
    });
}


// Fetch and display members when the page loads
document.addEventListener('DOMContentLoaded', fetchMembers);