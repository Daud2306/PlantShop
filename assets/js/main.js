document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    if (btn && nav) {
        btn.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    const tabs = document.querySelectorAll('.tab');
    const items = document.querySelectorAll('.product-card');

    function applyFilter(key) {
        items.forEach(it => {
            const cats = it.getAttribute('data-cat') || '';
            if (key === 'all' || cats.includes(key)) {
                it.style.display = '';
            } else {
                it.style.display = 'none';
            }
        });
    }

    tabs.forEach(t => {
        t.addEventListener('click', () => {
            tabs.forEach(x => x.classList.remove('active'));
            t.classList.add('active');
            const key = t.getAttribute('data-filter');
            applyFilter(key);
        });
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');

    function updateNavbar() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    updateNavbar();
    window.addEventListener('scroll', updateNavbar);
});