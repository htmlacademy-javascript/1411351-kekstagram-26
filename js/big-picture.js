// Элементы
const bigPictureElement = document.querySelector('.big-picture');
const imageElement = bigPictureElement.querySelector('.big-picture__img > img');
const likesImageElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const descriptionPicture = bigPictureElement.querySelector('.social__caption');
const commentContainer = bigPictureElement.querySelector('ul.social__comments');
const commentTemplate = commentContainer.children[0].cloneNode(true);
const closeBtnElement = bigPictureElement.querySelector('.big-picture__cancel');
const uploadCommentsElement = bigPictureElement.querySelector('.comments-loader');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
// Счетчик в верстке в котором мы должны отображать сколько уже показано комментариев
const showCommentElement = socialCommentCountElement.firstChild;
// Счетчик показанных комментариев.
let commentsCountForDisplay = 0;
// Массив комментариев данного обьекта.
let comments = [];
// Шаг подгрузки комментариев
const UPLOAD_COMMENTS_STEP = 5;
let commentCountEnd = UPLOAD_COMMENTS_STEP;

// Функция проверки Esc
const documentKeydownHandler = (evt) => {
  if (evt.code === 'Escape') {
    closeBigPicture(evt);
  }
};

// Генерация комментариев
const generateComments = () => {
  const uploadComments = comments.slice(commentCountEnd - UPLOAD_COMMENTS_STEP, commentCountEnd);

  // Показатель уже показанных комментариев
  commentsCountForDisplay += uploadComments.length;
  // Обновляем счетчик в верстке
  showCommentElement.textContent = `${commentsCountForDisplay} из `;

  uploadComments.forEach((comment) => {
    const socialCommentLi = commentTemplate.cloneNode(true);
    const imageComment = socialCommentLi.querySelector('.social__picture');
    const textComment = socialCommentLi.querySelector('.social__text');
    imageComment.src = comment.avatar;
    imageComment.alt = comment.name;
    textComment.textContent = comment.message;
    commentContainer.append(socialCommentLi);
  });
  // Делаем сдвиг старт slice.
  commentCountEnd += UPLOAD_COMMENTS_STEP;

  // Скрытие кнопки загрузить при полной загрузке
  if (commentsCountForDisplay === comments.length) {
    uploadCommentsElement.classList.add('hidden');
  } else {
    uploadCommentsElement.classList.remove('hidden');
  }
};

// Закрытие bigPicture
function closeBigPicture(evt) {
  evt.preventDefault();
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadCommentsElement.addEventListener('click', generateComments);
  closeBtnElement.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', documentKeydownHandler);
  // Cбрасываем счетчики по умолчанию.
  commentCountEnd = UPLOAD_COMMENTS_STEP;
  commentsCountForDisplay = 0;
}


// Открытие bigPicture
const openBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCommentsElement.addEventListener('click', generateComments);
  closeBtnElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', documentKeydownHandler);
};

// Генерация bigPicture
const generateBigPicture = (pictureData) => {
  imageElement.src = pictureData.url;
  likesImageElement.textContent = pictureData.likes;
  commentsCountElement.textContent = pictureData.comments.length;
  descriptionPicture.textContent = pictureData.description;
  // Очистили ul
  commentContainer.innerHTML = '';
  // Положили массив с комментариями
  comments = pictureData.comments;

  // Вызываем функцию для начальной генерации комментариев
  generateComments();
};

const bigPicture = (pictureData) => {
  generateBigPicture(pictureData);
  openBigPicture();
};

export { bigPicture };
