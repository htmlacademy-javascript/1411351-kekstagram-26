const picturesContainerElement = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const generateMiniPicture = (pictureData, miniPictureElement) => {
  // Генерируем путь картинки
  miniPictureElement.querySelector('.picture__img').src = pictureData.url;
  // Генерируем кол-во комментариев
  miniPictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;
  // Генерируем кол-во лайков
  miniPictureElement.querySelector('.picture__likes').textContent = pictureData.likes;
};

const generateMiniatures = (gallery) => {
  const picturesFragment = document.createDocumentFragment();

  // Gallery - 25 Array
  gallery.forEach((pictureData) => {
    // Клонируем шаблон
    const miniPictureElement = templatePicture.cloneNode(true);
    // Генерируем элемент на основе шаблона
    generateMiniPicture(pictureData, miniPictureElement);
    // Генерируем фрагмент
    picturesFragment.append(miniPictureElement);
  });

  picturesContainerElement.append(picturesFragment);
};

export { generateMiniatures };
