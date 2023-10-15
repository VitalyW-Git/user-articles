import {body} from 'express-validator';

export const createPostValidation = [
  body('title')
    .custom((value, {req}) => {
      if (value.length && value.length < 3) {
        throw new Error('Заголовок не менее 3-х символов');
      }
      if (!value) {
        throw new Error('Поле обязательное для заполнения');
      }
      return true;
    }),
  body('description')
    .custom((value, {req}) => {
      if (value.length && value.length < 3) {
        throw new Error('Заголовок не менее 3-х символов');
      }
      if (!value) {
        throw new Error('Поле обязательное для заполнения');
      }
      return true;
    }),
  body('date_start')
    .custom((value, {req}) => {
      console.log(value)
      if (value && value.length) {
        const currentDate = new Date();
        const selectedDate = new Date(value);
        if (!selectedDate || isNaN(selectedDate.getTime())) {
          throw new Error('Некорректный формат даты');
        }
        if (selectedDate < currentDate) {
          throw new Error('Дата публикации, должна быть больше текущей даты');
        }
      }
      return true;
    }),
];