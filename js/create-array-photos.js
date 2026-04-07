
import { getRandomInteger, getRandomUniqieId, getRandomArrayElement } from './util.js';
import { getDataArrayPhotos } from './data.js';

const LIKES_RANGE = {
  MIN: 15,
  MAX: 200,
};

const PHOTO_ARRAY_SIZE = 25;
const { MESSAGES, NAMES, DESCRIPTIONS } = getDataArrayPhotos();


//Функция создания фабрики для генерации комментариев
const createCommentFactory = () => {
  let commentIdCounter = 1;
  //Возвращает массив случайных комментариев (1-2 комментария)
  return () => {
    const numSentences = getRandomInteger(1, 2);
    const sentences = Array.from({length: numSentences}, () => getRandomArrayElement(MESSAGES));
    //Возвращает объект - комментарий
    return {
      id: commentIdCounter++,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: sentences.join(' '),
      name: getRandomArrayElement(NAMES)
    };
  };
};

const createComment = createCommentFactory();


const getPhotoId = getRandomUniqieId(1, 25);
const getNumberPhoto = getRandomUniqieId(1, 25);

//Функция создания объекта - описание фото
const createPhotoDescription = () => ({
  id: getPhotoId(),
  url: `photos/${getNumberPhoto()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_RANGE.MIN, LIKES_RANGE.MAX),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComment),
});

//Функция создания массива из 25 объектов
const getArrayPhotos = () => Array.from({ length: PHOTO_ARRAY_SIZE }, createPhotoDescription);
const photos = getArrayPhotos();
export { photos };
