import { formValidation as validateForm } from './form-validation.js';
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

function focusAddBlurHandler(evt) {
  evt.target.classList.add('_focus-element');
  evt.target.addEventListener('blur', focusRemoveBlurHandler);
}

function focusRemoveBlurHandler(evt) {
  evt.target.classList.remove('_focus-element');
  evt.target.removeEventListener('blur', focusRemoveBlurHandler);
}

function closeForm() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  pristine.reset();
  closeBtnElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', documentKeydownHandler);
  imgUploadForm.removeEventListener('submit', validateForm);
  hashTagElement.removeEventListener('focus', focusAddBlurHandler);
  commentElement.removeEventListener('focus', focusAddBlurHandler);
  uploadInputElement.value = '';
}

const openForm = () => {
  // .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  closeBtnElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', documentKeydownHandler);
  imgUploadForm.addEventListener('submit', validateForm);
  hashTagElement.addEventListener('focus', focusAddBlurHandler);
  commentElement.addEventListener('focus', focusAddBlurHandler);
};

const initForm = () => {
  // При событии change у инпута #upload-file вызывается функция openForm
  uploadInputElement.addEventListener('change', openForm);
};

export { initForm };
