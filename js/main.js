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
