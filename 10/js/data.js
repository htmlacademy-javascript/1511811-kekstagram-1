// import {
//   getRandomArrayElement,
//   getRandomInteger
// } from './util.js';

// const AMOUNT_OF_POSTS = 25;
// const MIN_LIKES_AMOUNT = 15;
// const MAX_LIKES_AMOUNT = 200;
// const MIN_AVATAR_NUMBER = 1;
// const MAX_AVATAR_NUMBER = 6;
// const MIN_ID_NUMBER_COMMENT_USER = 1;
// const MAX_ID_NUMBER_COMMENT_USER = 50;
// const MIN_COMMENT_USER_AMOUNT = 0;
// const MAX_COMMENT_USER_AMOUNT = 20;

// const description = [
//   'Лицо человека, вышедшего из матрицы',
//   'В этот день родили меня на свет...',
//   'Если не поставишь лайк, я тебя найду!',
//   'Аниме, пацаны?',
//   'Тот момент, когда не ожидаешь',
//   'Просто вчера на все 100',
//   'Подумал, что не хватит, купил ещё',
//   'Мой лучший друг идиот',
//   'Не поделили еду с котом',
// ];

// const comment = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
// ];

// const names = [
//   'Иван',
//   'Хуан Себастьян',
//   'Мария',
//   'Кристоф',
//   'Виктор',
//   'Юлия',
//   'Люпита',
//   'Вашингтон',
// ];

// const createCommentUser = () => ({
//   id: getRandomInteger(MIN_ID_NUMBER_COMMENT_USER, MAX_ID_NUMBER_COMMENT_USER),
//   avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
//   message: getRandomArrayElement(comment),
//   name: getRandomArrayElement(names),
// });

// const userComments = Array.from({length: getRandomInteger(MIN_COMMENT_USER_AMOUNT, MAX_COMMENT_USER_AMOUNT)},
//   createCommentUser);

// const posts = new Array(AMOUNT_OF_POSTS).fill(1).map((currentValue, index) => ({
//   id: index + 1,
//   url: `photos/${index + 1}.jpg`,
//   description: getRandomArrayElement(description),
//   likes: getRandomInteger(MIN_LIKES_AMOUNT, MAX_LIKES_AMOUNT),
//   comments: userComments,
// }));

// export {posts};

// export {
//   AMOUNT_OF_POSTS,
//   MIN_LIKES_AMOUNT,
//   MAX_LIKES_AMOUNT,
//   MIN_AVATAR_NUMBER,
//   MAX_AVATAR_NUMBER,
//   MIN_COMMENT_USER_AMOUNT,
//   MAX_COMMENT_USER_AMOUNT,
//   MIN_ID_NUMBER_COMMENT_USER,
//   MAX_ID_NUMBER_COMMENT_USER,
//   description,
//   comment,
//   names
// };
