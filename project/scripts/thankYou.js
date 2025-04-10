document.addEventListener('DOMContentLoaded', function () {
    // Contact form logic
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            sessionStorage.setItem('formType', 'contact');
            const formData = new FormData(this);
            sessionStorage.setItem('formData', JSON.stringify(Object.fromEntries(formData)));
            this.submit();
        });
    }

    // Signup form logic
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            sessionStorage.setItem('formType', 'signup');
            const formData = new FormData(this);
            sessionStorage.setItem('formData', JSON.stringify(Object.fromEntries(formData)));
            this.submit();
        });
    }

    // Thank You Page logic
    const thankYouMessage = document.getElementById('thankYouMessage');
    const thankYouDetails = document.getElementById('thankYouDetails');

    if (thankYouMessage && thankYouDetails) {
        const formType = sessionStorage.getItem('formType');
        const formData = sessionStorage.getItem('formData');
        const parsedData = formData ? JSON.parse(formData) : null;

        if (formType === 'contact') {
            thankYouMessage.textContent = 'Thank You for Contacting Us!';
            thankYouDetails.innerHTML = `
                <h3>Your message has been received</h3>
                <p>Our team will review your inquiry and respond within 24-48 hours.</p>
                ${parsedData?.email ? `<p>We've sent a confirmation to ${parsedData.email}</p>` : ''}
                <p>For urgent matters, please call our support line at +234 912 3456.</p>
            `;
        } else if (formType === 'signup') {
            thankYouMessage.textContent = 'Thank You for Signing Up!';
            thankYouDetails.innerHTML = `
                <h3>Welcome to Abkon Space</h3>
                <p>We're excited to have you join our community!</p>
                ${parsedData?.email ? `<p>A confirmation email has been sent to ${parsedData.email}</p>` : '<p>A confirmation email with next steps has been sent.</p>'}
                ${parsedData?.membership ? `<p>Your selected membership: <strong>${parsedData.membership.replace('-', ' ')}</strong></p>` : ''}
                <p>Our membership team will contact you shortly to complete your onboarding.</p>
            `;
        }

        sessionStorage.removeItem('formType');
        sessionStorage.removeItem('formData');
    }
});
