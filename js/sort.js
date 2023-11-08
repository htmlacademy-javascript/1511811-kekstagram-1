import { debounce } from './util.js';
import { renderPost } from './picture.js';

const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const handleFilterClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  //проверяем изменился ли фильтр
  const clickedButton = evt.target;
  if (clickedButton.id === currentFilter) {
    return;
  }

  filterElement
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;
  renderPost(getFilteredPictures());
};

const debauncedHandleFilterClick = debounce(handleFilterClick);

filterElement.addEventListener('click', debauncedHandleFilterClick);

const initFilter = (posts) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...posts];
};

export {
  initFilter,
  getFilteredPictures,
};
