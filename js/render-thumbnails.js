// import { photos } from './create-array-photos.js';
import { openBigPicture } from './full-size-picture.js';

const picturesNode = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

if (!picturesNode || !pictureTemplate) {
  throw new Error('Не найден контейнер .pictures или шаблон #picture');
}

const createPicture = ({id, url, description, comments, likes }) => {
  const pictureNode = pictureTemplate.cloneNode(true);

  pictureNode.dataset.pictureId = id;
  const imageNode = pictureNode.querySelector('.picture__img');
  imageNode.src = url;
  imageNode.alt = description;
  pictureNode.querySelector('.picture__likes').textContent = likes;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;

  pictureNode.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(id);
  });

  return pictureNode;
};

const renderThumbnails = (pictures) => {
  const picturesFragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    picturesFragment.appendChild(createPicture(photo));
  });

  picturesNode.appendChild(picturesFragment);
};

export { renderThumbnails };

