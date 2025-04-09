document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const nav = document.querySelector('header nav');
    const menuIcon = document.getElementById('menu-icon');

    if (!hamburgerMenu || !nav || !menuIcon) return;

    hamburgerMenu.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        hamburgerMenu.setAttribute('aria-expanded', isOpen);
        
        // Ternary operator to switch between icons
        menuIcon.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    // Close menu when clicking nav links
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            hamburgerMenu.setAttribute('aria-expanded', 'false');
            menuIcon.innerHTML = '&#9776;';
            
        });
    });
});

function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActivePage);