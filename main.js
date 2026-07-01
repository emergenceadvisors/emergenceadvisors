/* mobile menu */
const mobToggle = document.getElementById('mob-toggle');
const mobNav    = document.getElementById('mob-nav');
mobToggle.addEventListener('click', () => {
  const isOpen = mobToggle.classList.toggle('open');
  mobNav.classList.toggle('open');
  mobToggle.setAttribute('aria-expanded', String(isOpen));
});
function closeMob() {
  mobToggle.classList.remove('open');
  mobNav.classList.remove('open');
  mobToggle.setAttribute('aria-expanded', 'false');
}

/* smooth scroll */
// ⚡ Bolt: Use event delegation instead of attaching O(n) event listeners
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  if (id === '#') return;
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();

  // Fix focus routing broken by preventDefault()
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });

  const offset = window.innerWidth <= 1100 ? 68 : 0;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
});

/* active nav via IntersectionObserver */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.sidenav a');

// Performance optimization: Cache navigation links in an O(1) Map.
// This eliminates the need for expensive document.querySelector() calls
// inside the high-frequency IntersectionObserver callback below,
// reducing main thread blocking during scrolling.
const navMap = new Map();
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.startsWith('#')) {
    navMap.set(href.substring(1), link);
  }
});
const visibleSections = new Set();
let currentActiveId = null;
const activeObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) visibleSections.add(entry.target);
    else visibleSections.delete(entry.target);
  });
  let top = null;
  // Performance optimization: Avoid calling getBoundingClientRect() inside the IntersectionObserver
  // callback to prevent synchronous layout thrashing. Since 'sections' is in DOM order, the first
  // section found in the 'visibleSections' set is guaranteed to be the topmost visible section.
  for (let i = 0; i < sections.length; i++) {
    if (visibleSections.has(sections[i])) {
      top = sections[i];
      break;
    }
  }
  if (top && top.id !== currentActiveId) {
    currentActiveId = top.id;
    // Bolt Optimization: Only update DOM when active section changes, and reuse existing NodeList
    navLinks.forEach(a => {
      if (a.getAttribute('href') === `#${top.id}`) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }
}, { rootMargin: '-10% 0px -80% 0px', threshold: 0 });
sections.forEach(s => activeObs.observe(s));

/* accordion */
function toggleSvc(btn) {
  const item = btn.closest('li');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.svc-accord li.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.svc-btn').setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

/* scroll reveal */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* netlify form */
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('f-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  // Security Fix: Prevent data exfiltration to 3rd party endpoints
  // Submit securely to Netlify's native form handling via root
  const formData = new FormData(e.target);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString()
  })
  .then(res => {
    if (!res.ok) throw new Error('Server error');
    document.getElementById('f-inner').style.display = 'none';
    const successEl = document.getElementById('f-success');
    successEl.classList.add('show');
    successEl.focus();
  })
  .catch(() => {
    btn.textContent = 'Send Message \u2192';
    btn.disabled = false;
    btn.removeAttribute('aria-busy');
    alert('Something went wrong. Email info@emergenceadvisors.com or call (949) 409-5407.');
  });
}


// Event Listeners for inline handlers
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', closeMob);
  });

  // Services Accordion
  document.querySelectorAll('.svc-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      toggleSvc(e.currentTarget);
    });
  });

  // Contact Form
  const contactForm = document.querySelector('form[name="contact"]');
  if (contactForm) {
    contactForm.addEventListener('submit', handleForm);
  }
});
