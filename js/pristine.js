const imgUploadForm = document.querySelector('.img-upload__overlay');
const hashTagElement = imgUploadForm.querySelector('.text__hashtags');
const commentElement = imgUploadForm.querySelector('.text__description');

// Подключение Pristine
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

const validateStringLength = (str, maxLength = 140) => str.length <= maxLength;

const validateHashTagsNames = (str) => {
  if (str.length > 0) {
    const tagsArray = str.split(' ');
    return(tagsArray.every((hashTag) => /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(hashTag)));
  }
  return(true);
};

const validateMaxHashTags = (str) => {
  const tagsItems = str.split(' ');
  return (tagsItems.length <= 5);
};

const validateHashTagRepeats = (str) => {
  const hashTags = str.trim().toLowerCase().split(' ');
  return !hashTags.some(
    (hash) => hashTags.indexOf(hash) !== hashTags.lastIndexOf(hash)
  );
};

pristine.addValidator(
  hashTagElement,
  validateHashTagsNames,
  'Хэш-тег должен начинается с символа #, состоять из букв и чисел, не содержать пробелы и спецсимволы'
);

pristine.addValidator(
  hashTagElement,
  validateMaxHashTags,
  'Нельзя указать больше пяти хэш-тегов'
);

pristine.addValidator(
  hashTagElement,
  validateHashTagRepeats,
  'Один и тот же хэш-тег не может быть использован дважды'
);

pristine.addValidator(
  commentElement,
  validateStringLength,
  'Длина комментария не может составлять больше 140 символов'
);

export { pristine };
