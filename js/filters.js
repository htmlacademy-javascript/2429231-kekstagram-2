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

const filtersSectionNode = document.querySelector('.img-filters');
const filtersFormNode = document.querySelector('.img-filters__form');

let currentFilter = FilterId.DEFAULT;
let loadedPhotos = [];

const getRandomPhotos = (photos) => {
  const shuffledPhotos = [...photos];
  for (let i = shuffledPhotos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPhotos[i], shuffledPhotos[j]] = [shuffledPhotos[j], shuffledPhotos[i]];
  }
  return shuffledPhotos.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photos) =>
  [...photos].sort((a, b) => b.comments.length - a.comments.length);

const filterPhotos = () => {
  switch (currentFilter) {
    case FilterId.RANDOM:
      return getRandomPhotos(loadedPhotos);
    case FilterId.DISCUSSED:
      return getDiscussedPhotos(loadedPhotos);
    default:
      return [...loadedPhotos];
  }
};

const updateActiveButton = (clickedButtonNode) => {
  const activeButtonNode = filtersFormNode.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (activeButtonNode) {
    activeButtonNode.classList.remove(ACTIVE_BUTTON_CLASS);
  }
  clickedButtonNode.classList.add(ACTIVE_BUTTON_CLASS);
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
  filtersSectionNode.classList.remove('img-filters--inactive');
};

const initFilters = (photos) => {
  loadedPhotos = photos;
  showFilters();
  filtersFormNode.addEventListener('click', onFilterButtonClick);
};

export { initFilters };
