
const imageElement = document.querySelector('.img-upload__preview');
const effectsList = document.querySelector('.effects__list');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');

//исходные значения и настройки слайдера
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },

  start: 100,
  connect: 'lower',
});

//получение эффекта
effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();
  sliderContainer.classList.add('hidden');

  if (effectsList.querySelector('#effect-chrome').checked) {
    sliderContainer.classList.remove('hidden');
    imageElement.style.filter = `grayscale(${effectSlider.noUiSlider.get()})`;
  } else if (effectsList.querySelector('#effect-sepia').checked) {
    sliderContainer.classList.remove('hidden');
    imageElement.style.filter = `sepia(${effectSlider.noUiSlider.get()})`;
  } else if (effectsList.querySelector('#effect-marvin').checked) {
    sliderContainer.classList.remove('hidden');
    imageElement.style.filter = `invert(${effectSlider.noUiSlider.get()}%)`;
  } else if (effectsList.querySelector('#effect-phobos').checked) {
    sliderContainer.classList.remove('hidden');
    imageElement.style.filter = `blur(${effectSlider.noUiSlider.get()}px)`;
  } else if (effectsList.querySelector('#effect-heat').checked) {
    sliderContainer.classList.remove('hidden');
    imageElement.style.filter = `brightness(${effectSlider.noUiSlider.get()})`;
  }
});

//применение слайдера на выбранном эффекте
effectsList.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');

  if (evt.target.id === 'effect-none') {
    imageElement.style.filter = 'initial';
    sliderContainer.classList.add('hidden');
  }

  const optionTypes = {
    'effect-chrome' : {
      range: {
        min: 0,
        max: 1,
      },

      start: 1,
      step: 0.1,
    },
    'effect-sepia' : {
      range: {
        min: 0,
        max: 1,
      },

      start: 1,
      step: 0.1,
    },
    'effect-marvin' : {
      range: {
        min: 0,
        max: 100,
      },

      start: 100,
      step: 1,
    },
    'effect-phobos' : {
      range: {
        min: 0,
        max: 3,
      },

      start: 3,
      step: 0.1,
    },
    'effect-heat' : {
      range: {
        min: 1,
        max: 3,
      },

      start: 3,
      step: 0.1,
    },
  };

  effectSlider.noUiSlider.updateOptions(optionTypes[evt.target.id]);
});

export {effectSlider};
