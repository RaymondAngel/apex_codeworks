import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';

const source = await fs.readFile(new URL('main.js', import.meta.url), 'utf8');
const contactCode = source.slice(source.indexOf('if (projectForm) {'), source.lastIndexOf('updateCurrentDateTime();'));

function element() {
  return {
    value: '', textContent: '', hidden: true, open: false, disabled: false,
    listeners: {}, attributes: {}, options: [],
    addEventListener(type, callback) { this.listeners[type] = callback; },
    setAttribute(key, value) { this.attributes[key] = value; },
    getAttribute(key) { return this.attributes[key]; },
    removeAttribute(key) { delete this.attributes[key]; },
    showModal() { this.open = true; }, close() { this.open = false; }, focus() {},
    querySelector() { return element(); }
  };
}

async function scenario(fetch, provider = 'formsubmit') {
  const fields = new Map(Object.entries({
    name: 'Test & company', email: 'test@example.com', phone: '',
    service: 'Other', budget: '', details: 'Line one\nDetails & ? # + ='
  }));
  if (provider === 'web3forms') {
    fields.set('access_key', 'test-public-form-key');
    fields.set('from_name', 'Apex Code Works');
  }
  const nodes = new Map();
  const get = selector => {
    if (!nodes.has(selector)) nodes.set(selector, element());
    return nodes.get(selector);
  };
  let resets = 0;
  const form = element();
  form.querySelector = get;
  form.action = provider === 'web3forms'
    ? 'https://api.web3forms.com/submit'
    : 'https://formsubmit.co/Raymond.Angel.Developer@gmail.com';
  form.reportValidity = () => true;
  form.reset = () => { resets++; };
  const window = element();
  const context = {
    projectForm: form, document: { querySelector: get }, window,
    localStorage: { getItem() { throw Error('Storage disabled'); } },
    isValidUsdBudget: () => true, crypto: webcrypto, fetch,
    URL, URLSearchParams, AbortController,
    setTimeout: () => 0, clearTimeout() {},
    FormData: class { constructor() { this.entries = new Map(fields); } get(key) { return this.entries.get(key); } [Symbol.iterator]() { return this.entries[Symbol.iterator](); } }
  };
  vm.runInNewContext(contactCode, context);
  await form.listeners.submit({ preventDefault() {} });
  return { form, fields, get, window, resets: () => resets };
}

for (const failure of [
  async () => { throw new TypeError('Failed to fetch'); },
  async () => ({ ok: false, status: 521 }),
  async () => ({ ok: true, json: async () => ({ success: false }) }),
  async () => ({ ok: true, json: async () => { throw SyntaxError('Invalid JSON'); } })
]) {
  const state = await scenario(failure);
  assert.equal(state.get('#email-fallback').hidden, false);
  assert.equal(state.get('#inquiry-confirmation').open, false);
  assert.equal(state.resets(), 0, 'Failure must preserve entries');
  assert.equal(state.get('[type="submit"]').disabled, false);
  state.fields.set('details', 'Edited after failure: & ? # + =\nSecond line');
  state.get('#email-draft-link').listeners.click();
  const draft = new URL(state.get('#email-draft-link').href);
  assert.equal(draft.pathname.toLowerCase(), 'raymond.angel.developer@gmail.com');
  assert.match(draft.searchParams.get('body'), /Edited after failure: & \? # \+ =\nSecond line/);
  assert.match(draft.searchParams.get('subject'), /ACW-[A-F0-9]{24}/);
  assert.match(state.get('#form-message').textContent, /We could not confirm/);
  state.window.listeners.pageshow({ persisted: true });
  assert.equal(state.get('#email-fallback').hidden, true);
  assert.equal(state.get('#email-draft-link').href, 'mailto:Raymond.Angel.Developer@gmail.com');
}

const accepted = await scenario(async (url, options) => {
  assert.equal(url, 'https://formsubmit.co/ajax/Raymond.Angel.Developer@gmail.com');
  assert.equal(options.method, 'POST');
  assert.match(options.body.get('_subject'), /ACW-/);
  return { ok: true, json: async () => ({ success: 'true' }) };
});
assert.equal(accepted.get('#email-fallback').hidden, true);
assert.equal(accepted.get('#inquiry-confirmation').open, true);
assert.equal(accepted.resets(), 1);
const web3Accepted = await scenario(async (url, options) => {
  assert.equal(url, 'https://api.web3forms.com/submit');
  assert.equal(options.headers['Content-Type'], 'application/json');
  const payload = JSON.parse(options.body);
  assert.equal(payload.access_key, 'test-public-form-key');
  assert.match(payload.subject, /ACW-[A-F0-9]{24}/);
  assert.equal(payload.message, 'Line one\nDetails & ? # + =');
  assert.equal(payload.email, 'test@example.com');
  assert.equal(payload.details, undefined);
  return { ok: true, json: async () => ({ success: true }) };
}, 'web3forms');
assert.equal(web3Accepted.get('#inquiry-confirmation').open, true);
assert.equal(web3Accepted.resets(), 1);
const web3Rejected = await scenario(async () => ({ ok: false, status: 400 }), 'web3forms');
assert.equal(web3Rejected.get('#inquiry-confirmation').open, false);
assert.equal(web3Rejected.get('#email-fallback').hidden, false);
assert.equal(web3Rejected.resets(), 0);
console.log('PASS: failure preserves entries, fallback uses current safely encoded details and business recipient, return clears draft, success confirms and resets.');
