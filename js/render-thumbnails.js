import { photos } from './create-array-photos.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

photos.forEach(({ url, description, comments, likes }) => {
  const pictureNode = pictureTemplate.cloneNode(true);

  const imageNode = pictureNode.querySelector('.picture__img');
  imageNode.src = url;
  imageNode.alt = description;
  pictureNode.querySelector('.picture__likes').textContent = likes;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.appendChild(pictureNode);
});

picturesContainer.appendChild(picturesFragment);
