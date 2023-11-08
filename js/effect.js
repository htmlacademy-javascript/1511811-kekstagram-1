const EFFECTS = [{
  name: 'none',
  style: 'none',
  min: 0,
  max: 100,
  step: 1,
  unit: '',
},
{
  name: 'chrome',
  style: 'grayscale',
  min: 0,
  max: 1,
  step: 0.1,
  unit: '',
},
{
  name: 'sepia',
  style: 'sepia',
  min: 0,
  max: 1,
  step: 0.1,
  unit: '',
},
{
  name: 'marvin',
  style: 'invert',
  min: 0,
  max: 100,
  step: 1,
  unit: '%',
},
{
  name: 'phobos',
  style: 'blur',
  min: 0,
  max: 3,
  step: 0.1,
  unit: 'px',
},
{
  name: 'heat',
  style: 'brightness',
  min: 1,
  max: 3,
  step: 0.1,
  unit: '',
},
];
const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const formElement = document.querySelector('.img-upload__form');
const imageElement = formElement.querySelector('.img-upload__preview img');
const effectsElement = formElement.querySelector('.effects');
const sliderElement = formElement.querySelector('.effect-level__slider');
const effectLevelElement = formElement.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    sliderElement.classList.add('hidden');
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imageElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  imageElement.style.filter = 'none';
  imageElement.className = '';
  effectLevelElement.value = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  imageElement.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
updateSlider();

formElement.addEventListener('change', onEffectsChange);
effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {
  resetEffects
};
