/* ==============================================
   The Street Vision — JavaScript
   ============================================== */

/* ==========================================
   NAVBAR — scroll y menú móvil
   ========================================== */
const navbar  = document.getElementById('navbar');
const toggle  = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

toggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  toggle.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    toggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});

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
   CANVAS HERO — partículas LED estilo video
   ========================================== */
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 90;

const COLORS = [
  { r: 255, g: 140, b: 42 },   // naranjo principal
  { r: 166, g: 240, b: 208 },  // menta
  { r: 180, g: 117, b: 214 },  // lila
  { r: 255, g: 255, b: 255 },  // blanco
];

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

class Particle {
  constructor() { this.reset(true); }
  reset(initial = false) {
    this.x = Math.random() * canvas.offsetWidth;
    this.y = Math.random() * canvas.offsetHeight;
    this.size = Math.random() * 2 + 0.6;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = initial ? Math.random() * 0.5 + 0.15 : 0.1;
    this.alphaSpeed = (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1);
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha += this.alphaSpeed;
    if (this.alpha <= 0.05 || this.alpha >= 0.7) this.alphaSpeed *= -1;
    if (this.x < -10 || this.x > canvas.offsetWidth + 10 ||
        this.y < -10 || this.y > canvas.offsetHeight + 10) {
      this.reset();
    }
  }
  draw() {
    const c = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${this.alpha})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 110) {
        const alpha = (1 - dist / 110) * 0.18;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255, 140, 42, ${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
    p.update();
    p.draw();
  }
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();

const resizeObserver = new ResizeObserver(() => {
  resizeCanvas();
  initParticles();
});
resizeObserver.observe(canvas);

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */
const animatedElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
animatedElements.forEach(el => observer.observe(el));

/* ==========================================
   COUNTER ANIMATION
   ========================================== */
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
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
   FORMULARIO — envío vía Web3Forms
   ========================================== */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formNotice = document.getElementById('formNotice');

function showNotice(message, type) {
  formNotice.textContent = message;
  formNotice.className = `form-notice ${type}`;
  formNotice.style.display = 'block';
  if (type === 'success') {
    setTimeout(() => { formNotice.style.display = 'none'; }, 8000);
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

form.querySelectorAll('input, textarea, select').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('error'));
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  requiredFields.forEach(field => {
    if (!validateField(field)) isValid = false;
  });
  if (!isValid) {
    showNotice('Por favor, completa todos los campos obligatorios.', 'error');
    return;
  }

  const accessKey = form.querySelector('input[name="access_key"]').value;

  // Si el access key no está configurado todavía, fallback a mailto
  if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    const nombre   = document.getElementById('nombre').value.trim();
    const empresa  = document.getElementById('empresa').value.trim();
    const email    = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const servicio = document.getElementById('servicio').value;
    const mensaje  = document.getElementById('mensaje').value.trim();

    const subject = encodeURIComponent(`Cotización Street Vision — ${nombre}${empresa ? ' (' + empresa + ')' : ''}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\n` +
      `Empresa: ${empresa || '—'}\n` +
      `Email: ${email}\n` +
      `Teléfono: ${telefono || '—'}\n` +
      `Plan de interés: ${servicio || '—'}\n\n` +
      `Mensaje:\n${mensaje}`
    );
    window.location.href = `mailto:contacto@streetvision.cl?subject=${subject}&body=${body}`;
    showNotice('Se abrió tu cliente de correo con la cotización lista. Si prefieres WhatsApp, usa el botón flotante.', 'success');
    return;
  }

  // Envío real vía Web3Forms
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  const originalLabel = submitBtn.querySelector('.btn-label').textContent;
  submitBtn.querySelector('.btn-label').textContent = 'Enviando…';

  try {
    const formData = new FormData(form);
    const response = await fetch('/api/cotizacion', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    if (result.success) {
      showNotice('¡Gracias! Recibimos tu cotización. Te respondemos en menos de 24 horas.', 'success');
      form.reset();
    } else {
      throw new Error(result.message || 'Error al enviar');
    }
  } catch (err) {
    showNotice('Hubo un problema enviando tu cotización. Escríbenos por WhatsApp o a contacto@streetvision.cl', 'error');
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-label').textContent = originalLabel;
  }
});

/* ==========================================
   FOOTER — año actual
   ========================================== */
document.getElementById('currentYear').textContent = new Date().getFullYear();

/* ==========================================
   ACTIVE NAV LINK por sección
   ========================================== */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      allNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));
