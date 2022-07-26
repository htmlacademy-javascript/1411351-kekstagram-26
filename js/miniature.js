import { bigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const generateMiniPicture = (pictureData, miniPictureElement) => {
  miniPictureElement.querySelector('.picture__img').src = pictureData.url;
  miniPictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;
  miniPictureElement.querySelector('.picture__likes').textContent = pictureData.likes;
};

const generateMiniatures = (gallery) => {
  const picturesFragment = document.createDocumentFragment();

  gallery.forEach((pictureData) => {
    const miniPictureElement = templatePicture.cloneNode(true);
    generateMiniPicture(pictureData, miniPictureElement);
    picturesFragment.append(miniPictureElement);
    miniPictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      bigPicture(pictureData);
    });
  });
  picturesContainerElement.append(picturesFragment);
};

export { generateMiniatures };
