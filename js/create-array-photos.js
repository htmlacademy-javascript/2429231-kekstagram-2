
import { getRandomInteger, getRandomUniqueId, getRandomArrayElement } from './util.js';
import { getDataArrayPhotos } from './data.js';

const LIKES_RANGE = {
  MIN: 15,
  MAX: 200,
};

const COMMENT_SENTECES_RANGE = {
  MIN: 1,
  MAX: 2,
};

const AVATAR_RANGE = {
  MIN: 1,
  MAX: 6,
};

const PHOTO_ID_RANGE = {
  MIN: 1,
  MAX: 25,
};

const COMMENT_COUNT_RANGE = {
  MIN: 0,
  MAX: 30,
};

const PHOTO_ARRAY_SIZE = 25;
const { MESSAGES, NAMES, DESCRIPTIONS } = getDataArrayPhotos();

//Функция создания фабрики для генерации комментариев
const createCommentFactory = () => {
  let commentIdCounter = 1;
  //Возвращает массив случайных комментариев (1-2 комментария)
  return () => {
    const numSentences = getRandomInteger(
      COMMENT_SENTECES_RANGE.MIN,
      COMMENT_SENTECES_RANGE.MAX
    );
    const sentences = Array.from({length: numSentences}, () => getRandomArrayElement(MESSAGES));
    //Возвращает объект - комментарий
    return {
      id: commentIdCounter++,
      avatar: `img/avatar-${getRandomInteger(AVATAR_RANGE.MIN, AVATAR_RANGE.MAX)}.svg`,
      message: sentences.join(' '),
      name: getRandomArrayElement(NAMES)
    };
  };
};

const createComment = createCommentFactory();

const createPhotoId = getRandomUniqueId(PHOTO_ID_RANGE.MIN, PHOTO_ID_RANGE.MAX);

const createPhotoDescription = () => {
  const photoId = createPhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_RANGE.MIN, LIKES_RANGE.MAX),
    comments: Array.from(
      { length: getRandomInteger(COMMENT_COUNT_RANGE.MIN, COMMENT_COUNT_RANGE.MAX) },
      createComment
    ),
  };
};

//Функция создания массива из 25 объектов
const photos = Array.from({ length: PHOTO_ARRAY_SIZE }, createPhotoDescription);

export { photos };
