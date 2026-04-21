const COUNT_STEP = 5;

const state = {
  currentCount: 0,
  comments: [],
};

const bigPictureNode = document.querySelector('.big-picture');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const commentsShownCountNode = bigPictureNode.querySelector('.social__comment-shown-count');
const commentsTotalCountNode = bigPictureNode.querySelector('.social__comment-total-count');
const socialCommentTemplate = socialCommentsNode.querySelector('.social__comment');
const commentsCountNode = bigPictureNode.querySelector('.social__comment-count');
const commentsLoaderNode = bigPictureNode.querySelector('.social__comments-loader');

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
  const nextComments = state.comments.slice(
    state.currentCount,
    state.currentCount + COUNT_STEP
  );

  nextComments.forEach((comment) => {
    socialCommentsFragment.appendChild(createComment(comment));
  });

  socialCommentsNode.appendChild(socialCommentsFragment);
  state.currentCount += nextComments.length;
  commentsShownCountNode.textContent = state.currentCount;
  commentsTotalCountNode.textContent = state.comments.length;

  if (state.currentCount >= state.comments.length) {
    commentsLoaderNode.classList.add('hidden');
  }
};

const clearComments = () => {
  state.currentCount = 0;
  state.comments = [];
  socialCommentsNode.innerHTML = '';
  commentsCountNode.classList.add('hidden');
  commentsLoaderNode.classList.add('hidden');
  commentsLoaderNode.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {
  state.comments = currentPhotoComments;
  state.currentCount = 0;
  socialCommentsNode.innerHTML = '';

  commentsCountNode.classList.remove('hidden');
  if (state.comments.length > COUNT_STEP) {
    commentsLoaderNode.classList.remove('hidden');
  } else {
    commentsLoaderNode.classList.add('hidden');
  }
  // commentsLoaderNode.classList.remove('hidden');

  commentsLoaderNode.removeEventListener('click', renderNextComments);
  commentsLoaderNode.addEventListener('click', renderNextComments);

  renderNextComments();
};

export {clearComments, renderComments};

