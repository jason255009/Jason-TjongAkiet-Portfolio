(function () {
    'use strict';

    const BREAKPOINTS = {
        mobile: 768,
        tablet: 1024
    };

    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    let navOverlay = document.querySelector('.nav-overlay');

    if (!header || !navbar || !menuToggle) return;

    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        navOverlay.setAttribute('aria-hidden', 'true');
        document.body.appendChild(navOverlay);
    }

    function isMobileNav() {
        return window.innerWidth < BREAKPOINTS.mobile;
    }

    function openMenu() {
        document.body.classList.add('nav-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Menu sluiten');
        navOverlay.setAttribute('aria-hidden', 'false');
    }

    function closeMenu() {
        document.body.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Menu openen');
        navOverlay.setAttribute('aria-hidden', 'true');
    }

    function toggleMenu() {
        if (document.body.classList.contains('nav-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function updateDeviceClass() {
        const width = window.innerWidth;
        const html = document.documentElement;

        html.classList.remove('device-mobile', 'device-tablet', 'device-desktop');

        if (width < BREAKPOINTS.mobile) {
            html.classList.add('device-mobile');
        } else if (width < BREAKPOINTS.tablet) {
            html.classList.add('device-tablet');
        } else {
            html.classList.add('device-desktop');
        }
    }

    function handleResize() {
        updateDeviceClass();
        if (!isMobileNav()) {
            closeMenu();
        }
    }

    menuToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    navbar.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
            closeMenu();
        }
    });

    window.addEventListener('orientationchange', handleResize);

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 150);
    });

    updateDeviceClass();
})();
