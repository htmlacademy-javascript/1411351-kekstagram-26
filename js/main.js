function getRandomNumbers (numberOne, numberTwo) {
  if ((numberOne || numberTwo) < 0) {
    console.log('Выберите число больше нуля');
  } else {

    if (numberTwo <= numberOne) {
      console.log('Второе число должно быть больше первого')
    } else {

      if ((typeof numberOne || typeof numberTwo) != 'number') {
        console.log('Вы ввели НЕ число')

      } else {
        let result = Math.round(Math.random() * (numberTwo - numberOne) + numberOne);
        // Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        console.log(result);
        return result;
      }
    }
  }
}
getRandomNumbers (1, 3);

function checkCommentString (commentString, maxLength) {
  return commentString.length < maxLength ?  true : false
}

console.log(checkCommentString ('Здесь находится комментарий к фотографии', 140))
