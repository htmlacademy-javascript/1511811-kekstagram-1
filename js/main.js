const AMOUNTOFPOSTS = 25;

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

const minLikesAmount = 15;
const maxLikesAmount = 200;
const minAvatarNUmber = 1;
const maxAvatarNumber = 6;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createCommentUser = () => ({
  id: getRandomInteger(1, 50),
  avatar: `img/avatar-${getRandomInteger(minAvatarNUmber, maxAvatarNumber)}.svg`,
  message: getRandomArrayElement(comment),
  name: getRandomArrayElement(names),
});

const userComments = Array.from({length: getRandomInteger(0, 15)}, createCommentUser);

const posts = new Array(AMOUNTOFPOSTS).fill(1).map((currentValue, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(description),
  likes: getRandomInteger(minLikesAmount, maxLikesAmount),
  comments: userComments,
}));

posts();
