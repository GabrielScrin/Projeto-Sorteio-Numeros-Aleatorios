const form = document.querySelector('#raffle-form');
const minInput = document.querySelector('#min-value');
const maxInput = document.querySelector('#max-value');
const errorMessage = document.querySelector('#error-message');
const modal = document.querySelector('#result-modal');
const resultNumber = document.querySelector('#result-number');

const closeElements = Array.from(document.querySelectorAll('[data-close]'));
let lastFocusedElement = null;

const showError = (message) => {
  errorMessage.textContent = message;
};

const clearError = () => {
  errorMessage.textContent = '';
};

const clampValues = (value) => Number.isNaN(value) ? null : value;

const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const openModal = () => {
  lastFocusedElement = document.activeElement;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  modal.querySelector('.modal__close').focus();
};

const closeModal = () => {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const min = clampValues(parseInt(minInput.value, 10));
  const max = clampValues(parseInt(maxInput.value, 10));

  if (min === null || max === null) {
    showError('Preencha os dois valores para sortear.');
    return;
  }

  if (min > max) {
    showError('O valor mínimo deve ser menor ou igual ao máximo.');
    return;
  }

  clearError();
  const result = getRandomInRange(min, max);
  resultNumber.textContent = result;
  openModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

closeElements.forEach((element) => {
  element.addEventListener('click', closeModal);
});
