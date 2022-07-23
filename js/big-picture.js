// Элементы
const bigPictureElement = document.querySelector('.big-picture');
const imageElement = bigPictureElement.querySelector('.big-picture__img > img');
const likesImageElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const descriptionPicture = bigPictureElement.querySelector('.social__caption');
const commentContainer = bigPictureElement.querySelector('ul.social__comments');
const commentTemplate = commentContainer.children[0].cloneNode(true);
const closeBtnElement = bigPictureElement.querySelector('.big-picture__cancel');
// Открытие bigPicture
const closeBigPicture = (evt) => {
  evt.preventDefault();
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeBtnElement.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', isEscape);
};

// Функция проверки Esc
const isEscape = (evt) => {
  if (evt.code === 'Escape') {
    closeBigPicture(evt);
  }
};

// Открытие bigPicture
const openBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeBtnElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', isEscape);
}

// Генерация комментариев
const generateComments = (comments)=> {
  // Очистили ul
  commentContainer.innerHTML = '';

  comments.forEach(comment => {
    const socialCommentLi = commentTemplate.cloneNode(true);
    const imageComment = socialCommentLi.querySelector('.social__picture');
    const textComment = socialCommentLi.querySelector('.social__text');
    imageComment.src = comment.avatar;
    imageComment.alt = comment.name;
    textComment.textContent = comment.message;
    commentContainer.append(socialCommentLi);
  });
}

// Генерация bigPicture
const generateBigPicture = (pictureData) => {
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  imageElement.src = pictureData.url;
  likesImageElement.textContent = pictureData.likes;
  commentsCountElement.textContent = pictureData.comments.length;
  descriptionPicture.textContent = pictureData.description;
  generateComments(pictureData.comments, pictureData.description)
}

const bigPicture = (pictureData) => {
  generateBigPicture(pictureData);
  openBigPicture();
}

export { bigPicture };
