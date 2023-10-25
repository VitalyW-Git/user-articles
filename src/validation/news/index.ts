import {body} from 'express-validator';
import newsModel from "../../models/news";

export const deleteNewsValidation = [
  body('id')
    .trim()
    .custom(async (id) => {
      const existingNews = await newsModel.findById(id);
      if (!existingNews) {
        throw new Error('Запись не найдена')
      }
    }),
];
export const updateNewsValidation = [
  body('article_id')
    .trim()
    .custom(async (article_id) => {
      const existingNews = await newsModel.findById(article_id);
      if (!existingNews) {
        throw new Error('Запись не найдена')
      }
    }),
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
];
export const createNewsValidation = [
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