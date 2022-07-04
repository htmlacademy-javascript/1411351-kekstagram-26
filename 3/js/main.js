// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger (a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// function checkStringLength (string, length) {
//   return string.length <= length;
// }

const galery = [];
const idPhoto = 25;
const comments = [];
const idComments = 6;
const message = [
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

for (let i = 0; i <= idComments - 1; i++) {
  comments[i] = {
    'id': getRandomPositiveInteger(1, 6),
    'avatar': 'img/avatar-' + String(getRandomPositiveInteger(1, 6)) + '.svg',
    'message': message[getRandomPositiveInteger(0, message.length - 1)],
    'name': subscribers[getRandomPositiveInteger(0, subscribers.length - 1)]
  }
}

for (let i = 0; i <= idPhoto - 1; i++) {
  galery[i] = {
    'id': i + 1,
    'url': 'photos/' + String(i + 1) + '.jpg',
    'description': 'Котик моет лапки',
    'likes': getRandomPositiveInteger(15, 200),
    'comments': comments[getRandomPositiveInteger(0, comments.length - 1)]
  }
}
