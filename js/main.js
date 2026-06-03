import { CONFIG } from './config.js';
import { fetchJSON, loadPartial } from './utils.js';
import { initNavigation } from './components/navigation.js';
import { initInquiryForm } from './components/inquiry-form.js';
import { initPackages } from './components/packages.js';
import { initServices } from './components/services.js';
import { initGallery } from './components/gallery.js';
import { initFaq } from './components/faq.js';

const COMPONENTS = [
  { id: 'site-header', partial: 'components/header.html', css: 'css/components/header.css', init: null },
  { id: 'hero', partial: 'components/hero.html', css: 'css/components/hero.css', init: 'hero' },
  { id: 'about', partial: 'components/about.html', css: 'css/components/about.css', init: 'about' },
  { id: 'services', partial: 'components/services.html', css: 'css/components/services.css', init: 'services' },
  { id: 'packages', partial: 'components/packages.html', css: 'css/components/packages.css', init: 'packages' },
  { id: 'testimonials', partial: 'components/testimonials.html', css: 'css/components/testimonials.css', init: 'testimonials' },
  { id: 'gallery', partial: 'components/gallery.html', css: 'css/components/gallery.css', init: 'gallery' },
  { id: 'faq', partial: 'components/faq.html', css: 'css/components/faq.css', init: 'faq' },
  { id: 'contact', partial: 'components/contact.html', css: 'css/components/contact.css', init: 'contact' },
  { id: 'site-footer', partial: 'components/footer.html', css: 'css/components/footer.css', init: null },
];

let companyData = null;
let packagesData = [];

function linkStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

async function loadComponent({ id, partial, css, init }) {
  const mount = document.getElementById(id);
  if (!mount) return;

  linkStylesheet(css);

  try {
    const html = await loadPartial(partial);
    mount.innerHTML = html;
  } catch (err) {
    console.error(err);
    mount.innerHTML = `<p class="section-subtitle">Content temporarily unavailable.</p>`;
    return;
  }

  if (init === 'hero') bindHero(mount);
  if (init === 'about') bindAbout(mount);
  if (init === 'testimonials') bindTestimonials(mount);
  if (init === 'services') await initServices(mount);
  if (init === 'packages') initPackages(mount, packagesData);
  if (init === 'gallery') await initGallery(mount);
  if (init === 'faq') await initFaq(mount);
  if (init === 'contact') initInquiryForm(mount, companyData, packagesData);
}

function bindHero(mount) {
  if (!companyData) return;
  const h1 = mount.querySelector('[data-hero-headline]');
  const sub = mount.querySelector('[data-hero-subheadline]');
  const imgWrap = mount.querySelector('[data-hero-image]');
  if (h1) h1.textContent = companyData.hero.headline;
  if (sub) sub.textContent = companyData.hero.subheadline;
  if (imgWrap && companyData.hero.image) {
    const img = document.createElement('img');
    img.src = companyData.hero.image.src;
    img.alt = companyData.hero.image.alt;
    img.loading = 'eager';
    img.width = 1200;
    img.height = 600;
    img.className = 'hero__image';
    img.onerror = () => {
      imgWrap.innerHTML = `<div class="image-placeholder hero__placeholder">${companyData.hero.image.alt}</div>`;
    };
    imgWrap.appendChild(img);
  }
}

function bindAbout(mount) {
  if (!companyData) return;
  const desc = mount.querySelector('[data-about-description]');
  const mission = mount.querySelector('[data-about-mission]');
  const list = mount.querySelector('[data-about-differentiators]');
  if (desc) desc.textContent = companyData.description;
  if (mission) mission.textContent = companyData.mission;
  if (list) {
    list.innerHTML = companyData.differentiators
      .map((d) => `<li>${d}</li>`)
      .join('');
  }
}

async function bindTestimonials(mount) {
  const grid = mount.querySelector('[data-testimonials-grid]');
  if (!grid) return;
  try {
    const data = await fetchJSON('data/testimonials.json');
    const items = (data.testimonials || []).sort((a, b) => a.order - b.order);
    grid.innerHTML = items
      .map(
        (t) => `
      <article class="testimonial-card">
        <blockquote class="testimonial-card__quote">"${t.quote}"</blockquote>
        <footer class="testimonial-card__author">
          <strong>${t.author}</strong>
          ${t.context ? `<span class="testimonial-card__context">${t.context}</span>` : ''}
        </footer>
      </article>`
      )
      .join('');
  } catch (e) {
    grid.innerHTML = '<p>Testimonials unavailable.</p>';
  }
}

function bindHeaderFooter() {
  if (!companyData) return;
  const { contact, name, logo } = companyData;
  const digits = contact.phone.replace(/\D/g, '');
  const phoneHref = digits.startsWith('63')
    ? `tel:+${digits}`
    : digits.startsWith('0')
      ? `tel:+63${digits.slice(1)}`
      : `tel:+63${digits}`;
  const mailHref = `mailto:${contact.email}`;

  document.querySelectorAll('[data-company-name]').forEach((el) => {
    if (el.classList.contains('site-header__brand-name')) {
      el.textContent = 'Tisha Travel';
      el.closest('.site-header__brand')?.setAttribute('title', name);
    } else {
      el.textContent = name;
    }
  });

  document.querySelectorAll('[data-logo]').forEach((el) => {
    el.src = logo.src;
    el.alt = logo.alt;
  });

  document.querySelectorAll('[data-contact-phone]').forEach((el) => {
    el.href = phoneHref;
    el.textContent = contact.phone;
  });

  document.querySelectorAll('[data-contact-email]').forEach((el) => {
    el.href = mailHref;
    el.textContent = contact.email;
  });

  document.querySelectorAll('[data-contact-facebook]').forEach((el) => {
    el.href = contact.facebookUrl;
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  document.querySelectorAll('[data-contact-address]').forEach((el) => {
    if (contact.address) el.textContent = contact.address;
  });
}

async function bootstrap() {
  try {
    companyData = await fetchJSON('data/company.json');
    window.__companyData = companyData;
    const pkgRes = await fetchJSON('data/packages.json');
    packagesData = pkgRes.packages || [];
  } catch (e) {
    console.error('Failed to load company data', e);
  }

  for (const comp of COMPONENTS) {
    await loadComponent(comp);
  }

  bindHeaderFooter();
  initNavigation();
}

document.addEventListener('DOMContentLoaded', bootstrap);

export { companyData, packagesData, CONFIG };
