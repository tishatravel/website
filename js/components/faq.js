import { fetchJSON } from '../utils.js';

export async function initFaq(mount) {
  const list = mount.querySelector('[data-faq-list]');
  if (!list) return;

  try {
    const data = await fetchJSON('data/faq.json');
    const entries = (data.entries || []).sort((a, b) => a.order - b.order);
    list.innerHTML = entries
      .map((entry, i) => {
        const btnId = `faq-btn-${entry.id}`;
        const panelId = `faq-panel-${entry.id}`;
        return `
        <div class="faq-item">
          <h3 class="faq-item__heading">
            <button type="button" class="faq-item__button" id="${btnId}"
              aria-expanded="false" aria-controls="${panelId}">
              ${entry.question}
              <span class="faq-item__icon" aria-hidden="true"></span>
            </button>
          </h3>
          <div id="${panelId}" class="faq-item__panel" role="region" aria-labelledby="${btnId}" hidden>
            <p>${entry.answer}</p>
          </div>
        </div>`;
      })
      .join('');

    list.querySelectorAll('.faq-item__button').forEach((btn) => {
      btn.addEventListener('click', () => toggleFaq(btn));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFaq(btn);
        }
      });
    });
  } catch (e) {
    list.innerHTML = '<p>FAQ unavailable.</p>';
  }
}

function toggleFaq(btn) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  btn.setAttribute('aria-expanded', String(!expanded));
  if (panel) panel.hidden = expanded;
}
