import { pristine } from './pristine.js';

const formValidation = (evt) => {
  // Если валидация не прошла, перехватываем событие и отменяем его.
  if (!pristine.validate()) {
    evt.preventDefault();
    // alert('Форма заполнена неверно');
  }
};

export { formValidation };
