// ============================================
// PADS FOR PEERS — JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Sidebar Toggle ----
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  // Close sidebar when a link is clicked (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });

  // ---- Stat Counter Animation ----
  const statNumbers = document.querySelectorAll('.stat-number');
  const animatedStats = new Set();

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);

      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats.has(entry.target)) {
        animatedStats.add(entry.target);
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => statObserver.observe(num));

  // ---- Fade-in on Scroll ----
  const fadeTargets = document.querySelectorAll(
    '.blurb-card, .mission-banner, .action-btn, .stat-card, .program-card, ' +
    '.team-card, .about-block, .contact-card, .resources-list, .why-us-content, ' +
    '.blog-content, .poverty-content, .contact-extra'
  );

  fadeTargets.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeTargets.forEach(el => fadeObserver.observe(el));

  // ---- Photo Slideshow ----
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
      resetAutoSlide();
    });
  });

  if (slides.length > 0) {
    startAutoSlide();
  }

  // ---- Cycling Word ----
  const cyclingWord = document.getElementById('cycling-word');
  if (cyclingWord) {
    const words = ['education', 'health', 'self-confidence'];
    let wordIndex = 0;

    setInterval(() => {
      cyclingWord.classList.add('fade');
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        cyclingWord.textContent = words[wordIndex];
        cyclingWord.classList.remove('fade');
      }, 400);
    }, 2000);
  }

});
