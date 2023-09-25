import { posts } from './data.js';
import { isEscapeKey } from './util.js';
import { renderComments } from './comments.js';

const pictures = document.querySelector('.pictures');
const pictureUserTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');
const bigPicture = document.querySelector('.big-picture');
const modalPhoto = bigPicture.querySelector('#modalphoto');
const body = document.querySelector('body');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const photoDescription = document.querySelector('.social__caption');
const closeButtonBigPicture = bigPicture.querySelector('.big-picture__cancel');

const pictureListFragment = document.createDocumentFragment();

const onBigPictureEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

posts.forEach((post) => {
  const pictureElement = pictureUserTemplate.cloneNode(true);
  pictureElement.querySelector('img').setAttribute('src', post.url);
  pictureElement.querySelector('img').setAttribute('alt', post.description);
  pictureElement.querySelector('.picture__likes').textContent = post.likes;
  const comments = pictureElement.querySelector('.picture__comments');
  comments.textContent = post.comments.length;

  pictureElement.addEventListener('click', () => {
    modalPhoto.src = post.url;
    likesCount.textContent = post.likes;
    commentsCount.textContent = post.comments.length;
    photoDescription.textContent = post.description;
    renderComments(post.comments.slice(0, 5));
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.addEventListener('keydown', onBigPictureEscKeyDown);
  });
  pictureListFragment.appendChild(pictureElement);
});
pictures.appendChild(pictureListFragment);

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
};

closeButtonBigPicture.addEventListener('click', () => {
  closeBigPicture();
});
