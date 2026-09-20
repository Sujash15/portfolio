/**
 * SUJASH | Filmmaker Portfolio JavaScript
 * Interactions, smooth modal handlers, active nav tracking, mobile drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initScrollSpy();
  initModals();
  initContactForm();
  initAtmosphereSwitcher();
});

/* --------------------------------------------------------------------------
   Sticky Header on Scroll
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta .btn');

  if (!menuBtn || !drawer) return;

  const toggleMenu = () => {
    const isOpen = menuBtn.classList.toggle('active');
    drawer.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    menuBtn.classList.remove('active');
    drawer.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   Active Navigation ScrollSpy
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -55% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        setActiveLink(currentId);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  function setActiveLink(id) {
    desktopNavLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileNavLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   Modal Dialog Handlers (<dialog> with modern light dismiss)
   -------------------------------------------------------------------------- */
const PROJECT_DATA = {
  gangsta: {
    title: 'THE GANGSTA',
    tagline: 'SHORT FILM · ACTION COMEDY',
    format: 'Short Film (Shot on iPhone)',
    role: 'Writer · Actor',
    poster: 'assets/images/poster-gangsta.jpg',
    synopsis: 'An intense yet comedic clash of territorial egos where three rival crews—The Seniors, The Mass, and The Dancer—suddenly collide in a high-stakes standoff. As verbal jabs and physical intimidation escalate, they confront a surprising shared predicament that flips their conflict on its head.',
    specs: {
      format: 'Short Film',
      genre: 'Action Comedy',
      credits: 'Written by Sujash · Featuring Sujash',
      channel: 'BigMakers (YouTube)'
    },
    youtubeUrl: 'https://www.youtube.com/@BigMakers-p6k'
  },
  sarguna: {
    title: 'SARGUNA',
    tagline: 'SHORT FILM · ACTION THRILLER',
    format: 'Short Film (Shot on iPhone)',
    role: 'Writer · Actor',
    poster: 'assets/images/poster-sarguna.svg',
    synopsis: 'A gripping action-thriller ignited when an intense conflict with an influential local syndicate boss sparks an impending gang retribution. The narrative centers on a fiercely protective sister, Sarguna, who steps into the line of fire to defend her brother against insurmountable odds.',
    specs: {
      format: 'Short Film',
      genre: 'Action Thriller',
      credits: 'Written by Sujash · Featuring Sujash',
      channel: 'BigMakers (YouTube)'
    },
    youtubeUrl: 'https://www.youtube.com/@BigMakers-p6k'
  }
};

function initModals() {
  const projectModal = document.getElementById('projectModal');
  const screenplayModal = document.getElementById('screenplayModal');
  const contactModal = document.getElementById('contactModal');

  // Helper to attach light dismiss
  [projectModal, screenplayModal, contactModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        modal.close();
      }
    });
  });

  // Project Modal Openers
  document.querySelectorAll('[data-project-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project-key');
      openProjectModal(key);
    });
  });

  // Screenplay Modal Opener
  const viewWritingBtns = document.querySelectorAll('.btn-view-writing');
  viewWritingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (screenplayModal) {
        screenplayModal.showModal();
      }
    });
  });

  // Contact Modal Opener
  const contactBtns = document.querySelectorAll('.btn-open-contact');
  contactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (contactModal) {
        contactModal.showModal();
      }
    });
  });

  // Close buttons
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('dialog');
      if (parentModal) parentModal.close();
    });
  });
}

function openProjectModal(key) {
  const modal = document.getElementById('projectModal');
  const data = PROJECT_DATA[key];
  if (!modal || !data) return;

  document.getElementById('pmTitle').textContent = data.title;
  document.getElementById('pmTagline').textContent = data.tagline;
  document.getElementById('pmPoster').src = data.poster;
  document.getElementById('pmPoster').alt = `${data.title} Film Poster`;
  document.getElementById('pmSynopsis').textContent = data.synopsis;
  document.getElementById('pmFormat').textContent = data.specs.format;
  document.getElementById('pmGenre').textContent = data.specs.genre;
  document.getElementById('pmRole').textContent = data.specs.credits;
  document.getElementById('pmChannel').textContent = data.specs.channel;

  const ytBtn = document.getElementById('pmWatchBtn');
  if (ytBtn) {
    ytBtn.href = data.youtubeUrl;
  }

  modal.showModal();
}

/* --------------------------------------------------------------------------
   Contact Form & Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const role = document.getElementById('senderRole').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    const subject = encodeURIComponent(`Filmmaking Collaboration Inquiry - from ${name} (${role})`);
    const body = encodeURIComponent(`Hi Sujash,\n\n${message}\n\nBest regards,\n${name}\n${role}`);

    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    const contactModal = document.getElementById('contactModal');
    if (contactModal) contactModal.close();

    showToast('Collaboration draft opened in your email client.');
  });
}

/* --------------------------------------------------------------------------
   Toast Notification Utility
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* --------------------------------------------------------------------------
   DarkVeil Atmosphere Mood Switcher
   -------------------------------------------------------------------------- */
function initAtmosphereSwitcher() {
  const buttons = document.querySelectorAll('.atmosphere-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const hue = parseFloat(btn.getAttribute('data-hue')) || 0;
      if (window.heroDarkVeilInstance && window.heroDarkVeilInstance.setProps) {
        window.heroDarkVeilInstance.setProps({ hueShift: hue });
      }
    });
  });
}
