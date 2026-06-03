import { fetchJSON } from '../utils.js';

export async function initServices(mount) {
  const grid = mount.querySelector('[data-services-grid]');
  if (!grid) return;

  try {
    const data = await fetchJSON('data/services.json');
    const services = (data.services || []).sort((a, b) => a.order - b.order);
    grid.innerHTML = services
      .map(
        (s) => `
      <article class="service-card">
        ${s.icon ? `<img src="${s.icon}" alt="" width="48" height="48" class="service-card__icon" aria-hidden="true">` : ''}
        <h3 class="service-card__title">${s.title}</h3>
        <p class="service-card__desc">${s.description}</p>
      </article>`
      )
      .join('');
  } catch (e) {
    grid.innerHTML = '<p>Services unavailable.</p>';
  }
}
