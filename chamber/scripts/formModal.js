window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.hidden = false; // Ensure it's visible
        modal.showModal();
        document.body.classList.add('modal-open');
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.close();
        modal.hidden = true; // Hide it again
        document.body.classList.remove('modal-open');
    }
};

document.addEventListener("DOMContentLoaded", function() {
    // FORM HANDLING
    const form = document.querySelector("form");
    const timestampField = document.querySelector("#timestamp");

    // Set timestamp if field exists
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Form validation if form exists
    if (form) {
        form.addEventListener("submit", function(event) {
            let isValid = true;

            // Validate fields (using correct IDs from your HTML)
            const firstName = document.querySelector("#first-name");
            const lastName = document.querySelector("#last-name");
            const email = document.querySelector("#email");
            const phone = document.querySelector("#phone");
            const orgTitle = document.querySelector("#organization-title");
            const businessName = document.querySelector("#business-name");

            // Validation checks
            if (!firstName?.value.trim()) {
                alert("First name is required.");
                isValid = false;
            }

            if (!lastName?.value.trim()) {
                alert("Last name is required.");
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailPattern.test(email.value.trim())) {
                alert("Please enter a valid email address.");
                isValid = false;
            }

            if (phone && !phone.value.trim()) {
                alert("Phone number is required.");
                isValid = false;
            }

            const titlePattern = /^[a-zA-Z\s-]{7,}$/;
            if (orgTitle && !titlePattern.test(orgTitle.value.trim())) {
                alert("Organizational title must be at least 7 characters long and contain only letters, hyphens, and spaces.");
                isValid = false;
            }

            if (businessName && !businessName.value.trim()) {
                alert("Business/Organization name is required.");
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            }
        });
    }

    // THANK YOU PAGE DATA DISPLAY
    if (window.location.pathname.includes("thankyou.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Safely display form data
        const displayField = (id, param) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = urlParams.get(param) || "N/A";
            }
        };

        displayField("displayFirstName", "first-name");
        displayField("displayLastName", "last-name");
        displayField("displayEmail", "email");
        displayField("displayPhone", "phone");
        displayField("displayBusinessName", "business-name");
        displayField("displayMembershipLevel", "membership");
        displayField("displayBusinessDescription", "description");
    }

    // Initialize all dialogs as hidden
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.hidden = true;
    });

    // Close modal when clicking outside
    document.querySelectorAll("dialog").forEach(dialog => {
        dialog.addEventListener("click", function(e) {
            if (e.target === dialog) {
                closeModal(dialog.id);
            }
        });
    });
});