import { isEscapeKey } from './util.js';
import {
  resetCommentShown,
  setComments,
  onCommentsLoaderClick
} from './comments.js';

const pictures = document.querySelector('.pictures');
const pictureUserTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');
const bigPicture = document.querySelector('.big-picture');
const modalPhoto = bigPicture.querySelector('#modalphoto');
const body = document.querySelector('body');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const photoDescription = bigPicture.querySelector('.social__caption');
const closeButtonBigPicture = bigPicture.querySelector('.big-picture__cancel');

const pictureListFragment = document.createDocumentFragment();

const onBigPictureEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const openBigPicture = (pictureElement, post) => {
  pictureElement.addEventListener('click', () => {
    modalPhoto.src = post.url;
    likesCount.textContent = post.likes;
    commentsCount.textContent = post.comments.length;
    photoDescription.textContent = post.description;
    resetCommentShown();
    setComments(post);
    onCommentsLoaderClick();
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscKeyDown);
  });
};

const removeAllPosts = () => {
  const renderedPosts = pictures.querySelectorAll('.picture');
  renderedPosts.forEach((renderedPost) => {
    pictures.removeChild(renderedPost);
  });
};

const renderPost = (posts) => {
  removeAllPosts();
  posts.forEach((post) => {
    const pictureElement = pictureUserTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = post.url;
    pictureElement.querySelector('img').alt = post.description;
    pictureElement.querySelector('.picture__likes').textContent = post.likes;
    pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
    openBigPicture(pictureElement, post);
    pictureListFragment.appendChild(pictureElement);
  });
  pictures.appendChild(pictureListFragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeyDown);
};

closeButtonBigPicture.addEventListener('click', closeBigPicture);

export {
  body,
  renderPost,
  pictures,
  pictureListFragment,
};
