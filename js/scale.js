import { photoPreview } from './form.js';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const scaleInputElement = modalElement.querySelector('.scale__control--value');
const smallerButtonElement = modalElement.querySelector ('.scale__control--smaller');
const biggerButtonElement = modalElement.querySelector('.scale__control--bigger');

const scaleImage = (value = DEFAULT_SCALE) => {
  photoPreview.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const getNewScaleValue = (button, currentValue) => {
  switch (button) {
    case biggerButtonElement:
      return Math.min(MAX_SCALE, currentValue + SCALE_STEP);
    case smallerButtonElement:
      return Math.max(MIN_SCALE, currentValue - SCALE_STEP);
  }
};

const onScalingButtonClick = (evt) => {
  const scaleValue = parseInt(scaleInputElement.value, 10);
  const newScaleValue = getNewScaleValue(evt.target, scaleValue);
  scaleInputElement.value = `${newScaleValue}%`;
  photoPreview.style.transform = `scale(${newScaleValue / 100})`;
};

smallerButtonElement.addEventListener('click', onScalingButtonClick);
biggerButtonElement.addEventListener('click', onScalingButtonClick);

const resetScale = () => scaleImage(DEFAULT_SCALE);

export{
  resetScale,
};
