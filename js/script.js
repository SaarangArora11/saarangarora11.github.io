// DOM Elements
const navbar = document.querySelector('.navbar');
const fadeElements = document.querySelectorAll('.fade-in');
const substackContainer = document.getElementById('substack-feed');

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

// Substack Fetch Logic
const SUBSTACK_URL = "https://saarangarora.substack.com";
const RSS_API = `https://api.rss2json.com/v1/api.json?rss_url=${SUBSTACK_URL}/feed`;

async function fetchSubstack() {
    if (!substackContainer) return;
    
    substackContainer.innerHTML = '<p class="text-secondary">Loading latest posts...</p>';
    
    try {
        const response = await fetch(RSS_API);
        const data = await response.json();

        if (data.status === "ok") {
            substackContainer.innerHTML = ""; 
            // Display top 3 posts
            data.items.slice(0, 3).forEach((item, index) => {
                const date = new Date(item.pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                // Strip HTML tags for preview text if needed, but we'll just use title
                
                const html = `
                    <div class="blog-card fade-in" style="transition-delay: ${index * 100}ms">
                        <span class="blog-date">${date}</span>
                        <h3>${item.title}</h3>
                        <a href="${item.link}" target="_blank" class="read-more">Read Article &rarr;</a>
                    </div>
                `;
                substackContainer.innerHTML += html;
            });
            
            // Re-observe new fade-in elements
             document.querySelectorAll('#substack-feed .fade-in').forEach(el => {
                 setTimeout(() => el.classList.add('visible'), 100);
             });
             
        } else {
            throw new Error("Status not ok");
        }
    } catch (error) {
        console.error("Error fetching Substack:", error);
        substackContainer.innerHTML = `
            <div class="error-msg">
                <p>Unable to load posts.</p>
                <a href="${SUBSTACK_URL}" target="_blank" class="project-link">Visit my Substack &rarr;</a>
            </div>
        `;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchSubstack();
});
