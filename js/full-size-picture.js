import { photos } from './create-array-photos.js';

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img').querySelector('img');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const commentsShownCountNode = bigPictureNode.querySelector('.social__comment-shown-count');
const commentsTotalCountNode = bigPictureNode.querySelector('.social__comment-total-count');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment');
const commentsCaptionNode = bigPictureNode.querySelector('.social__caption');
const commentsCountNode = bigPictureNode.querySelector('.social__comment-count');
const commentsLoaderNode = bigPictureNode.querySelector('.social__comments-loader');
const bigPictureCancelNode = bigPictureNode.querySelector('.big-picture__cancel');

const createSocialComment = ({ avatar, name, message}) => {
  const socialCommentNode = socialCommentTemplate.cloneNode(true);

  const socialPictureNode = socialCommentNode.querySelector('.social__picture');
  socialPictureNode.src = avatar;
  socialPictureNode.alt = name;
  socialCommentNode.querySelector('.social__text').textContent = message;

  return socialCommentNode;
};

const renderComments = (comments) => {
  const socialCommentsFragment = document.createDocumentFragment();

  const appendComment = (comment) => {
    socialCommentsFragment.appendChild(createSocialComment(comment));
  };

  comments.forEach(appendComment);
  socialCommentsNode.innerHTML = '';
  socialCommentsNode.appendChild(socialCommentsFragment);
};

const closeBigPicture = () => {
  bigPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
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
  commentsShownCountNode.textContent = currentPhoto.comments.length;
  commentsTotalCountNode.textContent = currentPhoto.comments.length;
  commentsCaptionNode.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  commentsCountNode.classList.add('hidden');
  commentsLoaderNode.classList.add('hidden');

  bigPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

bigPictureCancelNode.addEventListener('click', onBigPictureCancelClick);

export {openBigPicture};
