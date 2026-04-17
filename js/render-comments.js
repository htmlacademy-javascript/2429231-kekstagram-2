const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPictureNode = document.querySelector('.big-picture');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const commentsShownCountNode = bigPictureNode.querySelector('.social__comment-shown-count');
const commentsTotalCountNode = bigPictureNode.querySelector('.social__comment-total-count');
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment');
const commentsCountNode = bigPictureNode.querySelector('.social__comment-count');
const commentsLoaderNode = bigPictureNode.querySelector('.social__comments-loader');
// socialCommentsNode.innerHTML = '';

const createComment = ({ avatar, name, message}) => {
  const socialCommentNode = socialCommentTemplate.cloneNode(true);
  const socialPictureNode = socialCommentNode.querySelector('.social__picture');

  socialPictureNode.src = avatar;
  socialPictureNode.alt = name;
  socialCommentNode.querySelector('.social__text').textContent = message;

  return socialCommentNode;
};

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const nextComments = comments.slice(currentCount, currentCount + COUNT_STEP);

  nextComments.forEach((comment) => {
    socialCommentsFragment.appendChild(createComment(comment));
  });

  socialCommentsNode.appendChild(socialCommentsFragment);
  currentCount += nextComments.length;
  commentsShownCountNode.textContent = currentCount;
  commentsTotalCountNode.textContent = comments.length;

  if (currentCount >= comments.length) {
    commentsLoaderNode.classList.add('hidden');
  }
};

const clearComments = () => {
  currentCount = 0;
  comments = [];
  socialCommentsNode.innerHTML = '';
  commentsCountNode.classList.add('hidden');
  commentsLoaderNode.classList.add('hidden');
  commentsLoaderNode.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  currentCount = 0;
  socialCommentsNode.innerHTML = '';

  commentsCountNode.classList.remove('hidden');
  commentsLoaderNode.classList.remove('hidden');

  commentsLoaderNode.removeEventListener('click', renderNextComments);
  commentsLoaderNode.addEventListener('click', renderNextComments);

  renderNextComments();
};

export {clearComments, renderComments};

