const UPLOAD_COMMENTS_STEP = 5;
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
const showCommentElement = socialCommentCountElement.firstChild;
let commentsCountForDisplay = 0;
let comments = [];
let commentCountEnd = UPLOAD_COMMENTS_STEP;

const documentKeydownHandler = (evt) => {
  if (evt.code === 'Escape') {
    closeBigPicture(evt);
  }
};

const generateComments = () => {
  const uploadComments = comments.slice(commentCountEnd - UPLOAD_COMMENTS_STEP, commentCountEnd);

  commentsCountForDisplay += uploadComments.length;
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

  commentCountEnd += UPLOAD_COMMENTS_STEP;

  if (commentsCountForDisplay === comments.length) {
    uploadCommentsElement.classList.add('hidden');
  } else {
    uploadCommentsElement.classList.remove('hidden');
  }
};

function closeBigPicture(evt) {
  evt.preventDefault();
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadCommentsElement.addEventListener('click', generateComments);
  closeBtnElement.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', documentKeydownHandler);
  commentCountEnd = UPLOAD_COMMENTS_STEP;
  commentsCountForDisplay = 0;
}

const openBigPicture = () => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCommentsElement.addEventListener('click', generateComments);
  closeBtnElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', documentKeydownHandler);
};

const generateBigPicture = (pictureData) => {
  imageElement.src = pictureData.url;
  likesImageElement.textContent = pictureData.likes;
  commentsCountElement.textContent = pictureData.comments.length;
  descriptionPicture.textContent = pictureData.description;
  commentContainer.innerHTML = '';
  comments = pictureData.comments;

  generateComments();
};

const bigPicture = (pictureData) => {
  generateBigPicture(pictureData);
  openBigPicture();
};

export { bigPicture };
