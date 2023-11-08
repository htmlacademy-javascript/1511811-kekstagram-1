import { body } from './picture.js';
import { resetScale } from './scale.js';
import { isEscapeKey } from './util.js';
import { resetEffects } from './effect.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SENDING = 'Отправляется';
const PUBLISH = 'Опубликовать';

const HASHTAG_MAX_COUNT = 5;
const DESCRIPTION_MAX_COUNT = 140;
const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';
const uploadForm = document.querySelector('.img-upload__form');
const editImageField = uploadForm.querySelector('.img-upload__overlay');
const uploadImageField = uploadForm.querySelector('.img-upload__input');
const buttonCloseUploadImageField = uploadForm.querySelector('.img-upload__cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const photoPreview = uploadForm.querySelector('.img-upload__preview img');
const formSubmitButton = uploadForm.querySelector('#upload-submit');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');
const successUploadImage = document.querySelector('#success').content.querySelector('.success');
const errorUploadImage = document.querySelector('#error').content.querySelector('.error');

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
  formSubmitButton.textContent = SENDING;
  formSubmitButton.disabled = true;
};

const resetBlockSubmitButton = () => {
  formSubmitButton.textContent = PUBLISH;
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

const onOpenUploadImageForm = () => {
  editImageField.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEsc);
};

const onCloseUploadImageForm = () => {
  resetForm();
  editImageField.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEsc);
};

uploadImageField.addEventListener('change', onOpenUploadImageForm);

buttonCloseUploadImageField.addEventListener('click', onCloseUploadImageForm);

const validateDescription = (value) => value.trim().length <= DESCRIPTION_MAX_COUNT;

const validateHashtag = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  if (hashtags.length > HASHTAG_MAX_COUNT) {
    return false;
  }

  const uniqueHashtag = new Set(hashtags);
  if (uniqueHashtag.size !== hashtags.length) {
    return false;
  }

  if (value === '') {
    return true;
  }

  const regex = /^#[a-zA-Zа-я0-9]{1,19}$/;
  const hasValidCharacters = hashtags.every((hashtagItem) => regex.test(hashtagItem));
  return hasValidCharacters;
};

const onStopPropagation = (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
};

hashtagField.addEventListener('keydown', (evt) => onStopPropagation(evt));

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

const removeSuccessPopup = () => {
  uploadForm.reset();
  successPopup.remove();
  editImageField.classList.add('hidden');
  document.removeEventListener('keydown', onUploadImagePopupEsc);
};

const openSuccessPopup = () => {
  const successButton = successPopup.querySelector('.success__button');
  body.append(successPopup);
  successButton.addEventListener('click', removeSuccessPopup);
};

const exitErrorPopup = () => {
  errorPopup.remove();
  document.removeEventListener('keydown', onUploadImagePopupEsc);
};

const openErrorPopup = () => {
  const errorButton = errorPopup.querySelector('.error__button');
  body.append(errorPopup);
  errorButton.addEventListener('click', exitErrorPopup);
};

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
