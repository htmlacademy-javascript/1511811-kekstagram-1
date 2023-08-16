import {
  getRandomArrayElement,
  getRandomInteger
} from './util.js';

const AMOUNTOFPOSTS = 25;
const MINLIKESAMOUNT = 15;
const MAXLIKESAMOUNT = 200;
const MINAVATARNUMBER = 1;
const MAXAVATARNUMBER = 6;
const MINIDNUMBERCOMMENTUSER = 1;
const MAXIDNUMBERCOMMENTUSER = 50;
const MINCOMMENTUSERAMOUNT = 0;
const MAXCOMMENTUSERAMOUNT = 15;

const description = [
  'Лицо человека, вышедшего из матрицы',
  'В этот день родили меня на свет...',
  'Если не поставишь лайк, я тебя найду!',
  'Аниме, пацаны?',
  'Тот момент, когда не ожидаешь',
  'Просто вчера на все 100',
  'Подумал, что не хватит, купил ещё',
  'Мой лучший друг идиот',
  'Не поделили еду с котом',
];

const comment = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const createCommentUser = () => ({
  id: getRandomInteger(MINIDNUMBERCOMMENTUSER, MAXIDNUMBERCOMMENTUSER),
  avatar: `img/avatar-${getRandomInteger(MINAVATARNUMBER, MAXAVATARNUMBER)}.svg`,
  message: getRandomArrayElement(comment),
  name: getRandomArrayElement(names),
});

const userComments = Array.from({length: getRandomInteger(MINCOMMENTUSERAMOUNT, MAXCOMMENTUSERAMOUNT)},
  createCommentUser);

const posts = new Array(AMOUNTOFPOSTS).fill(1).map((currentValue, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(description),
  likes: getRandomInteger(MINLIKESAMOUNT, MAXLIKESAMOUNT),
  comments: userComments,
}));

export {posts};
