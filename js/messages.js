// Модуль для показа сообщений об успехе/ошибке

const ALERT_SHOW_TIME = 5000;

const dataErrorTemplateNode = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplateNode = document.querySelector('#success').content.querySelector('.success');
const errorTemplateNode = document.querySelector('#error').content.querySelector('.error');


// Показывает сообщение об ошибке загрузки данных

const showDataLoadError = (message) => {
  const dataErrorNode = dataErrorTemplateNode.cloneNode(true);
  dataErrorNode.querySelector('.data-error__title').textContent = message;
  document.body.appendChild(dataErrorNode);

  setTimeout(() => {
    dataErrorNode.remove();
  }, ALERT_SHOW_TIME);
};

// Создает и показывает модальное сообщение (успех или ошибка)

const showMessage = (template, buttonClass) => {
  const messageNode = template.cloneNode(true);
  document.body.appendChild(messageNode);

  const closeButtonNode = messageNode.querySelector(buttonClass);

  const handlers = {};

  handlers.onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      handlers.closeMessage();
    }
  };

  handlers.onOutsideClick = (evt) => {
    if (evt.target === messageNode) {
      handlers.closeMessage();
    }
  };

  handlers.closeMessage = () => {
    messageNode.remove();
    document.removeEventListener('keydown', handlers.onEscKeydown, true);
    document.removeEventListener('click', handlers.onOutsideClick);
  };

  closeButtonNode.addEventListener('click', handlers.closeMessage);
  document.addEventListener('keydown', handlers.onEscKeydown, true);
  document.addEventListener('click', handlers.onOutsideClick);
};

const showSuccessMessage = () => {
  showMessage(successTemplateNode, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorTemplateNode, '.error__button');
};

export { showDataLoadError, showSuccessMessage, showErrorMessage };
