// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('nav-hamburger');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('nav-hamburger').classList.remove('open');
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('nav-hamburger');
  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  }
});

// Copy email to clipboard
function copyEmail(e) {
  e.preventDefault();
  const email = 'sivanesa2016@gmail.com';
  const label = document.getElementById('copy-email-label');

  navigator.clipboard.writeText(email).then(() => {
    label.textContent = 'Copied!';
    document.getElementById('copy-email').style.borderColor = 'var(--green)';
    document.getElementById('copy-email').style.color = 'var(--green)';
    setTimeout(() => {
      label.textContent = email;
      document.getElementById('copy-email').style.borderColor = '';
      document.getElementById('copy-email').style.color = '';
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = email;
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    label.textContent = 'Copied!';
    setTimeout(() => { label.textContent = email; }, 2000);
  });
}

// Form submission handler
async function handleSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('contact-form');
  const btn     = form.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');

  btn.textContent   = 'Sending...';
  btn.style.opacity = '0.7';
  btn.disabled      = true;

  try {
    const res = await fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.reset();
      success.style.display = 'block';
      btn.textContent = 'Sent';
    } else {
      btn.textContent   = 'Error — try email directly';
      btn.style.opacity = '1';
      btn.disabled      = false;
    }
  } catch {
    btn.textContent   = 'Error — try email directly';
    btn.style.opacity = '1';
    btn.disabled      = false;
  }
}

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));
