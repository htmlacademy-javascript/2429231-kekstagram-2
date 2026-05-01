import { renderThumbnails } from './render-thumbnails.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersSection = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

let currentFilter = FilterId.DEFAULT;
let photos = [];

const getRandomPhotos = (photosArray) => {
  const shuffled = [...photosArray].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photosArray) =>
  [...photosArray].sort((a, b) => b.comments.length - a.comments.length);

const filterPhotos = () => {
  switch (currentFilter) {
    case FilterId.RANDOM:
      return getRandomPhotos(photos);
    case FilterId.DISCUSSED:
      return getDiscussedPhotos(photos);
    default:
      return [...photos];
  }
};

const updateActiveButton = (clickedButton) => {
  const activeButton = filtersForm.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (activeButton) {
    activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
  }
  clickedButton.classList.add(ACTIVE_BUTTON_CLASS);
};

const debouncedRenderThumbnails = debounce(
  () => renderThumbnails(filterPhotos()),
  RERENDER_DELAY
);

const onFilterButtonClick = (evt) => {
  const clickedButton = evt.target.closest('.img-filters__button');

  if (!clickedButton) {
    return;
  }

  if (clickedButton.id === currentFilter) {
    return;
  }

  currentFilter = clickedButton.id;
  updateActiveButton(clickedButton);
  debouncedRenderThumbnails();
};

const showFilters = () => {
  filtersSection.classList.remove('img-filters--inactive');
};

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;
  showFilters();
  filtersForm.addEventListener('click', onFilterButtonClick);
};

export { initFilters };
