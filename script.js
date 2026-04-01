/* ==============================================
   StreetVision — JavaScript
   Animaciones, interacciones y canvas LED
   ============================================== */

/* ==========================================
   NAVBAR — scroll y menú móvil
   ========================================== */
const navbar   = document.getElementById('navbar');
const toggle   = document.getElementById('navToggle');
const navMenu  = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

// Sombra en scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Toggle menú móvil
toggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  toggle.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    toggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !toggle.contains(e.target)) {
    navMenu.classList.remove('open');
    toggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ==========================================
   CANVAS HERO — efecto partículas LED
   ========================================== */
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 80;

// Acento rojo
const COLORS = [
  'rgba(255,45,45,',   // rojo
  'rgba(255,255,255,', // blanco
  'rgba(255,100,100,', // rojo claro
];

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.size  = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.6 + 0.1;
    this.alphaSpeed = (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha += this.alphaSpeed;

    // Rebotar alfa
    if (this.alpha <= 0.05 || this.alpha >= 0.8) {
      this.alphaSpeed *= -1;
    }

    // Reencuadrar si sale del canvas
    if (this.x < 0 || this.x > canvas.width ||
        this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ')';
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar conexiones entre partículas cercanas
  particles.forEach((p, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 100) {
        const alpha = (1 - dist / 100) * 0.15;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255,45,45,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

// Inicializar canvas
resizeCanvas();
initParticles();
animateParticles();

const resizeObserver = new ResizeObserver(() => {
  resizeCanvas();
  initParticles();
});
resizeObserver.observe(canvas);

/* ==========================================
   SCROLL ANIMATIONS — IntersectionObserver
   ========================================== */
const animatedElements = document.querySelectorAll('[data-animate], .servicio-card, .galeria-item, .stat-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animar solo una vez
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

animatedElements.forEach(el => observer.observe(el));

/* ==========================================
   COUNTER ANIMATION — sección stats
   ========================================== */
const statNumbers = document.querySelectorAll('.stat-number[data-target]');

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800; // ms
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: easeOutExpo
    const eased    = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

/* ==========================================
   FORMULARIO DE CONTACTO — validación + mailto
   ========================================== */
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const formNotice = document.getElementById('formNotice');

function showNotice(message, type) {
  formNotice.textContent = message;
  formNotice.className   = `form-notice ${type}`;
  formNotice.style.display = 'block';
  formNotice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Auto-ocultar éxito después de 6 segundos
  if (type === 'success') {
    setTimeout(() => { formNotice.style.display = 'none'; }, 6000);
  }
}

function validateField(field) {
  const value = field.value.trim();
  if (field.required && !value) {
    field.classList.add('error');
    return false;
  }
  if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    field.classList.add('error');
    return false;
  }
  field.classList.remove('error');
  return true;
}

// Limpiar error al escribir
form.querySelectorAll('input, textarea, select').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('error'));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validar campos requeridos
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!validateField(field)) isValid = false;
  });

  if (!isValid) {
    showNotice('Por favor, completa todos los campos obligatorios.', 'error');
    return;
  }

  // Construir mailto (sin backend — Cloudflare Pages estático)
  const nombre   = document.getElementById('nombre').value.trim();
  const empresa  = document.getElementById('empresa').value.trim();
  const email    = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const servicio = document.getElementById('servicio').value;
  const mensaje  = document.getElementById('mensaje').value.trim();

  const subject = encodeURIComponent(`Cotización StreetVision — ${nombre}${empresa ? ' (' + empresa + ')' : ''}`);

  const body = encodeURIComponent(
    `Nombre: ${nombre}\n` +
    `Empresa: ${empresa || '—'}\n` +
    `Email: ${email}\n` +
    `Teléfono: ${telefono || '—'}\n` +
    `Plan de interés: ${servicio || '—'}\n\n` +
    `Mensaje:\n${mensaje}`
  );

  // Abrir cliente de correo
  window.location.href = `mailto:contacto@streetvision.cl?subject=${subject}&body=${body}`;

  // Feedback al usuario
  showNotice('¡Gracias! Se abrió tu cliente de correo con la cotización lista para enviar.', 'success');

  // Resetear formulario
  form.reset();
  submitBtn.disabled = false;
});

/* ==========================================
   FOOTER — año actual
   ========================================== */
document.getElementById('currentYear').textContent = new Date().getFullYear();

/* ==========================================
   ACTIVE NAV LINK — según sección visible
   ========================================== */
const sections   = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      allNavLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
