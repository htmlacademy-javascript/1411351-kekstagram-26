const effects = {
  'NONE': {
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    effect: '',
    effectUnit: '',
  },
  'CHROME': {
    min: 0,
    max: 1,
    start: 0,
    step: 0.1,
    effect: 'grayscale',
    effectUnit: '',
  },
  'SEPIA': {
    min: 0,
    max: 1,
    start: 0,
    step: 0.1,
    effect: 'sepia',
    effectUnit: '',
  },
  'MARVIN': {
    min: 0,
    max: 100,
    start: 0,
    step: 1,
    effect: 'invert',
    effectUnit: '%',
  },
  'PHOBOS': {
    min: 0,
    max: 3,
    start: 0,
    step: 0.1,
    effect: 'blur',
    effectUnit: 'px',
  },
  'HEAT': {
    min: 1,
    max: 3,
    start: 0,
    step: 0.1,
    effect: 'brightness',
    effectUnit: '',
  },
};

const effectLevelElement = document.querySelector('.img-upload__effect-level');
const sliderElement = effectLevelElement.querySelector('.effect-level__slider');
const effectsLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
const effectInputs = document.querySelectorAll('.effects__radio');
const imageUploadPreviewElement = document.querySelector('.img-upload__preview img');

let currentEffect = effects.NONE;
let currentEffectName;

const sliderUpdateHandler = () => {
  imageUploadPreviewElement.style.filter = 'none';
  imageUploadPreviewElement.classList.remove();
  effectsLevelValueElement.value = '';

  const sliderValue = sliderElement.noUiSlider.get();
  imageUploadPreviewElement.style.filter = `${currentEffect.effect}(${sliderValue}${currentEffect.effectUnit})`;
  imageUploadPreviewElement.classList.add(`effects__preview--${currentEffectName}`);
  effectsLevelValueElement.value = sliderValue;
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });

  if (currentEffect === effects.NONE) {
    effectLevelElement.classList.add('hidden');
  } else {
    effectLevelElement.classList.remove('hidden');
  }
};

const effectChangeHandler = (evt) => {
  currentEffectName = evt.target.value;
  currentEffect = currentEffectName.toUpperCase();
  currentEffect = effects[currentEffect];
  updateSlider();
};

const initPhotoEffectsSlider = () => {
  effectLevelElement.classList.add('hidden');

  noUiSlider.create(sliderElement, {
    range: {
      min: effects.NONE.min,
      max: effects.NONE.max,
    },
    start: effects.NONE.max,
    step: effects.NONE.step,
  });

  sliderElement.noUiSlider.on('update', sliderUpdateHandler);

  effectInputs.forEach((item) => {
    item.addEventListener('change', effectChangeHandler);
  });
};

const destroyPhotoEffectsSlider = () => {
  sliderElement.noUiSlider.destroy();
  effectInputs.forEach((item) => {
    item.removeEventListener('change', effectChangeHandler);
  });
};

export { initPhotoEffectsSlider, destroyPhotoEffectsSlider };
