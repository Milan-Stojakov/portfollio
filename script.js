const T_EN = [
  { name: "Michael Turner",  text: "Great experience working together! Professional, fast, and delivered exactly what I needed." },
  { name: "Daniel Foster",   text: "The website looks amazing and works perfectly. Communication was smooth and everything was delivered on time." },
  { name: "Ryan Mitchell",   text: "Very satisfied with the final result. Clean design and excellent performance." },
  { name: "Alex Carter",     text: "Highly recommended! Quick responses, great ideas, and professional work." },
  { name: "Emily Roberts",   text: "Reliable and talented developer. I would definitely work with him again." },
  { name: "Sophia Bennett",  text: "From idea to final website — everything went smoothly. Excellent job!" },
];
 
const T_SR = [
  { name: "Michael Turner",  text: "Odlično iskustvo u saradnji! Profesionalan, brz i isporučio je tačno ono što sam trebao." },
  { name: "Daniel Foster",   text: "Sajt izgleda odlično i radi savršeno. Komunikacija je bila glatka i sve je isporučeno na vreme." },
  { name: "Ryan Mitchell",   text: "Veoma zadovoljan konačnim rezultatom. Čist dizajn i odlične performanse." },
  { name: "Alex Carter",     text: "Topla preporuka! Brzi odgovori, sjajne ideje i profesionalan rad." },
  { name: "Emily Roberts",   text: "Pouzdan i talentovan developer. Definitivno bih ponovo sarađivao sa njim." },
  { name: "Sophia Bennett",  text: "Od ideje do finalnog sajta — sve je prošlo glatko. Odličan posao!" },
];
 
function buildCards(data) {
  const track = document.getElementById('sliderTrack');
  if (!track) return;
  const all = [...data, ...data]; // duplicate for infinite loop
  track.innerHTML = all.map(d => `
    <div class="card" role="article">
      <div class="card-name">${d.name}</div>
      <span class="quote-mark" aria-hidden="true">\u201C</span>
      <p class="card-text">${d.text}</p>
    </div>
  `).join('');
}
 
/* ---- LANGUAGE SYSTEM ---- */
let lang = 'en';
 
function applyLang() {
  // Update HTML lang attribute for SEO/accessibility
  document.documentElement.lang = lang;
 
  // Update meta tags
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content',
      lang === 'en'
        ? "Explore Milan Stojakov's web developer portfolio. Modern, responsive websites built with HTML, CSS, JavaScript & PHP. Available for freelance projects."
        : "Pogledajte portfolio web developera Milana Stojanova. Moderni, responzivni sajtovi – HTML, CSS, JavaScript, PHP. Dostupan za freelance projekte."
    );
  }
  const titleEl = document.getElementById('pageTitle');
  if (titleEl) {
    titleEl.textContent = lang === 'en'
      ? 'Milan Stojakov \u2013 Web Developer Portfolio | Serbia'
      : 'Milan Stojakov \u2013 Portfolio Web Developera | Srbija';
  }
 
  // Update all [data-en] / [data-sr] elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val != null) el.innerHTML = val;
  });
 
  // Update placeholders
  document.querySelectorAll('[data-ph-en]').forEach(el => {
    const ph = el.getAttribute('data-ph-' + lang);
    if (ph) el.placeholder = ph;
  });
 
  // Rebuild testimonials in correct language
  buildCards(lang === 'en' ? T_EN : T_SR);
}
 
