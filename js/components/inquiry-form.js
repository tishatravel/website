import { CONFIG } from '../config.js';

export function initInquiryForm(mount, company, packages) {
  const form = mount.querySelector('#inquiry-form');
  const alertBox = mount.querySelector('[data-form-alert]');
  const packageSelect = mount.querySelector('#packageId');
  if (!form) return;

  if (packageSelect && packages.length) {
    packages
      .filter((p) => p.featured)
      .forEach((p) => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.title;
        packageSelect.appendChild(opt);
      });
  }

  window.addEventListener('select-package', (e) => {
    if (packageSelect && e.detail?.packageId) {
      packageSelect.value = e.detail.packageId;
      const firstInvalid = form.querySelector('[aria-invalid="true"]') || form.querySelector('#name');
      if (firstInvalid) firstInvalid.focus();
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors(form);
    const data = getFormData(form);

    if (!validate(data, form)) return;

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');

    try {
      if (CONFIG.web3formsAccessKey) {
        await submitWeb3Forms(data, packages);
      } else {
        submitMailto(data, company, packages);
      }
      showAlert(alertBox, 'success', getSuccessMessage(company));
      form.reset();
    } catch (err) {
      showAlert(
        alertBox,
        'error',
        `Unable to send your inquiry. Please try again or contact us directly at ${company?.contact?.phone || 'our office'}.`
      );
      submitMailto(data, company, packages);
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
    }
  });
}

function getFormData(form) {
  return {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    packageId: form.packageId?.value || '',
    travelDates: form.travelDates?.value.trim() || '',
    message: form.message.value.trim(),
    consent: form.consent.checked,
  };
}

function validate(data, form) {
  let valid = true;

  if (data.name.length < 2) {
    setError(form.name, 'Please enter your full name (at least 2 characters).');
    valid = false;
  }

  if (!data.email && !data.phone) {
    setError(form.email, 'Please provide an email address or phone number so we can reach you.');
    setError(form.phone, 'Please provide an email address or phone number so we can reach you.');
    valid = false;
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    setError(form.email, 'Please enter a valid email address.');
    valid = false;
  }

  if (data.message.length < 10) {
    setError(form.message, 'Please tell us about your travel plans (at least 10 characters).');
    valid = false;
  }

  if (!data.consent) {
    setError(form.consent, 'Please confirm you agree to be contacted about your inquiry.');
    valid = false;
  }

  return valid;
}

function setError(field, message) {
  field.setAttribute('aria-invalid', 'true');
  const id = field.id + '-error';
  let err = document.getElementById(id);
  if (!err) {
    err = document.createElement('span');
    err.id = id;
    err.className = 'form-error';
    err.setAttribute('role', 'alert');
    field.setAttribute('aria-describedby', id);
    field.parentNode.appendChild(err);
  }
  err.textContent = message;
}

function clearErrors(form) {
  form.querySelectorAll('[aria-invalid]').forEach((f) => {
    f.removeAttribute('aria-invalid');
    f.removeAttribute('aria-describedby');
  });
  form.querySelectorAll('.form-error').forEach((e) => e.remove());
}

async function submitWeb3Forms(data, packages) {
  const pkg = packages.find((p) => p.id === data.packageId);
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: CONFIG.web3formsAccessKey,
      subject: CONFIG.inquirySubjectPrefix,
      from_name: data.name,
      name: data.name,
      email: data.email || 'not provided',
      phone: data.phone || 'not provided',
      package: pkg ? pkg.title : 'General Inquiry',
      travel_dates: data.travelDates,
      message: data.message,
    }),
  });
  const json = await res.json();
  if (!json.success) throw new Error('Submission failed');
}

function submitMailto(data, company, packages) {
  const pkg = packages.find((p) => p.id === data.packageId);
  const subject = encodeURIComponent(
    `${CONFIG.inquirySubjectPrefix} — ${pkg ? pkg.title : 'General Inquiry'}`
  );
  const body = encodeURIComponent(
    `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nPackage: ${pkg ? pkg.title : 'General Inquiry'}\nDates: ${data.travelDates}\n\nMessage:\n${data.message}`
  );
  window.location.href = `mailto:${company.contact.email}?subject=${subject}&body=${body}`;
}

function showAlert(el, type, message) {
  if (!el) return;
  el.className = `alert alert--${type}`;
  el.setAttribute('role', 'alert');
  el.hidden = false;
  el.textContent = message;
}

function getSuccessMessage(company) {
  return `Thank you for your inquiry! We have received your message and will respond within ${CONFIG.followUpHours}. For urgent requests, call us at ${company.contact.phone} or message us on Facebook.`;
}
