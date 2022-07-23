import {getRandomPositiveInteger} from './util.js';

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const subscribers = [
  'Твитти',
  'Честер',
  'Мурка',
  'Киса',
  'Чикен',
  'Пётр'
];
let commentId = 1;

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: messages[getRandomPositiveInteger(0, messages.length - 1)],
  name: subscribers[getRandomPositiveInteger(0, subscribers.length - 1)]
});

const createPhoto = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: 'Котик моет лапки',
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({ length: getRandomPositiveInteger(0, 5) }, createComment)
});

const PHOTOS_COUNT = 25;

// Что это?
const gallery = Array.from({ length: PHOTOS_COUNT }, createPhoto);

export {gallery};
