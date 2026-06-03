import { fetchJSON } from '../utils.js';

export async function initGallery(mount) {
  const grid = mount.querySelector('[data-gallery-grid]');
  if (!grid) return;

  try {
    const data = await fetchJSON('data/gallery.json');
    const items = (data.items || []).sort((a, b) => a.order - b.order);
    grid.innerHTML = items
      .map(
        (item) => `
      <figure class="gallery-item">
        <img src="${item.src}" alt="${item.alt}" width="400" height="300" loading="lazy" class="gallery-item__img"
          onerror="this.parentElement.innerHTML='<div class=\\'image-placeholder\\' style=\\'min-height:200px\\'>${item.alt}</div>'">
        ${item.caption ? `<figcaption class="gallery-item__caption">${item.caption}${item.destination ? ` — ${item.destination}` : ''}</figcaption>` : ''}
      </figure>`
      )
      .join('');
  } catch (e) {
    grid.innerHTML = '<p>Gallery unavailable.</p>';
  }
}
