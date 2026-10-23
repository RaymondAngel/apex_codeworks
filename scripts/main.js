document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#primary-navigation');
const serviceCards = document.querySelectorAll('.service-card');
const projectForm = document.querySelector('#project-form');
const dateTimeElements = document.querySelectorAll('.current-datetime');
const videoDialog = document.querySelector('.video-dialog');
const videoDialogPlayer = document.querySelector('.video-dialog-player');
const videoDialogTitle = document.querySelector('#expanded-video-title');
const videoDialogClose = document.querySelector('.video-dialog-close');
const videoExpandButtons = document.querySelectorAll('.video-expand');

function setMenuState(isOpen) {
  if (!navigation || !menuButton) return;
  navigation.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', `${isOpen}`);
  menuButton.querySelector('.menu-label').textContent = `${isOpen ? 'Close' : 'Menu'}`;
}

function toggleMenu() {
  setMenuState(!navigation.classList.contains('open'));
}

function closeMenu() {
  setMenuState(false);
}

function rememberService(category) {
  const visit = {
    category,
    viewedAt: new Date().toISOString()
  };
  localStorage.setItem('apexLastService', JSON.stringify(visit));
}

function updateCurrentDateTime() {
  const now = new Date();
  const readableDateTime = now.toLocaleString(undefined, {
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  dateTimeElements.forEach((element) => {
    element.dateTime = `${now.toISOString()}`;
    element.textContent = `${readableDateTime}`;
  });
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', toggleMenu);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

serviceCards.forEach((card) => {
  card.addEventListener('click', () => {
    rememberService(card.dataset.category);
  });
});

function closeExpandedVideo() {
  if (!videoDialog?.open) return;
  videoDialog.close();
}

if (videoDialog && videoDialogPlayer && videoDialogTitle && videoDialogClose) {
  videoExpandButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = button.dataset.videoSrc;
      iframe.title = button.dataset.videoTitle;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      videoDialogTitle.textContent = button.dataset.videoTitle;
      videoDialogPlayer.replaceChildren(iframe);
      videoDialog.showModal();
    });
  });

  videoDialogClose.addEventListener('click', closeExpandedVideo);

  videoDialog.addEventListener('click', (event) => {
    if (event.target === videoDialog) closeExpandedVideo();
  });

  videoDialog.addEventListener('close', () => {
    videoDialogPlayer.replaceChildren();
  });
}

