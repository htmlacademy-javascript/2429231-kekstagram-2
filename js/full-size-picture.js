import { photos } from './create-array-photos.js';
import { clearComments, renderComments } from './render-comments.js';

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    clearComments();
    bigPictureNode.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeydown);
  }
};

const closeBigPicture = () => {
  clearComments();
  bigPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const onBigPictureCancelClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const openBigPicture = (pictureId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));
  if (!currentPhoto) {
    throw new Error('Фото не найдено');
  }

  bigPictureImgNode.src = currentPhoto.url;
  bigPictureImgNode.alt = currentPhoto.description;
  likesCountNode.textContent = currentPhoto.likes;
  commentsCaptionNode.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);

export {openBigPicture};
