/* ============================================================
   OQTEX — Main JavaScript
   Neural canvas, particles, scroll animations, interactions
   ============================================================ */

'use strict';

/* ── UTILS ──────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/* ── NAVBAR ─────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobileMenu');
  const mobileLinks = $$('.mobile-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = navLinks.find(l => l.getAttribute('href') === `#${e.target.id}`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

/* ── NEURAL NETWORK CANVAS (HERO) ───────────────────────────── */
function initNeuralCanvas() {
  const canvas = $('#neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, nodes = [], animId;
  const NODE_COUNT = 70;
  const MAX_DIST = 160;
  const COPPER = [201, 127, 82];
  const RED    = [111,  29, 27];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.25, 0.25), vy: rand(-0.25, 0.25),
      r: rand(1.5, 3.5),
      pulse: rand(0, Math.PI * 2),
      color: Math.random() > 0.5 ? COPPER : RED,
    }));
  }

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);

    // Update positions
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      n.pulse += 0.02;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.3;
          const c = nodes[i].color;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const pulse = 0.6 + Math.sin(n.pulse) * 0.4;
      const c = n.color;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.5 + Math.sin(n.pulse) * 0.3})`;
      ctx.fill();

      // Glow
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
      grad.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},0.15)`);
      grad.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    animId = requestAnimationFrame(drawFrame);
  }

  const ro = new ResizeObserver(() => { resize(); });
  ro.observe(canvas);
  resize();
  createNodes();
  drawFrame();
}