document.addEventListener('DOMContentLoaded', () => {
 
  // Initial card build
  buildCards(T_EN);
 
  // ---- LANGUAGE TOGGLE ----
  const langBtn   = document.getElementById('langBtn');
  const flagIcon  = document.getElementById('flagIcon');
  const langLabel = document.getElementById('langLabel');
 
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      lang = lang === 'en' ? 'sr' : 'en';
 
      // Swap flag image
      if (lang === 'sr') {
        flagIcon.src = 'sr-zastava.png';
        flagIcon.alt = 'Zastava Srbije';
      } else {
        flagIcon.src = 'uk-zastava.png';
        flagIcon.alt = 'English language flag';
      }
      langLabel.textContent = lang.toUpperCase();
      applyLang();
    });
  }
 
  // ---- SMOOTH SCROLL for all nav links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        document.querySelector('nav').classList.remove('open');
        const burger = document.getElementById('burgerBtn');
        if (burger) { burger.setAttribute('aria-expanded', 'false'); }
      }
    });
  });
 
  // ---- BURGER MENU ----
  const burgerBtn = document.getElementById('burgerBtn');
  const navEl     = document.querySelector('nav');
  if (burgerBtn && navEl) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = navEl.classList.toggle('open');
      burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
 
  // ---- PROJECT SLIDER ----
  let currentSlide = 0;
  const totalSlides = 4;
  let autoTimer;
 
  function goToSlide(n) {
    const slides = document.querySelectorAll('.proj-slide');
    const dots   = document.querySelectorAll('.proj-dot');
    if (!slides.length) return;
 
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    dots[currentSlide].setAttribute('aria-selected', 'false');
 
    currentSlide = ((n % totalSlides) + totalSlides) % totalSlides;
 
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    dots[currentSlide].setAttribute('aria-selected', 'true');

    // Sync the Visit Site button to the now-active slide's URL
    const visitBtn = document.getElementById('visit-site-btn');
    if (visitBtn) {
      const url = slides[currentSlide].getAttribute('data-url');
      if (url) visitBtn.href = url;
    }
  }
 
  function changeSlide(dir) {
    clearInterval(autoTimer);
    goToSlide(currentSlide + dir);
    startAuto();
  }
 
  function startAuto() {
    autoTimer = setInterval(() => goToSlide(currentSlide + 1), 4500);
  }
 
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));

  // Set initial Visit Site href to match the initially active slide
  const initialVisitBtn = document.getElementById('visit-site-btn');
  const initialSlide = document.querySelector('.proj-slide.active');
  if (initialVisitBtn && initialSlide) {
    const initialUrl = initialSlide.getAttribute('data-url');
    if (initialUrl) initialVisitBtn.href = initialUrl;
  }
 
  document.querySelectorAll('.proj-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(autoTimer);
      goToSlide(i);
      startAuto();
    });
  });
 
  startAuto();
 
  // Pause auto on hover
  const projSlider = document.querySelector('.proj-slider');
  if (projSlider) {
    projSlider.addEventListener('mouseenter', () => clearInterval(autoTimer));
    projSlider.addEventListener('mouseleave', () => startAuto());
  }
 
  const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    const origText = btn.textContent;

    // Prikazi loading stanje
    btn.textContent = lang === 'en' ? 'Sending...' : 'Šaljem...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Uspeh
        btn.textContent = lang === 'en' ? 'Sent! ✓' : 'Poslato! ✓';
        btn.style.background  = '#1a7a3c';
        btn.style.borderColor = '#1a7a3c';
        btn.style.opacity     = '1';
        form.reset();
        setTimeout(() => {
          btn.textContent       = origText;
          btn.style.background  = '';
          btn.style.borderColor = '';
          btn.disabled          = false;
        }, 4000);
      } else {
        // Greška sa servera
        throw new Error('Server error');
      }

    } catch (err) {
      btn.textContent       = lang === 'en' ? 'Error. Try again!' : 'Greška. Pokušaj ponovo!';
      btn.style.background  = '#c0392b';
      btn.style.borderColor = '#c0392b';
      btn.style.opacity     = '1';
      setTimeout(() => {
        btn.textContent       = origText;
        btn.style.background  = '';
        btn.style.borderColor = '';
        btn.disabled          = false;
      }, 4000);
    }
  });
}
 
  // ---- SCROLL REVEAL (lightweight, no library) ----
  const revealEls = document.querySelectorAll(
    '.service-card, .hero-bio, .contact-steps, .proj-slider'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
 
  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    observer.observe(el);
  });
 
});
