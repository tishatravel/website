export async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

export async function loadPartial(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.text();
}

export function createPicture(src, alt, options = {}) {
  const { loading = 'lazy', width = 400, height = 300, className = '' } = options;
  const picture = document.createElement('picture');
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.width = width;
  img.height = height;
  img.loading = loading;
  if (className) img.className = className;
  img.onerror = function () {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.style.width = '100%';
    placeholder.style.minHeight = `${height}px`;
    placeholder.textContent = alt;
    picture.replaceWith(placeholder);
  };
  picture.appendChild(img);
  return picture;
}

export function scrollToContact(packageId = '') {
  const contact = document.getElementById('contact');
  if (contact) {
    contact.scrollIntoView({ behavior: 'smooth' });
    if (packageId) {
      window.dispatchEvent(new CustomEvent('select-package', { detail: { packageId } }));
    }
  }
}
