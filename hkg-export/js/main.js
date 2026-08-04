// HKG EXPORT - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language
  applyLanguage(currentLang);

  // ===== Navbar Scroll Effect =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ===== Mobile Menu Toggle =====
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // ===== Scroll Animations =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up.animate').forEach(el => {
    observer.observe(el);
  });

  // ===== Tabs =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.querySelector(`.tab-content[data-content="${target}"]`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // ===== Search/Filter =====
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.country-card, .brand-card');
      
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // ===== Counter Animation =====
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 60;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + suffix;
        }, 16);
        
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => {
    counterObserver.observe(el);
  });
});
