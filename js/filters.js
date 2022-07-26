import {shuffle} from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

const filtersListElement = document.querySelector('.img-filters__form');
const filtersList = filtersListElement.querySelectorAll('.img-filters__button');
const imageFilters = document.querySelector('.img-filters');

const discussedFilterButton = filtersListElement.querySelector('#filter-discussed');
const defaultFilterButton = filtersListElement.querySelector('#filter-default');
const randomFilterButton = filtersListElement.querySelector('#filter-random');

const resetActiveFilter = () => {
  filtersList.forEach((item) => {
    item.classList.remove('img-filters__button--active');
  });
};

const sortByComments = (a, b) => b.comments.length - a.comments.length;

const initImageFilters = (gallery, generateMiniatures) => {
  imageFilters.classList.remove('img-filters--inactive');
  defaultFilterButton.addEventListener('click', () => {
    generateMiniatures(gallery);
    resetActiveFilter();
    defaultFilterButton.classList.add('img-filters__button--active');
  });
  discussedFilterButton.addEventListener('click', () => {
    generateMiniatures(gallery.slice().sort(sortByComments));
    resetActiveFilter();
    discussedFilterButton.classList.add('img-filters__button--active');
  });
  randomFilterButton.addEventListener('click', () => {
    generateMiniatures(shuffle(gallery).slice(0, RANDOM_PHOTOS_COUNT));
    resetActiveFilter();
    randomFilterButton.classList.add('img-filters__button--active');
  });
};

export { initImageFilters };
