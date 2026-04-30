import {
  hasValidHashtagCount,
  hasValidHashtagLength,
  hasValidHashtagFormat,
  hasUniqueHashtags
} from './check-hashtag-validity.js';

import { resetImageEditor } from './image-editor.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const MAX_COMMENT_LENGTH = 140;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const bodyNode = document.body;
const uploadFormNode = document.querySelector('.img-upload__form');
const uploadFileControl = uploadFormNode.querySelector('#upload-file');
const uploadOverlayNode = uploadFormNode.querySelector('.img-upload__overlay');
const uploadCancelButtonNode = uploadFormNode.querySelector('#upload-cancel');
const hashtagsInputNode = uploadFormNode.querySelector('.text__hashtags');
const descriptionInputNode = uploadFormNode.querySelector('.text__description');
const submitButtonNode = uploadFormNode.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadFormNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const isEscapeKey = (evt) => evt.key === 'Escape';

const hasValidCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const toggleSubmitButton = (isDisabled) => {
  submitButtonNode.disabled = isDisabled;
  submitButtonNode.textContent = isDisabled
    ? SubmitButtonText.SENDING
    : SubmitButtonText.IDLE;
};

const resetUploadPhotoForm = () => {
  uploadFormNode.reset();
  uploadFileControl.value = '';
  pristine.reset();
  resetImageEditor();
};

const stopEscapePropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadOverlayNode.classList.add('hidden');
    bodyNode.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
    resetUploadPhotoForm();
  }
};

const openUploadPhotoForm = () => {
  uploadOverlayNode.classList.remove('hidden');
  bodyNode.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadPhotoForm = () => {
  uploadOverlayNode.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetUploadPhotoForm();
};

const onUploadFileControlChange = () => {
  openUploadPhotoForm();
};

const onUploadCancelButtonClick = (evt) => {
  evt.preventDefault();
  closeUploadPhotoForm();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    toggleSubmitButton(true);

    sendData(new FormData(evt.target))
      .then(() => {
        closeUploadPhotoForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        toggleSubmitButton(false);
      });
  }
};

const onUploadFormReset = (evt) => {
  evt.preventDefault();
  closeUploadPhotoForm();
};

pristine.addValidator(
  hashtagsInputNode,
  hasValidHashtagFormat,
  'Хэштег должен начинаться с # и содержать только буквы и цифры'
);

pristine.addValidator(
  hashtagsInputNode,
  hasValidHashtagCount,
  'Нельзя указать больше пяти хэштегов'
);

pristine.addValidator(
  hashtagsInputNode,
  hasValidHashtagLength,
  'Максимальная длина одного хэштега — 20 символов'
);

pristine.addValidator(
  hashtagsInputNode,
  hasUniqueHashtags,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  descriptionInputNode,
  hasValidCommentLength,
  'Длина комментария не может составлять больше 140 символов'
);

const initUploadPhotoForm = () => {
  uploadFileControl.addEventListener('change', onUploadFileControlChange);
  uploadCancelButtonNode.addEventListener('click', onUploadCancelButtonClick);
  uploadFormNode.addEventListener('submit', onUploadFormSubmit);
  uploadFormNode.addEventListener('reset', onUploadFormReset);
  hashtagsInputNode.addEventListener('keydown', stopEscapePropagation);
  descriptionInputNode.addEventListener('keydown', stopEscapePropagation);
};

export { initUploadPhotoForm };
