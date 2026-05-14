// ============================================
// Sukanya Massage — Main Scripts
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // Mark document as JS-ready so CSS reveal transitions don't fire prematurely
  document.documentElement.classList.add('js-ready');

  // ---------- Smooth Scroll with Nav Offset ----------
  function initSmoothScroll() {
    const navHeight = 80; // matches nav height

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  initSmoothScroll();

  // ---------- Hero Entrance Sequence ----------
  function initHeroEntrance() {
    var heroItems = document.querySelectorAll('.hero-item');
    heroItems.forEach(function (el) {
      el.classList.add('animate');
    });
  }
  initHeroEntrance();

  // ---------- Parallax Effect (Hero & CTA) ----------
  function initParallax() {
    var heroImg = document.querySelector('#hero img');
    var ctaImg = document.querySelector('#booking img');
    var images = [];

    if (heroImg) images.push({ el: heroImg, rate: 0.3 });
    if (ctaImg) images.push({ el: ctaImg, rate: 0.2 });

    if (images.length === 0) return;

    function updateParallax() {
      var scrollY = window.scrollY;
      images.forEach(function (img) {
        img.el.style.transform = 'translateY(' + (scrollY * img.rate) + 'px) scale(1.05)';
      });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
  }
  initParallax();

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

  function handleNavScroll() {
    if (window.scrollY < 60) {
      nav.classList.remove('nav-scrolled');
      nav.classList.add('nav-transparent');
    } else {
      nav.classList.remove('nav-transparent');
      nav.classList.add('nav-scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---------- Scroll Reveal Animations ----------
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Add a small stagger based on each element's data-delay or index
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
  });

  // Observe ALL reveal elements
  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  // ---------- Icon Fallback / Enhance ----------
  function enhanceIcons() {
    // Add hover class to all iconify icons in the service-icon divs
    document.querySelectorAll('.service-icon iconify-icon').forEach(function (icon) {
      icon.classList.add('icon-hover');
    });
  }
  enhanceIcons();

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
