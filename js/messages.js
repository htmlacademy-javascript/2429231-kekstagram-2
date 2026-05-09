// Модуль для показа сообщений об успехе/ошибке

const ALERT_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');


// Показывает сообщение об ошибке загрузки данных

const showDataLoadError = (message) => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  dataErrorElement.querySelector('.data-error__title').textContent = message;
  document.body.appendChild(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

// Создает и показывает модальное сообщение (успех или ошибка)

const showMessage = (template, buttonClass, titleClass, message) => {
  const messageElement = template.cloneNode(true);

  if (message) {
    messageElement.querySelector(titleClass).textContent = message;
  }

  document.body.appendChild(messageElement);

  const closeButton = messageElement.querySelector(buttonClass);

  const handlers = {};

  handlers.onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      handlers.closeMessage();
    }
  };

  handlers.onOutsideClick = (evt) => {
    if (evt.target === messageElement) {
      handlers.closeMessage();
    }
  };

  handlers.closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', handlers.onEscKeydown, true);
    document.removeEventListener('click', handlers.onOutsideClick);
  };

  closeButton.addEventListener('click', handlers.closeMessage);
  document.addEventListener('keydown', handlers.onEscKeydown, true);
  document.addEventListener('click', handlers.onOutsideClick);
};

const showSuccessMessage = () => {
  showMessage(successTemplate, '.success__button', '.success__title');
};

const showErrorMessage = (message) => {
  showMessage(errorTemplate, '.error__button', '.error__title', message);
};

export { showDataLoadError, showSuccessMessage, showErrorMessage };
