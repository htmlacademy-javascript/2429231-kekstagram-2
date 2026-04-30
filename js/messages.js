// Модуль для показа сообщений об успехе/ошибке

const ALERT_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');


// Показывает сообщение об ошибке загрузки данных

const showDataLoadError = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.appendChild(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};


// Создает и показывает модальное сообщение (успех или ошибка)

const showMessage = (template, buttonClass) => {
  const messageElement = template.cloneNode(true);
  document.body.appendChild(messageElement);

  const closeButton = messageElement.querySelector(buttonClass);

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  }

  function onOutsideClick(evt) {
    if (evt.target === messageElement) {
      closeMessage();
    }
  }

  closeButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
};

const showSuccessMessage = () => {
  showMessage(successTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorTemplate, '.error__button');
};

export { showDataLoadError, showSuccessMessage, showErrorMessage };
