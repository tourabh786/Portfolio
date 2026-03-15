// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    
    if(hamburger) {
        const hamburgerIcon = hamburger.querySelector('i');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            
            // Toggle Icon
            if (navLinks.classList.contains('nav-active')) {
                hamburgerIcon.classList.remove('fa-bars');
                hamburgerIcon.classList.add('fa-times');
            } else {
                hamburgerIcon.classList.remove('fa-times');
                hamburgerIcon.classList.add('fa-bars');
            }
        });

        // Close mobile menu on link click
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                if(hamburgerIcon) {
                    hamburgerIcon.classList.remove('fa-times');
                    hamburgerIcon.classList.add('fa-bars');
                }
            });
        });
    }

    // 4. Scroll Reveal Animation via Intersection Observer (still useful if content is long)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Trigger Hero/Page Animations on load
    setTimeout(() => {
        document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // 6. Active nav link based on current page URL
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll(".nav-links a");
    
    // If we are at the root path, default to index.html
    const isRoot = currentLocation.endsWith('/') || currentLocation.endsWith('Portfolio\\') || currentLocation === '';

    navItems.forEach((item) => {
        item.classList.remove("active");
        const href = item.getAttribute("href");
        
        if (isRoot && href === 'index.html') {
             item.classList.add("active");
        } else if (currentLocation.includes(href)) {
             item.classList.add("active");
        }
    });
});