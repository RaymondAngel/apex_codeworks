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
  // Native POST supports browser validation and works without JavaScript.
  // FormSubmit handles verification and confirms processing on its own page.
}

updateCurrentDateTime();
setInterval(updateCurrentDateTime, 1000);
document.querySelectorAll('.current-year').forEach((element) => { element.textContent = new Date().getFullYear(); });