/* ── OQMEGA CANVAS (PARTICLE NETWORK) ──────────────────────── */
function initOqmegaCanvas() {
  const canvas = $('#oqmegaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const COUNT = 50;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function init() {
    particles = Array.from({ length: COUNT }, () => ({
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.15, 0.15), vy: rand(-0.15, 0.15),
      r: rand(1, 2.5),
      alpha: rand(0.2, 0.7),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(201,127,82,${(1 - dist / 120) * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,127,82,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  new ResizeObserver(() => resize()).observe(canvas);
  resize();
  init();
  draw();
}

/* ── VISION CANVAS (ABSTRACT RETINA) ───────────────────────── */
function initVisionCanvas() {
  const canvas = $('#visionCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function draw() {
    t += 0.005;
    ctx.clearRect(0, 0, W, H);

    // Concentric retina rings
    const cx = W / 2, cy = H / 2;
    for (let i = 0; i < 8; i++) {
      const r = 80 + i * 90 + Math.sin(t + i * 0.5) * 10;
      const alpha = (0.08 - i * 0.008);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,127,82,${Math.max(0, alpha)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Radial lines (vessels)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + t * 0.3;
      const len = 200 + Math.sin(t * 2 + i) * 40;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * 80, cy + Math.sin(angle) * 80);
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
      ctx.strokeStyle = `rgba(111,29,27,0.1)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Center glow pulse
    const pulse = 0.15 + Math.sin(t * 2) * 0.05;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
    grad.addColorStop(0,   `rgba(201,127,82,${pulse})`);
    grad.addColorStop(0.5, `rgba(111,29,27,${pulse * 0.5})`);
    grad.addColorStop(1,   'rgba(5,5,5,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 200, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    requestAnimationFrame(draw);
  }

  new ResizeObserver(() => resize()).observe(canvas);
  resize();
  draw();
}

/* ── FLOATING PARTICLES (HERO) ──────────────────────────────── */
function initHeroParticles() {
  const container = $('#heroParticles');
  if (!container) return;
  const count = 30;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${rand(2, 5)}px;
      height: ${rand(2, 5)}px;
      border-radius: 50%;
      background: rgba(${Math.random() > 0.5 ? '201,127,82' : '111,29,27'},${rand(0.2, 0.6)});
      left: ${rand(0, 100)}%;
      top: ${rand(0, 100)}%;
      animation: particle-float ${rand(8, 18)}s linear infinite;
      animation-delay: ${rand(-10, 0)}s;
    `;
    container.appendChild(p);
  }

  // Inject particle float keyframes
  if (!$('#particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes particle-float {
        0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 0.6; }
        100% { transform: translateY(-100vh) translateX(${rand(-50, 50)}px) scale(0.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
function initScrollReveal() {
  const targets = $$('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(t => observer.observe(t));
}

/* ── COUNTER ANIMATION ──────────────────────────────────────── */
function initCounters() {
  const counters = $$('.counter, .stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (!target) return;
        animateCounter(el, 0, target, 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => {
    if (c.dataset.target) observer.observe(c);
  });
}

function animateCounter(el, from, to, duration) {
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.round(lerp(from, to, eased));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── OQMEGA RESEARCH BARS ───────────────────────────────────── */
function initResearchBars() {
  const bars = $$('.rs-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(b => {
          const target = b.style.width;
          b.style.width = '0';
          setTimeout(() => { b.style.width = target; }, 200);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const panel = $('.oqmega-stats-panel');
  if (panel) observer.observe(panel);
}

/* ── CONTACT FORM ───────────────────────────────────────────── */
function initContactForm() {
  const form = $('#contactForm');
  const success = $('#formSuccess');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
    btn.disabled = true;

    // Simulate sending (replace with actual API call)
    await new Promise(r => setTimeout(r, 1500));

    // Show success
    btn.innerHTML = originalHTML;
    btn.disabled = false;
    form.reset();
    success.style.display = 'flex';
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  });
}

/* ── SMOOTH SCROLL ──────────────────────────────────────────── */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = $(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── GLASSMORPHISM CARD TILT ─────────────────────────────────── */
function initCardTilt() {
  const cards = $$('.product-card, .pillar-card, .why-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `
        perspective(800px)
        rotateY(${x * 6}deg)
        rotateX(${-y * 6}deg)
        translateY(-4px)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}

/* ── PARALLAX HERO ──────────────────────────────────────────── */
function initParallax() {
  const hero = $('#hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled > window.innerHeight) return;

    const heroContent = hero.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
      heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
    }

    const rings = $$('.retina-ring');
    rings.forEach((ring, i) => {
      ring.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0002 * (i + 1)})`;
    });
  }, { passive: true });
}

/* ── PRODUCT CARD FEATURE HOVER ─────────────────────────────── */
function initProductFeatures() {
  $$('.feat-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.color = '#E0A37A';
      const icon = item.querySelector('i');
      if (icon) icon.style.transform = 'scale(1.3)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.color = '';
      const icon = item.querySelector('i');
      if (icon) icon.style.transform = '';
    });
  });
}

/* ── TYPING CODE EFFECT ─────────────────────────────────────── */
function initCodeEffect() {
  const codeBody = $('#codeBody');
  if (!codeBody) return;

  const lines = codeBody.querySelectorAll('.code-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-10px)';
    line.style.transition = `opacity 0.3s ease ${i * 0.06}s, transform 0.3s ease ${i * 0.06}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      lines.forEach(line => {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(codeBody);
}

/* ── SECTION AMBIENT GLOW ON SCROLL ────────────────────────── */
function initAmbientGlow() {
  const sections = $$('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty('--section-active', '1');
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(s => observer.observe(s));
}

/* ── LOGO ICON FAVICON ──────────────────────────────────────── */
function initFavicon() {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = 'images/oqtex-icon.png';
  document.getElementsByTagName('head')[0].appendChild(link);
}

/* ── HERO STAT NUMBERS (HERO SECTION) ──────────────────────── */
function initHeroStats() {
  const heroStats = $$('.hero-stat .stat-num[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, 0, target, 2000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  heroStats.forEach(s => observer.observe(s));
}

/* ── OQMEGA SPINNING RINGS ACCELERATION ────────────────────── */
function initOqmegaRings() {
  const rings = $$('.oqmega-ring');
  const emblem = $('.oqmega-emblem');
  if (!emblem) return;

  emblem.addEventListener('mouseenter', () => {
    rings.forEach((ring, i) => {
      ring.style.animationDuration = `${[1.5, 2.5, 3.5][i]}s`;
    });
  });

  emblem.addEventListener('mouseleave', () => {
    rings.forEach((ring, i) => {
      ring.style.animationDuration = `${[6, 9, 12][i]}s`;
    });
  });
}

/* ── NAV LINK ACTIVE STYLE ──────────────────────────────────── */
function addNavActiveStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--copper-light) !important;
      background: rgba(201,127,82,0.1) !important;
    }
    .feat-item {
      transition: color 0.25s ease;
    }
    .feat-item i {
      transition: transform 0.25s ease;
    }
  `;
  document.head.appendChild(style);
}

/* ── MOBILE TOUCH PARALLAX FALLBACK ────────────────────────── */
function initMobileOptimize() {
  if (window.matchMedia('(max-width: 768px)').matches) {
    // Disable heavy canvas on low-power devices
    const heroCanvas = $('#neuralCanvas');
    if (heroCanvas && navigator.hardwareConcurrency < 4) {
      heroCanvas.style.display = 'none';
    }
  }
}

/* ── PRELOADER ──────────────────────────────────────────────── */
function initPreloader() {
  const preloader = document.createElement('div');
  preloader.id = 'preloader';
  preloader.innerHTML = `
    <div class="pre-inner">
      <img src="images/oqtex-icon.png" alt="OQTEX" class="pre-logo" />
      <div class="pre-bar"><div class="pre-fill"></div></div>
      <span class="pre-text">Loading Intelligence...</span>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #preloader {
      position: fixed; inset: 0; z-index: 9999;
      background: #050505;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.6s ease, visibility 0.6s ease;
    }
    #preloader.fade-out { opacity: 0; visibility: hidden; }
    .pre-inner { display: flex; flex-direction: column; align-items: center; gap: 24px; }
    .pre-logo {
      width: 80px; height: 80px; object-fit: contain;
      animation: pre-pulse 1.5s ease-in-out infinite;
      filter: drop-shadow(0 0 20px rgba(201,127,82,0.5));
    }
    @keyframes pre-pulse {
      0%,100% { transform: scale(1); opacity: 0.8; }
      50%      { transform: scale(1.08); opacity: 1; }
    }
    .pre-bar {
      width: 200px; height: 3px;
      background: rgba(255,255,255,0.06);
      border-radius: 3px; overflow: hidden;
    }
    .pre-fill {
      height: 100%;
      background: linear-gradient(90deg, #6F1D1B, #C97F52, #E0A37A);
      border-radius: 3px;
      animation: pre-load 1.2s cubic-bezier(0.23,1,0.32,1) forwards;
    }
    @keyframes pre-load { from { width: 0; } to { width: 100%; } }
    .pre-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.75rem;
      color: rgba(201,127,82,0.7);
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
  `;

  document.head.appendChild(style);
  document.body.prepend(preloader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 700);
    }, 1400);
  });
}

/* ── CURSOR GLOW EFFECT (DESKTOP) ──────────────────────────── */
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.id = 'cursorGlow';
  const style = document.createElement('style');
  style.textContent = `
    #cursorGlow {
      position: fixed;
      width: 300px; height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(201,127,82,0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: left 0.12s ease, top 0.12s ease;
      will-change: left, top;
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  }, { passive: true });
}

/* ── PRODUCT CARD GLOW FOLLOW ───────────────────────────────── */
function initProductGlowFollow() {
  $$('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const glow = card.querySelector('.product-glow');
      if (glow) {
        glow.style.left   = `${x - 150}px`;
        glow.style.top    = `${y - 150}px`;
        glow.style.right  = 'auto';
      }
    });

    card.addEventListener('mouseleave', () => {
      const glow = card.querySelector('.product-glow');
      if (glow) {
        glow.style.left  = 'auto';
        glow.style.right = '-80px';
        glow.style.top   = '-80px';
      }
    });
  });
}

/* ── SECTION ENTRANCE CINEMATIC ─────────────────────────────── */
function initCinematicEntrance() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes section-enter {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .section-active-enter {
      animation: section-enter 0.8s cubic-bezier(0.23,1,0.32,1) forwards;
    }
  `;
  document.head.appendChild(style);
}

/* ── WHY CARDS STAGGER ──────────────────────────────────────── */
function initWhyCardStagger() {
  const whyCards = $$('.why-card');
  whyCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });
}

/* ── ABOUT STATS BAR HOVER ──────────────────────────────────── */
function initAboutStatsHover() {
  $$('.astat').forEach(stat => {
    stat.addEventListener('mouseenter', () => {
      const num = stat.querySelector('.astat-num');
      if (num) num.style.transform = 'scale(1.1)';
    });
    stat.addEventListener('mouseleave', () => {
      const num = stat.querySelector('.astat-num');
      if (num) num.style.transform = 'scale(1)';
    });
  });

  // Add transition style
  const style = document.createElement('style');
  style.textContent = `.astat-num { transition: transform 0.3s ease; display: inline-block; }`;
  document.head.appendChild(style);
}

/* ── VISION QUOTE TYPING ────────────────────────────────────── */
function initVisionQuote() {
  const quote = $('blockquote');
  if (!quote) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      quote.style.opacity = '0';
      quote.style.transform = 'translateY(20px)';
      quote.style.transition = 'opacity 1s ease 0.3s, transform 1s ease 0.3s';
      requestAnimationFrame(() => {
        quote.style.opacity = '1';
        quote.style.transform = 'translateY(0)';
      });
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  observer.observe(quote);
}

/* ── GLASS CARD BORDER ANIMATION ────────────────────────────── */
function initGlassBorderPulse() {
  const style = document.createElement('style');
  style.textContent = `
    .pillar-card:nth-child(1) { animation-delay: 0s; }
    .pillar-card:nth-child(2) { animation-delay: 0.3s; }
    .pillar-card:nth-child(3) { animation-delay: 0.6s; }
    .pillar-card:nth-child(4) { animation-delay: 0.9s; }

    @keyframes border-glow-pulse {
      0%,100% { border-color: rgba(201,127,82,0.18); }
      50%      { border-color: rgba(201,127,82,0.35); }
    }
    .oqmega-section .pillar-card {
      animation: border-glow-pulse 4s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}

/* ── INIT ALL ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initFavicon();
  addNavActiveStyle();
  initCinematicEntrance();
  initNavbar();
  initSmoothScroll();
  initHeroParticles();
  initNeuralCanvas();
  initOqmegaCanvas();
  initVisionCanvas();
  initScrollReveal();
  initCounters();
  initHeroStats();
  initResearchBars();
  initContactForm();
  initCardTilt();
  initParallax();
  initProductFeatures();
  initCodeEffect();
  initAmbientGlow();
  initMobileOptimize();
  initCursorGlow();
  initProductGlowFollow();
  initOqmegaRings();
  initWhyCardStagger();
  initAboutStatsHover();
  initVisionQuote();
  initGlassBorderPulse();
  initScrollProgress();
  initHeroEntrance();
  initColorTrails();
  initRetinaInteractive();
  initProductDeepGlow();
  initTrustBarHover();
  initFooterReveal();

  // Set initial nav state
  if (window.scrollY > 30) {
    $('#navbar')?.classList.add('scrolled');
  }

  console.log('%c OQTEX — Ophthalmology Meets Intelligence ', 
    'background: linear-gradient(135deg, #6F1D1B, #C97F52); color: white; padding: 8px 16px; border-radius: 4px; font-family: Space Grotesk; font-weight: 700;'
  );
});

/* ── HERO TYPED TEXT EFFECT ─────────────────────────────────── */
function initHeroTyped() {
  const sub = document.querySelector('.hero-sub');
  if (!sub) return;
  const text = sub.textContent.trim();
  sub.textContent = '';
  sub.style.opacity = '1';

  let i = 0;
  const speed = 22;
  function type() {
    if (i < text.length) {
      sub.textContent += text[i];
      i++;
      setTimeout(type, speed);
    }
  }
  // Start after hero entrance delay
  setTimeout(type, 1600);
}

/* ── HERO ENTRANCE SEQUENCE ─────────────────────────────────── */
function initHeroEntrance() {
  const heroElements = [
    { el: document.querySelector('.hero-badge'),  delay: 400 },
    { el: document.querySelector('.hero-title'),  delay: 700 },
    { el: document.querySelector('.hero-cta'),    delay: 1000 },
    { el: document.querySelector('.hero-stats'),  delay: 1300 },
    { el: document.querySelector('.panel-left'),  delay: 1500 },
    { el: document.querySelector('.panel-right'), delay: 1700 },
  ];

  heroElements.forEach(({ el, delay }) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.23,1,0.32,1), transform 0.8s cubic-bezier(0.23,1,0.32,1)';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
  });
}

/* ── SMOOTH HOVER COLOR TRAILS ───────────────────────────────── */
function initColorTrails() {
  const style = document.createElement('style');
  style.textContent = `
    .about-card { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, box-shadow 0.4s ease; }
    .about-card:hover { border-color: rgba(201,127,82,0.35) !important; }
    .pillar-card { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.4s ease, box-shadow 0.4s ease; }
    .why-card { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.4s ease, box-shadow 0.4s ease; }
    .team-card { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.4s ease, box-shadow 0.4s ease; }
    .vpillar { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.4s ease, background 0.4s ease; }
  `;
  document.head.appendChild(style);
}

/* ── RETINA SCAN RINGS INTERACTIVE ──────────────────────────── */
function initRetinaInteractive() {
  const hero = document.querySelector('.hero-section');
  const rings = document.querySelectorAll('.retina-ring');
  if (!hero || !rings.length) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const dx = (mx - cx) / cx * 8;
    const dy = (my - cy) / cy * 8;

    rings.forEach((ring, i) => {
      const factor = (i + 1) * 0.3;
      ring.style.transform = `translate(calc(-50% + ${dx * factor}px), calc(-50% + ${dy * factor}px))`;
      ring.style.transition = 'transform 0.3s ease';
    });
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    rings.forEach(ring => {
      ring.style.transform = 'translate(-50%, -50%)';
      ring.style.transition = 'transform 0.6s ease';
    });
  });
}

/* ── PRODUCT CARD DEEP GLOW ON HOVER ─────────────────────────── */
function initProductDeepGlow() {
  const style = document.createElement('style');
  style.textContent = `
    #oqfy-card { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.4s ease, box-shadow 0.4s ease; }
    #oqgen-card { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.4s ease, box-shadow 0.4s ease; }
    #oqfy-card:hover  { border-color: rgba(201,127,82,0.5) !important; box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(201,127,82,0.15) !important; }
    #oqgen-card:hover { border-color: rgba(163,58,58,0.5) !important; box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(111,29,27,0.2) !important; }
  `;
  document.head.appendChild(style);
}

/* ── TRUST BAR PAUSE ON HOVER ────────────────────────────────── */
function initTrustBarHover() {
  const inner = document.querySelector('.trust-bar-inner');
  if (!inner) return;
  inner.addEventListener('mouseenter', () => {
    inner.style.animationPlayState = 'paused';
  });
  inner.addEventListener('mouseleave', () => {
    inner.style.animationPlayState = 'running';
  });
}

/* ── FOOTER REVEAL ───────────────────────────────────────────── */
function initFooterReveal() {
  const footer = document.querySelector('.footer');
  if (!footer) return;
  footer.style.opacity = '0';
  footer.style.transform = 'translateY(20px)';
  footer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      footer.style.opacity = '1';
      footer.style.transform = 'translateY(0)';
      observer.disconnect();
    }
  }, { threshold: 0.1 });

  observer.observe(footer);
}

/* ── SCROLL PROGRESS BAR ────────────────────────────────────── */
function initScrollProgress() {
  const bar = $('#scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    bar.style.transform = `scaleX(${progress})`;
  }, { passive: true });
}

/* ── WINDOW EVENTS ──────────────────────────────────────────── */
window.addEventListener('resize', () => {
  // Canvases auto-resize via ResizeObserver
}, { passive: true });
