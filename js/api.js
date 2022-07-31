import {showLoadErrorMessage} from './util.js';

const FETCH_DATA_URL = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://26.javascript.pages.academy/kekstagram';
const LOAD_ERROR_MESSAGE = 'При загрузке данных с сервера произошла ошибка.';

const getData = (onSuccess) => {
  fetch(FETCH_DATA_URL)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showLoadErrorMessage(LOAD_ERROR_MESSAGE);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((responce) => {
      if (responce.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
