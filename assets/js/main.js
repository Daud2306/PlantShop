document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = nav.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

            // Update icon
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (nav.classList.contains('active') &&
                !nav.contains(e.target) &&
                !navToggle.contains(e.target)) {
                nav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when clicking a link (for single page navigation)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 2. Product Filtering
    const tabs = document.querySelectorAll('.tab');
    const productCards = document.querySelectorAll('.product-card');

    function applyFilter(filterKey) {
        productCards.forEach(card => {
            const categories = card.getAttribute('data-cat') || '';
            if (filterKey === 'all' || categories.includes(filterKey)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Apply initial filter based on active tab
    const activeTab = document.querySelector('.tab.active');
    if (activeTab && productCards.length > 0) {
        const initialFilter = activeTab.getAttribute('data-filter');
        applyFilter(initialFilter);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Apply filter
            const filterKey = this.getAttribute('data-filter');
            applyFilter(filterKey);
        });
    });

    // 3. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 4. Header Scroll Effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 5. Close mobile menu on window resize (to desktop)
window.addEventListener('resize', function () {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');

    if (window.innerWidth >= 768 && nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            const icon = navToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    }
});

// 6. Initialize animations on scroll (optional - for future use)
window.addEventListener('load', function () {
    // You can add scroll animations here if needed
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements you want to animate
    document.querySelectorAll('.product-card, .icon-card, .card').forEach(el => {
        observer.observe(el);
    });
});