// DOM Elements
const navbar = document.querySelector('.navbar');
const fadeElements = document.querySelectorAll('.fade-in');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
});

// Intersection Observer for Query Handling
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // any init code
});
