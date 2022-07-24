import { formValidation } from './form-validation.js';
import { pristine } from './pristine.js';

// Элементы
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('#upload-select-image');
const closeBtnElement = imgUploadOverlay.querySelector('#upload-cancel');
const body = document.querySelector('body');
const uploadInputElement = document.querySelector('#upload-file');

// Функция проверки Esc
const documentKeydownHandler = (evt) => {
  if (evt.code === 'Escape') {
    closeForm();
  }
};

function closeForm() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  pristine.reset();
  closeBtnElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', documentKeydownHandler);
  imgUploadForm.removeEventListener('submit', formValidation);
  uploadInputElement.value = '';
}

const openForm = () => {
  // .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  closeBtnElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', documentKeydownHandler);
  imgUploadForm.addEventListener('submit', formValidation);
};

const formInit = () => {
  // При событии change у инпута #upload-file вызывается функция openForm
  uploadInputElement.addEventListener('change', openForm);
};

export { formInit };
