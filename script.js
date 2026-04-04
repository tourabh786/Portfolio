document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const preloader = document.getElementById('preloader');
    const yearEl = document.getElementById('year');

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPowerDevice =
        prefersReducedMotion ||
        (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4) ||
        (typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4);

    if (lowPowerDevice) {
        body.classList.add('low-power');
    }

    const hidePreloader = () => {
        if (!preloader) {
            return;
        }
        preloader.classList.add('preloader-hidden');
        body.classList.add('page-loaded');
        window.setTimeout(() => {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 650);
    };

    if (document.readyState === 'complete') {
        window.setTimeout(hidePreloader, 280);
    } else {
        window.addEventListener(
            'load',
            () => {
                window.setTimeout(hidePreloader, 280);
            },
            { once: true }
        );
    }

    window.setTimeout(hidePreloader, 2600);

    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.querySelector('.hamburger');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const updateNavbarState = () => {
        if (!navbar) {
            return;
        }

        if (window.scrollY > 14) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    updateNavbarState();
    window.addEventListener('scroll', updateNavbarState);

    const closeMenu = () => {
        if (!navLinks || !hamburger) {
            return;
        }

        navLinks.classList.remove('nav-active');
        hamburger.setAttribute('aria-expanded', 'false');

        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('nav-active');
            hamburger.setAttribute('aria-expanded', String(isOpen));

            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-times', isOpen);
            }
        });

        navAnchors.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    }

    const path = window.location.pathname.split('/').pop();
    const currentPage = path && path.length > 0 ? path : 'index.html';

    navAnchors.forEach((item) => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });

    const revealEls = document.querySelectorAll('.fade-up, .fade-in, .reveal');
    if (lowPowerDevice || typeof IntersectionObserver === 'undefined') {
        revealEls.forEach((el) => el.classList.add('active'));
    } else {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        revealEls.forEach((el) => observer.observe(el));
    }

    const typeTarget = document.querySelector('.type-text');
    if (typeTarget && !lowPowerDevice) {
        const text = typeTarget.textContent.trim();
        typeTarget.textContent = '';

        let index = 0;
        const typeStep = () => {
            if (index >= text.length) {
                return;
            }

            typeTarget.textContent += text.charAt(index);
            index += 1;
            window.setTimeout(typeStep, 70);
        };

        window.setTimeout(typeStep, 680);
    }

    const canUseCustomCursor =
        !lowPowerDevice &&
        window.matchMedia('(pointer: fine)').matches &&
        window.innerWidth > 1024;

    if (canUseCustomCursor) {
        const cursorDot = document.getElementById('cursor-dot');
        const cursorRing = document.getElementById('cursor-ring');

        if (cursorDot && cursorRing) {
            body.classList.add('cursor-ready');

            let mouseX = window.innerWidth * 0.5;
            let mouseY = window.innerHeight * 0.5;
            let dotX = mouseX;
            let dotY = mouseY;
            let ringX = mouseX;
            let ringY = mouseY;

            const renderCursor = () => {
                dotX += (mouseX - dotX) * 0.35;
                dotY += (mouseY - dotY) * 0.35;
                ringX += (mouseX - ringX) * 0.14;
                ringY += (mouseY - ringY) * 0.14;

                cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
                cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

                window.requestAnimationFrame(renderCursor);
            };

            window.addEventListener('mousemove', (event) => {
                mouseX = event.clientX;
                mouseY = event.clientY;
            });

            window.addEventListener('mouseleave', () => {
                body.classList.remove('cursor-ready');
            });

            window.addEventListener('mouseenter', () => {
                body.classList.add('cursor-ready');
            });

            const interactiveElements = document.querySelectorAll(
                'a, button, input, textarea, select, .btn, .text-link, .hamburger'
            );

            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
            });

            window.requestAnimationFrame(renderCursor);
        }
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !message) {
                return;
            }

            const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
            const whatsappUrl = `https://wa.me/917047636934?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank', 'noopener');
        });
    }
});
