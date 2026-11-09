// Review gates are client-side UX, not tamper-proof signatures or proof of reading.
(() => {
  const form = document.querySelector('#project-form[data-gated-submit="true"]');
  if (!form) return;
  const dialog = document.querySelector('#agreement-dialog');
  const content = document.querySelector('#agreement-content');
  const title = document.querySelector('#agreement-dialog-title');
  const status = document.querySelector('#agreement-review-status');
  const agree = document.querySelector('#agreement-accept');
  const controls = [...document.querySelectorAll('[data-review-checkbox]')];
  const reviewed = new Set();
  let current = null;
  let request = null;
  let generation = 0;
  let loaded = false;
  let accepted = false;
  function notify() { form.dispatchEvent(new Event('change', { bubbles: true })); }
  function revoke(button) {
    const checkbox = document.getElementById(button.dataset.reviewCheckbox);
    reviewed.delete(checkbox.id);
    checkbox.checked = false;
    checkbox.setAttribute('aria-disabled', 'true');
    document.getElementById(checkbox.id + '-reviewed-at').value = '';
    document.getElementById(checkbox.id + '-checked-at').value = '';
    notify();
  }
  function checkScroll() {
    if (!loaded) return;
    const atEnd = content.scrollTop + content.clientHeight >= content.scrollHeight - 3;
    if (atEnd) {
      agree.disabled = false;
      status.textContent = 'You reached the end. Choose I agree to acknowledge this review, then check the box on the form.';
    }
  }
  async function open(button) {
    generation++;
    const opening = generation;
    request?.abort();
    current = button;
    revoke(button);
    loaded = false;
    accepted = false;
    agree.disabled = true;
    title.textContent = button.dataset.reviewTitle;
    content.replaceChildren();
    content.scrollTop = 0;
    status.textContent = 'Loading the documents…';
    dialog.showModal();
    request = new AbortController();
    const timeout = setTimeout(() => request?.abort(), 15000);
    try {
      const sections = await Promise.all(button.dataset.reviewDocuments.split(' ').map(async path => {
        const url = new URL(path, location.href);
        if (url.origin !== location.origin) throw new Error('Unexpected document destination');
        const response = await fetch(url, { signal: request.signal, cache: 'no-store' });
        if (!response.ok) throw new Error('Document unavailable');
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        const section = doc.querySelector('main .faq-section');
        if (!section) throw new Error('Document content missing');
        section.querySelectorAll('.portfolio-actions, script, style, iframe, form').forEach(node => node.remove());
        section.removeAttribute('class');
        return document.importNode(section, true);
      }));
      if (opening !== generation || !dialog.open) return;
      content.replaceChildren(...sections);
      loaded = true;
      content.scrollTop = 0;
      status.textContent = 'Scroll through all the documents to the bottom to enable I agree. You may cancel instead.';
      requestAnimationFrame(checkScroll);
    } catch {
      if (opening !== generation || !dialog.open) return;
      status.textContent = 'The documents could not be loaded. Cancel and open them again to retry. Agreement remains unavailable.';
    } finally { clearTimeout(timeout); }
  }
  for (const button of controls) {
    const checkbox = document.getElementById(button.dataset.reviewCheckbox);
    const checkedAt = document.createElement('input');
    checkedAt.type = 'hidden';
    checkedAt.id = checkbox.id + '-checked-at';
    checkedAt.name = checkbox.id.replaceAll('-', '_') + '_checked_at';
    checkedAt.defaultValue = '';
    form.append(checkedAt);
    checkbox.setAttribute('aria-disabled', 'true');
    button.addEventListener('click', () => open(button));
    checkbox.addEventListener('click', event => {
      if (!reviewed.has(checkbox.id)) {
        event.preventDefault();
        open(button);
      }
    });
    checkbox.addEventListener('change', () => {
      checkedAt.value = checkbox.checked && reviewed.has(checkbox.id) ? new Date().toISOString() : '';
    });
  }
  content.addEventListener('scroll', checkScroll, { passive: true });
  window.addEventListener('resize', checkScroll);
  agree.addEventListener('click', () => {
    if (agree.disabled || !loaded || !current) return;
    const checkbox = document.getElementById(current.dataset.reviewCheckbox);
    reviewed.add(checkbox.id);
    checkbox.setAttribute('aria-disabled', 'false');
    document.getElementById(checkbox.id + '-reviewed-at').value = new Date().toISOString();
    accepted = true;
    dialog.close();
    checkbox.focus();
    notify();
  });
  document.querySelector('#agreement-cancel').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    generation++;
    request?.abort();
    if (current && !accepted) revoke(current);
    content.replaceChildren();
    loaded = false;
    agree.disabled = true;
    if (current && !accepted) current.focus();
  });
  form.addEventListener('submit', event => {
    for (const button of controls) {
      const checkbox = document.getElementById(button.dataset.reviewCheckbox);
      if (!checkbox.checked || !reviewed.has(checkbox.id)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        open(button);
        break;
      }
    }
  }, true);
  function clearReviews() {
    generation++;
    request?.abort();
    accepted = false;
    reviewed.clear();
    for (const button of controls) revoke(button);
    if (dialog.open) dialog.close();
  }
  form.addEventListener('reset', clearReviews);
  window.addEventListener('pagehide', clearReviews);
  window.addEventListener('pageshow', clearReviews);
})();
