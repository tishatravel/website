import { scrollToContact } from '../utils.js';

export function initPackages(mount, packages) {
  const grid = mount.querySelector('[data-packages-grid]');
  const empty = mount.querySelector('[data-packages-empty]');
  if (!grid) return;

  const featured = (packages || []).filter((p) => p.featured).sort((a, b) => a.order - b.order);

  if (!featured.length) {
    grid.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;

  grid.innerHTML = featured
    .map((pkg) => {
      const img = pkg.image?.src || '';
      const alt = pkg.image?.alt || pkg.title;
      return `
      <article class="package-card" data-package-id="${pkg.id}">
        <div class="package-card__image-wrap">
          <img src="${img}" alt="${alt}" width="400" height="280" loading="lazy" class="package-card__image"
            onerror="this.parentElement.innerHTML='<div class=\\'image-placeholder\\' style=\\'min-height:200px\\'>${alt}</div>'">
        </div>
        <div class="package-card__body">
          <span class="package-card__type">${pkg.type === 'domestic' ? 'Domestic' : 'International'}</span>
          <h3 class="package-card__title">${pkg.title}</h3>
          <p class="package-card__destination">${pkg.destination}</p>
          <p class="package-card__duration">${pkg.duration}</p>
          ${pkg.departureDates ? `<p class="package-card__dates"><strong>Departures:</strong> ${pkg.departureDates}</p>` : ''}
          <p class="package-card__desc">${pkg.description}</p>
          ${pkg.priceFrom ? `<p class="package-card__price">${pkg.priceFrom}</p>` : ''}
          <details class="package-card__details">
            <summary>View inclusions & exclusions</summary>
            <div class="package-card__lists">
              <div><strong>Inclusions:</strong><ul>${pkg.inclusions.map((i) => `<li>${i}</li>`).join('')}</ul></div>
              ${pkg.exclusions?.length ? `<div><strong>Exclusions:</strong><ul>${pkg.exclusions.map((i) => `<li>${i}</li>`).join('')}</ul></div>` : ''}
            </div>
          </details>
          <button type="button" class="btn btn--primary package-card__cta" data-inquire="${pkg.id}">Inquire About This Package</button>
        </div>
      </article>`;
    })
    .join('');

  grid.querySelectorAll('[data-inquire]').forEach((btn) => {
    btn.addEventListener('click', () => scrollToContact(btn.dataset.inquire));
  });
}
