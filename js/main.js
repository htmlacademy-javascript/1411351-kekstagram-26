import { generateMiniatures } from './miniature.js';
import { initForm } from './form.js';
import { fetchData } from './api.js';
import { initImageFilters } from './filters.js';
import { debounce } from './util.js';

fetchData((gallery) => {
  initImageFilters(gallery, debounce(generateMiniatures));
  generateMiniatures(gallery);
});

initForm();
