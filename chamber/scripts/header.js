const header = document.getElementById('header');

// Function to handle scroll event
function handleScroll() {
    if (window.scrollY > 0) {
        // Add the 'sticky' class when scrolled
        header.classList.add('sticky');
    } else {
        // Remove the 'sticky' class when at the top
        header.classList.remove('sticky');
    }
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);