import { generateMiniatures } from './miniature.js';
import { initForm } from './form.js';
import { getData } from './api.js';
import { initImageFilters } from './filters.js';
import { debounce } from './util.js';

getData((gallery) => {
  initImageFilters(gallery, debounce(generateMiniatures));
  generateMiniatures(gallery);
});

initForm();