// Accept US-style numbers, optional dollar signs, and an optional ascending range.
function isValidUsdBudget(value) {
  const budget = value.trim();
  if (!budget) return true;
  const amount = String.raw`\$?\s*(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?`;
  const pattern = new RegExp(String.raw`^${amount}(?:\s*[-–—]\s*${amount})?$`);
  if (!pattern.test(budget)) return false;
  const numbers = budget.split(/[-–—]/).map((part) => Number(part.replace(/[$,\s]/g, '')));
  return numbers.every(Number.isFinite) && (numbers.length === 1 || numbers[0] <= numbers[1]);
}
if (projectForm) {
  const serviceSelect = projectForm.querySelector('#service');
  // Service preferences are optional; blocked storage must never prevent submission.
  try {
    const savedService = JSON.parse(localStorage.getItem('apexLastService'))?.category;
    if (savedService && [...serviceSelect.options].some((option) => option.value === savedService)) {
      serviceSelect.value = savedService;
    }
  } catch {
    // Continue with the default service when storage is unavailable or malformed.
  }
  const submitButton = projectForm.querySelector('[type="submit"]');
  const formMessage = projectForm.querySelector('#form-message');
  const emailInput = projectForm.querySelector('#email');
  const emailError = projectForm.querySelector('#email-error');
  function showEmailError() {
    const message = emailInput.validity.valueMissing
      ? 'Please enter your email address.'
      : emailInput.validity.typeMismatch
        ? 'Please enter a valid email address, such as name@example.com.'
        : '';
    emailError.textContent = message;
    emailInput.setAttribute('aria-invalid', String(Boolean(message)));
  }
  emailInput.addEventListener('invalid', showEmailError);
  emailInput.addEventListener('blur', () => {
    if (emailInput.value || emailInput.getAttribute('aria-invalid') === 'true') showEmailError();
  });
  emailInput.addEventListener('input', () => {
    if (emailInput.getAttribute('aria-invalid') === 'true') showEmailError();
  });
  const confirmation = document.querySelector('#inquiry-confirmation');
  const confirmationNumber = document.querySelector('#confirmation-number');
  const budgetInput = projectForm.querySelector('#budget');
  const budgetError = document.querySelector('#budget-error');
  function validateBudget() {
    const valid = isValidUsdBudget(budgetInput.value);
    budgetInput.setAttribute('aria-invalid', String(!valid));
    if (!valid && !budgetError.open) budgetError.showModal();
    return valid;
  }
  budgetError.querySelector('.confirmation-close').addEventListener('click', () => budgetError.close());
  budgetError.addEventListener('close', () => budgetInput.focus());
  budgetInput.addEventListener('blur', validateBudget);
  budgetInput.addEventListener('input', () => budgetInput.removeAttribute('aria-invalid'));
  let sending = false;
  let inquiryReference = null;

  // START CONTACT PAGE RESET ON RETURN
  // Clears the previous inquiry confirmation message and number, closes dialogs,
  // and resets the form when a visitor leaves and returns via browser Back/Forward.
  // Browsers can restore the previous page from their back/forward cache;
  // event.persisted identifies that restored page. A fresh page load starts clean.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    projectForm.reset();
    emailError.textContent = '';
    emailInput.removeAttribute('aria-invalid');
    formMessage.textContent = '';
    confirmationNumber.textContent = '';
    if (confirmation.open) confirmation.close();
    if (budgetError.open) budgetError.close();
    budgetInput.removeAttribute('aria-invalid');
    if (!sending) inquiryReference = null;
  });
  // END CONTACT PAGE RESET ON RETURN

  confirmation.querySelector('.confirmation-close').addEventListener('click', () => confirmation.close());
  confirmation.addEventListener('close', () => submitButton.focus());
  // Keep the modal open until the customer clicks its clearly labeled X.
  confirmation.addEventListener('cancel', (event) => event.preventDefault());

  projectForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || !validateBudget() || !projectForm.reportValidity()) return;
    sending = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending inquiry...';
    formMessage.textContent = 'Sending your inquiry…';
    const controller = new AbortController();
    const progressUpdate = setTimeout(() => {
      formMessage.textContent = 'Still waiting for the email service to confirm your inquiry. Your entries are preserved.';
    }, 8000);
    const timeout = setTimeout(() => controller.abort(), 30000);
    let receivedResponse = false;

    try {
      if (!inquiryReference) {
        const random = crypto.getRandomValues(new Uint8Array(12));
        inquiryReference = `ACW-${Array.from(random, (byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
      }
      const payload = Object.fromEntries(new FormData(projectForm));
      payload.budget = budgetInput.value.trim() ? `${budgetInput.value.trim()} USD` : 'Not specified';
      payload.details = payload.details.trim() || 'Not specified';
      payload.confirmation_number = inquiryReference;
      payload._subject = `Apex Code Works inquiry [${inquiryReference}]`;
      const response = await fetch(projectForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST',
        // Standard form encoding avoids the cross-origin JSON preflight request.
        headers: { Accept: 'application/json' },
        body: new URLSearchParams(payload),
        signal: controller.signal
      });
      receivedResponse = true;
      if (!response.ok) {
        throw new Error(response.status === 429 ? 'rate-limit' : 'service-error');
      }
      const result = await response.json();
      if (!(result.success === true || result.success === 'true')) {
        throw new Error('not-accepted');
      }
      confirmationNumber.textContent = inquiryReference;
      formMessage.textContent = `Inquiry sent. Your confirmation number is ${inquiryReference}.`;
      projectForm.reset();
      emailError.textContent = '';
      emailInput.removeAttribute('aria-invalid');
      inquiryReference = null;
      confirmation.showModal();
    } catch (error) {
      // A connection failure can happen after acceptance; retain the same reference on retry.
      const reference = inquiryReference ? ` Reference: ${inquiryReference}.` : '';
      const diagnostic = error.name === 'AbortError'
        ? receivedResponse ? 'TIMEOUT-READING-RESPONSE' : 'TIMEOUT-WAITING-FOR-RESPONSE'
        : error.message === 'rate-limit' ? 'RATE-LIMIT'
          : error.message === 'not-accepted' ? 'NOT-ACCEPTED'
            : error.message === 'service-error' ? 'SERVICE-ERROR'
              : receivedResponse ? 'INVALID-RESPONSE' : 'CONNECTION-ERROR';
      const reason = error.name === 'AbortError'
        ? 'The email service is taking too long to respond.'
        : error.message === 'rate-limit'
          ? 'The email service is receiving too many requests. Please wait a few minutes before retrying.'
          : error.message === 'not-accepted'
            ? 'The email service did not accept this inquiry.'
            : error.message === 'service-error'
              ? 'The email service returned an error.'
              : 'The connection to the email service could not be completed.';
      formMessage.textContent = `${reason} We could not confirm your submission.${reference} Diagnostic: ${diagnostic}. Your entries are still here. It may have been received; check before resending to avoid a duplicate. You can email Raymond.Angel.Developer@gmail.com or call 661-646-3424 and include this reference if shown.`;
    } finally {
      clearTimeout(timeout);
      clearTimeout(progressUpdate);
      sending = false;
      submitButton.disabled = false;
      submitButton.textContent = 'Send project inquiry';
    }
  });
  submitButton.disabled = false;
}

updateCurrentDateTime();
setInterval(updateCurrentDateTime, 1000);
document.querySelectorAll('.current-year').forEach((element) => { element.textContent = new Date().getFullYear(); });
