import { pristine } from './pristine.js';

const validateForm = (evt) => {
  // Если валидация не прошла, перехватываем событие и отменяем его.
  if (!pristine.validate()) {
    evt.preventDefault();
    // alert('Форма заполнена неверно');
  }
};

export { validateForm };
