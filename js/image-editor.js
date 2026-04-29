const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const DEFAULT_EFFECT = 'none';

const effectsConfig = {
  none: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    filter: '',
    unit: ''
  },
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: ''
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: 'sepia',
    unit: ''
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    filter: 'invert',
    unit: '%'
  },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px'
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    filter: 'brightness',
    unit: ''
  }
};

const uploadFormNode = document.querySelector('.img-upload__form');
const previewImageNode = uploadFormNode.querySelector('.img-upload__preview img');

const scaleValueNode = uploadFormNode.querySelector('.scale__control--value');
const scaleSmallerButtonNode = uploadFormNode.querySelector('.scale__control--smaller');
const scaleBiggerButtonNode = uploadFormNode.querySelector('.scale__control--bigger');

const effectsListNode = uploadFormNode.querySelector('.effects__list');
const effectLevelNode = uploadFormNode.querySelector('.img-upload__effect-level');
const effectLevelSliderNode = uploadFormNode.querySelector('.effect-level__slider');
const effectLevelValueNode = uploadFormNode.querySelector('.effect-level__value');

const hideEffectSlider = () => {
  effectLevelNode.classList.add('hidden');
};

const showEffectSlider = () => {
  effectLevelNode.classList.remove('hidden');
};

const applyScale = (scaleValue) => {
  scaleValueNode.value = `${scaleValue}%`;
  previewImageNode.style.transform = `scale(${scaleValue / 100})`;
};

const getScaleValue = () => parseInt(scaleValueNode.value, 10);

const getSelectedEffect = () =>
  uploadFormNode.querySelector('.effects__radio:checked').value;

const applyEffect = (effectName, effectValue) => {
  const currentEffect = effectsConfig[effectName];

  if (effectName === DEFAULT_EFFECT) {
    previewImageNode.style.filter = '';
    effectLevelValueNode.value = '';
    hideEffectSlider();
    return;
  }

  previewImageNode.style.filter = `${currentEffect.filter}(${effectValue}${currentEffect.unit})`;
  effectLevelValueNode.value = effectValue;
  showEffectSlider();
};

const updateSliderOptions = (effectName) => {
  const currentEffect = effectsConfig[effectName];

  effectLevelSliderNode.noUiSlider.updateOptions({
    range: currentEffect.range,
    start: currentEffect.start,
    step: currentEffect.step
  });

  effectLevelSliderNode.noUiSlider.set(currentEffect.start);
};

const onScaleSmallerButtonClick = () => {
  const newScaleValue = Math.max(getScaleValue() - SCALE_STEP, MIN_SCALE);
  applyScale(newScaleValue);
};

const onScaleBiggerButtonClick = () => {
  const newScaleValue = Math.min(getScaleValue() + SCALE_STEP, MAX_SCALE);
  applyScale(newScaleValue);
};

const onEffectsListChange = (evt) => {
  if (!evt.target.matches('.effects__radio')) {
    return;
  }

  updateSliderOptions(evt.target.value);
};

const onEffectLevelSliderUpdate = () => {
  const selectedEffectName = getSelectedEffect();
  const sliderValue = Number(effectLevelSliderNode.noUiSlider.get());

  applyEffect(selectedEffectName, sliderValue);
};

const resetImageEditor = () => {
  applyScale(DEFAULT_SCALE);
  uploadFormNode.querySelector('#effect-none').checked = true;
  previewImageNode.style.filter = '';
  effectLevelValueNode.value = '';
  hideEffectSlider();

  effectLevelSliderNode.noUiSlider.updateOptions({
    range: effectsConfig[DEFAULT_EFFECT].range,
    start: effectsConfig[DEFAULT_EFFECT].start,
    step: effectsConfig[DEFAULT_EFFECT].step
  });

  effectLevelSliderNode.noUiSlider.set(effectsConfig[DEFAULT_EFFECT].start);
};

const initImageEditor = () => {
  applyScale(DEFAULT_SCALE);

  if (!effectLevelSliderNode.noUiSlider) {
    noUiSlider.create(effectLevelSliderNode, {
      range: effectsConfig[DEFAULT_EFFECT].range,
      start: effectsConfig[DEFAULT_EFFECT].start,
      step: effectsConfig[DEFAULT_EFFECT].step,
      connect: 'lower'
    });

    effectLevelSliderNode.noUiSlider.on('update', onEffectLevelSliderUpdate);
  }

  hideEffectSlider();

  scaleSmallerButtonNode.addEventListener('click', onScaleSmallerButtonClick);
  scaleBiggerButtonNode.addEventListener('click', onScaleBiggerButtonClick);
  effectsListNode.addEventListener('change', onEffectsListChange);
};

export { initImageEditor, resetImageEditor };
