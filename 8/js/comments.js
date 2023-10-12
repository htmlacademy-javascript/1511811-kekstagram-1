const COMMENTS_STEP = 5;

let commentsShown = 0;
let comments = [];

//куда вставлять комментарии
const commContainer = document.querySelector('.social__comments');
//доступ к шаблону списка комментариев
const commTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');


//Создает комментарий
const renderComment = (comment, listFragment) => {
  const comElement = commTemplate.cloneNode(true);
  comElement.querySelector('.social__picture').src = comment.avatar;
  comElement.querySelector('.social__picture').alt = comment.name;
  comElement.querySelector('.social__text').textContent = comment.message;
  listFragment.appendChild(comElement);
};

const renderComments = () => {
  const listFragment = document.createDocumentFragment();
  comments.slice(0, commentsShown).forEach((comment) => { //проходим по массиву с комментариями и рендерим комменты
    renderComment(comment, listFragment);
  });
  commContainer.replaceChildren(); //обнуляем комменты
  commContainer.appendChild(listFragment); //в контейнер ставим фрагмент с комментами
};

const hideShowMoreButton = () => {
  commentsLoader.classList.add('hidden');
};

const showMoreButton = () => {
  commentsLoader.classList.remove('hidden');
};

const setVisibleCommentsText = () => {
  commentsCount.textContent = `${commentsShown} из ${comments.length} комментариев`;
};

const setComments = (post) => {
  comments = post.comments;
};

const onCommentsLoaderClick = () => {
  commentsShown += COMMENTS_STEP;
  if (commentsShown >= comments.length) {
    hideShowMoreButton();
    commentsShown = comments.length;
  } else {
    showMoreButton();
  }
  renderComments();
  setVisibleCommentsText();
};

const resetCommentShown = () => {
  commentsShown = 0;
};

commentsLoader.addEventListener('click', onCommentsLoaderClick);

export {
  setVisibleCommentsText,
  resetCommentShown,
  setComments,
  onCommentsLoaderClick
};
