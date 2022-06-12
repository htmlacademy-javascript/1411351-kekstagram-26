function getRandomNumbers (numberOne, numberTwo) {
  if ((numberOne || numberTwo) < 0) {
    return 'Выберите число больше нуля';
  } else {

    if (numberTwo <= numberOne) {
      return 'Второе число должно быть больше первого';
    } else {

      if ((typeof numberOne || typeof numberTwo) !== 'number') {
        return 'Вы ввели НЕ число';

      } else {
        const result = Math.round(Math.random() * (numberTwo - numberOne) + numberOne);
        // Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return result;
      }
    }
  }
}
getRandomNumbers (1, 3);

function checkCommentString (commentString, maxLength) {
   if (commentString.length < maxLength) {
    return true;
   }

   return false;
}

checkCommentString ('Здесь находится комментарий к фотографии', 140);
