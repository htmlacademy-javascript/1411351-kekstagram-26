import { pristine } from './pristine.js';
import {destroyPhotoEffectsSlider, initPhotoEffectsSlider} from './effects.js';
import {sendData} from './api.js';
import {openErrorMessageModal, openSuccessMessageModal} from './messages.js';

const SCALE_CHANGE_STEP = 25;
const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// Элементы
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('#upload-select-image');
const closeButtonElement = imgUploadOverlay.querySelector('#upload-cancel');
const uploadInputElement = document.querySelector('#upload-file');
const hashTagElement = imgUploadForm.querySelector('.text__hashtags');
const commentElement = imgUploadForm.querySelector('.text__description');
const photoUploadButton = imgUploadForm.querySelector('#upload-submit');

const imageUploadPreviewElement = imgUploadForm.querySelector('.img-upload__preview img');
const buttonSmallerElement = imgUploadForm.querySelector('.scale__control--smaller');
const buttonBiggerElement = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValueElement = imgUploadForm.querySelector('.scale__control--value');

let scaleValue = SCALE_VALUE_MAX;

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
  evt.preventDefault();
  if (pristine.validate()) {
    photoUploadButton.disabled = true;
    sendData(
      () => {
        closeModal();
        photoUploadButton.disabled = false;
        openSuccessMessageModal();
      },
      () => {
        closeModal();
        photoUploadButton.disabled = false;
        openErrorMessageModal();
      },
      new FormData(evt.target),
    );
  }
};

function closeButtonClickHandler() {
  closeModal();
}

function closeModal() {
  destroyPhotoEffectsSlider();

  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  pristine.reset();
  closeButtonElement.removeEventListener('click', closeButtonClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
  imgUploadForm.removeEventListener('submit', formSubmitHandler);
  hashTagElement.removeEventListener('focus', focusAddBlurHandler);
  commentElement.removeEventListener('focus', focusAddBlurHandler);
  uploadInputElement.value = '';
}

const uploadInputChangeHandler = () => {
  initPhotoEffectsSlider();

  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imageUploadPreviewElement.src = URL.createObjectURL(file);
  }

  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  imgUploadForm.addEventListener('submit', formSubmitHandler);
  hashTagElement.addEventListener('focus', focusAddBlurHandler);
  commentElement.addEventListener('focus', focusAddBlurHandler);
  imageUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
};


const scaleDecreaseClickHandler = () => {
  if (scaleValue > SCALE_VALUE_MIN) {
    scaleValue -= SCALE_CHANGE_STEP;
    scaleControlValueElement.value = `${scaleValue}%`;
    imageUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
  }
};

const scaleIncreaseClickHandler = () => {
  if (scaleValue < SCALE_VALUE_MAX) {
    scaleValue += SCALE_CHANGE_STEP;
    scaleControlValueElement.value = `${scaleValue}%`;
    imageUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
  }
};

const initForm = () => {
  // При событии change у инпута #upload-file вызывается функция openForm
  uploadInputElement.addEventListener('change', uploadInputChangeHandler);
  scaleControlValueElement.value = `${scaleValue}%`;
  buttonSmallerElement.addEventListener('click', scaleDecreaseClickHandler);
  buttonBiggerElement.addEventListener('click', scaleIncreaseClickHandler);

};

export { initForm };
