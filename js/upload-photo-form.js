import {
  hasValidHashtagCount,
  hasValidHashtagLength,
  hasValidHashtagFormat,
  hasUniqueHashtags
} from './check-hashtag-validity.js';

const MAX_COMMENT_LENGTH = 140;

const bodyNode = document.body;
const uploadFormNode = document.querySelector('.img-upload__form');
const uploadFileControl = uploadFormNode.querySelector('#upload-file');
const uploadOverlayNode = uploadFormNode.querySelector('.img-upload__overlay');
const uploadCancelButtonNode = uploadFormNode.querySelector('#upload-cancel');
const hashtagsInputNode = uploadFormNode.querySelector('.text__hashtags');
const descriptionInputNode = uploadFormNode.querySelector('.text__description');

const pristine = new Pristine(uploadFormNode, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const isEscapeKey = (evt) => evt.key === 'Escape';

const hasValidCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const resetUploadPhotoForm = () => {
  uploadFormNode.reset();
  uploadFileControl.value = '';
  pristine.reset();
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
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

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
  hasValidHashtagFormat,
  'Хэштег должен начинаться с # и содержать только буквы и цифры'
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
  hashtagsInputNode.addEventListener('keydown', stopEscapePropagation);
  descriptionInputNode.addEventListener('keydown', stopEscapePropagation);
};

export { initUploadPhotoForm };
