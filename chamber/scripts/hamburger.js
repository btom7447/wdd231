document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const nav = document.querySelector('header nav');

    hamburgerMenu.addEventListener('click', function() {
        nav.classList.toggle('open');
    });
});