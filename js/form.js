import { pristine } from './pristine.js';

// Элементы
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('#upload-select-image');
const closeButtonElement = imgUploadOverlay.querySelector('#upload-cancel');
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
      closeButtonClickHandler(evt);
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

const formSubmitHandler = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
    // alert('Форма заполнена неверно');
  }
};

function closeButtonClickHandler() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  pristine.reset();
  closeButtonElement.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
  imgUploadForm.removeEventListener('submit', formSubmitHandler);
  hashTagElement.removeEventListener('focus', focusAddBlurHandler);
  commentElement.removeEventListener('focus', focusAddBlurHandler);
  uploadInputElement.value = '';
}

const uploadInputChangeHandler = () => {
  // .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  imgUploadForm.addEventListener('submit', formSubmitHandler);
  hashTagElement.addEventListener('focus', focusAddBlurHandler);
  commentElement.addEventListener('focus', focusAddBlurHandler);
};

const initForm = () => {
  // При событии change у инпута #upload-file вызывается функция openForm
  uploadInputElement.addEventListener('change', uploadInputChangeHandler);
};

export { initForm };
