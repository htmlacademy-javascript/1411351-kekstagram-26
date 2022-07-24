import { formValidation } from './form-validation.js';
import { pristine } from './pristine.js';

// Элементы
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('#upload-select-image');
const closeBtnElement = imgUploadOverlay.querySelector('#upload-cancel');
const body = document.querySelector('body');
const uploadInputElement = document.querySelector('#upload-file');
const hashTagElement = imgUploadForm.querySelector('.text__hashtags');
const commentElement = imgUploadForm.querySelector('.text__description');

const isFocus = () => hashTagElement.classList.contains('_focus-element') || commentElement.classList.contains('_focus-element');

// Функция проверки Esc
const documentKeydownHandler = (evt) => {
  if (evt.code === 'Escape') {
    if (isFocus()) {
      evt.preventDefault();
    } else {
      closeForm(evt);
    }
  }
};

function onFocus(evt) {
  evt.target.classList.add('_focus-element');
  evt.target.addEventListener('blur', onBlur);
}

function onBlur(evt) {
  evt.target.classList.remove('_focus-element');
  evt.target.removeEventListener('blur', onBlur);
}

function closeForm() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  pristine.reset();
  closeBtnElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', documentKeydownHandler);
  imgUploadForm.removeEventListener('submit', formValidation);
  hashTagElement.removeEventListener('focus', onFocus);
  commentElement.removeEventListener('focus', onFocus);
  uploadInputElement.value = '';
}

const openForm = () => {
  // .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  closeBtnElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', documentKeydownHandler);
  imgUploadForm.addEventListener('submit', formValidation);
  hashTagElement.addEventListener('focus', onFocus);
  commentElement.addEventListener('focus', onFocus);
};

const formInit = () => {
  // При событии change у инпута #upload-file вызывается функция openForm
  uploadInputElement.addEventListener('change', openForm);
};

export { formInit };
