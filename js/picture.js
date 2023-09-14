import { posts } from './data.js';

const pictures = document.querySelector('.pictures');
const pictureUserTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

posts.forEach((post) => {
  const pictureElement = pictureUserTemplate.cloneNode(true);
  pictureElement.querySelector('img').setAttribute('src', post.url);
  pictureElement.querySelector('img').setAttribute('alt', post.description);
  pictureElement.querySelector('.picture__likes').textContent = post.likes;
  pictureElement.querySelector('.picture__comments').textContent = post.comments.length;
  pictures.appendChild(pictureElement);
});

pictures.appendChild(pictureListFragment);
