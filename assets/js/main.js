// ============================================
// Sukanya Massage — Main Scripts
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Mobile Menu ----------
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    menuOverlay.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

  menuLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // ---------- Navbar Scroll Effect ----------
  const nav = document.querySelector('nav');
  let lastScrollY = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;

    if (scrollY < 60) {
      nav.classList.add('nav-transparent');
    } else {
      nav.classList.remove('nav-transparent');
    }

    lastScrollY = scrollY;
  }

  // Set initial state
  if (window.scrollY < 60) {
    nav.classList.add('nav-transparent');
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---------- Scroll Reveal Animations ----------
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after reveal
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  // ---------- Service Category Tabs ----------
  const tabs = document.querySelectorAll('.category-tab');
  const categories = {
    classic: document.getElementById('services-classic'),
    wellness: document.getElementById('services-wellness'),
    packages: document.getElementById('services-packages')
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // Update active tab
      tabs.forEach(function (t) { t.classList.remove('active', 'text-[#D4AF37]', 'border-[#D4AF37]'); });
      tab.classList.add('active', 'text-[#D4AF37]', 'border-[#D4AF37]');

      // Show relevant category
      var target = tab.getAttribute('data-category');
      Object.keys(categories).forEach(function (key) {
        if (categories[key]) {
          if (key === target) {
            categories[key].classList.remove('hidden');
            // Re-trigger reveal animation
            categories[key].querySelectorAll('.reveal').forEach(function (el) {
              el.classList.remove('visible');
              // Force reflow then re-add
              void el.offsetWidth;
              el.classList.add('visible');
            });
          } else {
            categories[key].classList.add('hidden');
          }
        }
      });
    });
  });

  // ---------- Counter Animation (for stats) ----------
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quad
      var eased = progress * (2 - progress);
      el.textContent = Math.floor(eased * target) + (el.getAttribute('data-suffix') || '');
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + (el.getAttribute('data-suffix') || '');
      }
    }

    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(function (el) {
    counterObserver.observe(el);
  });
});
