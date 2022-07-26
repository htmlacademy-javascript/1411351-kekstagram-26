import { generateMiniatures } from './miniature.js';
import { initForm } from './form.js';
import {fetchData} from './api.js';

fetchData((gallery) => {
  generateMiniatures(gallery);
});

initForm();
