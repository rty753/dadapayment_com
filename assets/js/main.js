/* ============================================
   Dada Payment — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // MOBILE NAVIGATION
  // ============================================
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  var body = document.body;

  function closeMobileNav() {
    if (mainNav) mainNav.classList.remove('active');
    body.classList.remove('nav-open');
    if (navToggle) {
      var spans = navToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  }

  function openMobileNav() {
    if (mainNav) mainNav.classList.add('active');
    body.classList.add('nav-open');
    if (navToggle) {
      var spans = navToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      }
    }
  }

  // Hamburger toggle
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      if (mainNav.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  // Mobile dropdown toggles — handle both <span class="nav-link"> and <a class="nav-link">
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function(dropdown) {
    var trigger = dropdown.querySelector('.nav-link');
    if (!trigger) trigger = dropdown.querySelector('a');
    if (trigger) {
      trigger.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          // Close other dropdowns
          dropdowns.forEach(function(other) {
            if (other !== dropdown) other.classList.remove('active');
          });
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // Close mobile nav when clicking a page link (not a dropdown trigger)
  if (mainNav) {
    mainNav.addEventListener('click', function(e) {
      var target = e.target;
      if (target.tagName === 'A' && !target.classList.contains('nav-link') && window.innerWidth <= 768) {
        // It's a real link, not a dropdown trigger
        closeMobileNav();
      }
    });
  }

  // Close mobile nav on outside click
  document.addEventListener('click', function(e) {
    if (mainNav && mainNav.classList.contains('active')) {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileNav();
      }
    }
  });

  // Close mobile nav on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMobileNav();
      dropdowns.forEach(function(d) { d.classList.remove('active'); });
    }
  });

  // ============================================
  // FAQ ACCORDION
  // ============================================
  var faqItems = document.querySelectorAll('.faq-item, .faq__item');
  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question, .faq__question');
    if (question) {
      question.addEventListener('click', function() {
        var isActive = item.classList.contains('active');
        faqItems.forEach(function(i) { i.classList.remove('active'); });
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(250, 247, 242, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
      } else {
        header.style.background = 'rgba(250, 247, 242, 0.95)';
        header.style.boxShadow = 'none';
      }
    });
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMobileNav();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  if ('IntersectionObserver' in window) {
    var observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    var animElements = document.querySelectorAll('.card, .market-card, .step, .feature-item, .feature-card, .stat-item, .blog-card, .faq-item, .faq__item, .benefit-card, .use-case-card, .step-card, .compliance-card, .pricing-card');
    animElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

});
