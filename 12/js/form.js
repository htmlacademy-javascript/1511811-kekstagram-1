import { body } from './picture.js';
import { resetScale } from './scale.js';
import { isEscapeKey } from './util.js';
import { resetEffects } from './effect.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const HASHTAG_MAX_COUNT = 5;
const DESCRIPTION_MAX_COUNT = 140;
const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';
const uploadForm = document.querySelector('.img-upload__form');
const editImageField = document.querySelector('.img-upload__overlay');
const uploadImageField = document.querySelector('.img-upload__input');
const buttonCloseUploadImageField = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const photoPreview = document.querySelector('.img-upload__preview img');
const formSubmitButton = document.querySelector('#upload-submit');
const successUploadImage = document.querySelector('#success').content.querySelector('.success');
const errorUploadImage = document.querySelector('#error').content.querySelector('.error');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'data-pristine-maxlength-message'
});

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  pristine.validate();
});

const blockSubmitButton = () => {
  formSubmitButton.textContent = 'Отправляется';
  formSubmitButton.disabled = true;
};

const resetBlockSubmitButton = () => {
  formSubmitButton.textContent = 'Опубликовать';
  formSubmitButton.disabled = false;
};

const onDocumentEsc = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    editImageField.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadForm.reset();
    pristine.reset();
    resetScale();
    resetEffects();
    resetBlockSubmitButton();
    document.removeEventListener('keydown', onDocumentEsc);
  }
};

const resetForm = () => {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  resetBlockSubmitButton();
};

//открытие формы редактирования изображения
const onOpenUploadImageForm = () => {
  editImageField.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEsc);
};

//закрытие формы редактирования изображения
const onCloseUploadImageForm = () => {
  resetForm();
  editImageField.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEsc);
};

uploadImageField.addEventListener('change', onOpenUploadImageForm);

buttonCloseUploadImageField.addEventListener('click', onCloseUploadImageForm);

//Валидация

//длина комментария не может составлять больше 140 символов;
const validateDescription = (value) => value.trim().length <= DESCRIPTION_MAX_COUNT;

//Проверяет количество хэштегов (не более пяти)
// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
const validateHashtag = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  if (hashtags.length > HASHTAG_MAX_COUNT) {
    return false;
  }

  //один и тот же хэш-тег не может быть использован дважды
  const uniqueHashtag = new Set(hashtags);
  if (uniqueHashtag.size !== hashtags.length) {
    return false;
  }

  //хэштег необязателен
  if (value === '') {
    return true;
  }

  // хэш-тег начинается с символа # (решётка);
  // хеш-тег не может состоять только из одной решётки;
  //строка после решётки должна состоять из букв и чисел и не может
  //содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации
  //(тире, дефис, запятая и т. п.), эмодзи и т. д.;
  // максимальная длина одного хэш-тега 20 символов, включая решётку;
  // хэш-теги разделяются пробелами;
  const regex = /^#[a-zA-Zа-я0-9]{1,19}$/;
  const hasValidCharacters = hashtags.every((hashtagItem) => regex.test(hashtagItem));
  return hasValidCharacters;
};

const onStopPropagation = (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
};

// если фокус находится в поле ввода хэш-тега, нажатие на Esc
//не должно приводить к закрытию формы редактирования изображения.
hashtagField.addEventListener('keydown', (evt) => onStopPropagation(evt));

//если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить
//к закрытию формы редактирования изображения.
descriptionField.addEventListener('keydown', (evt) => onStopPropagation(evt));

pristine.addValidator(descriptionField, validateDescription);
pristine.addValidator(hashtagField, validateHashtag, TAG_ERROR_TEXT);

const errorPopup = errorUploadImage.cloneNode(true);
const successPopup = successUploadImage.cloneNode(true);

const onUploadImagePopupEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorPopup.remove();
  }
};

//убирает окно с успешной загрузкой
const removeSuccessPopup = () => {
  uploadForm.reset();
  successPopup.remove();
  editImageField.classList.add('hidden');
  document.removeEventListener('keydown', onUploadImagePopupEsc);
};

//открывает окно с успешной загрузкой
const openSuccessPopup = () => {
  const successButton = successPopup.querySelector('.success__button');
  body.append(successPopup);
  successButton.addEventListener('click', removeSuccessPopup);
};

//убирает окно с ошибкой загрузки
const exitErrorPopup = () => {
  errorPopup.remove();
  document.removeEventListener('keydown', onUploadImagePopupEsc);
};

//открывает окно с ошибкой загрузки
const openErrorPopup = () => {
  const errorButton = errorPopup.querySelector('.error__button');
  body.append(errorPopup);
  errorButton.addEventListener('click', exitErrorPopup);
};

//проверка загруженной для редактирования формы
uploadForm.addEventListener('submit', (evt) =>{
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    const data = new FormData(uploadForm);
    blockSubmitButton();
    sendData(data)
      .then(() => {
        openSuccessPopup();
        resetForm();
      });
  } else {
    openErrorPopup();
    resetBlockSubmitButton();
  }
});

//загружает фотографию выбранную пользователем
uploadImageField.addEventListener('change', () => {
  const file = uploadImageField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
});


export {photoPreview};
