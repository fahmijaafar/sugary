const mobileToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];
const faqButtons = document.querySelectorAll('.faq-button');

mobileToggle?.addEventListener('click', () => {
  if (!mobileNav) return;
  const isOpen = mobileNav.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
  });
});

faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    if (!item) return;
    const openItem = document.querySelector('.faq-item.open');
    if (openItem && openItem !== item) {
      openItem.classList.remove('open');
      const openButton = openItem.querySelector('.faq-button');
      openButton?.setAttribute('aria-expanded', 'false');
    }
    const isOpen = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealItems.forEach(item => revealObserver.observe(item));

const galleryCards = document.querySelectorAll('.gallery-card');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.tabIndex = -1;
lightbox.innerHTML = `<div class="lightbox-backdrop"></div><div class="lightbox-content"><button class="lightbox-close" aria-label="Close">×</button><img src="" alt="" loading="lazy"></div>`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

const openLightbox = (src, alt) => {
  if (!lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add('open');
  lightbox.focus();
};

const closeLightbox = () => {
  lightbox.classList.remove('open');
};

galleryCards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if (!img) return;
    openLightbox(img.src, img.alt || 'Dessert photo');
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.classList.contains('lightbox') || target.classList.contains('lightbox-backdrop')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});
