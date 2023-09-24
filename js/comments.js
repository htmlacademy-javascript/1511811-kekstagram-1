//куда вставлять комментарии
const commContainer = document.querySelector('.social__comments');
//доступ к шаблону списка комментариев
const commTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

//Создает комментарий
const renderComment = (comment, listFragment) => {
  const comElement = commTemplate.cloneNode(true);
  comElement.querySelector('.social__picture').src = comment.avatar;
  comElement.querySelector('.social__picture').alt = comment.name;
  comElement.querySelector('.social__text').textContent = comment.message;
  listFragment.appendChild(comElement);
};

const renderComments = (comments) => {
  const listFragment = document.createDocumentFragment();
  comments.forEach((comment) => { //проходим по массиву с комментариями и рендерим комменты
    renderComment(comment, listFragment);
  });
  commContainer.replaceChildren(); //обнуляем комменты
  commContainer.appendChild(listFragment); //в контейнер ставим фрагмент с комментами
};

export {
  renderComments,
};
