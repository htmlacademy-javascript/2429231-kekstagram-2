import { photos } from './create-array-photos.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

if (!picturesContainer || !pictureTemplate) {
  throw new Error('Не найден контейнер .pictures или шаблон #picture');
}

const picturesFragment = document.createDocumentFragment();

const createPicture = ({ url, description, comments, likes }) => {
  const pictureNode = pictureTemplate.cloneNode(true);
  const imageNode = pictureNode.querySelector('.picture__img');
  imageNode.src = url;
  imageNode.alt = description;
  pictureNode.querySelector('.picture__likes').textContent = likes;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;

  return pictureNode;
};

photos.forEach((photo) => {
  picturesFragment.appendChild(createPicture(photo));
});

picturesContainer.appendChild(picturesFragment);

