import {body} from 'express-validator';
import User from "../../models/user";

export const registerValidation = [
  body('username')
    .custom((value, {req}) => {
      if (value.length && value.length < 3) {
        throw new Error('Пароль не менее 3-х символов');
      }
      if (!value) {
        throw new Error('Поле обязательное для заполнения');
      }
      return true;
    }),
  body('email', 'Неверный формат Email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async (email) => {
      const existingUser = await User.findOne({email});
      if (!!existingUser) {
        throw new Error('Пользователь с таким Email уже существует')
      }
    }),
  body('password')
    .custom((value, {req}) => {
      if (value.length && value.length < 3) {
        throw new Error('Пароль не менее 3-х символов');
      }
      if (!value) {
        throw new Error('Поле обязательное для заполнения');
      }
      return true;
    })
];

export const loginValidation = [
  body('email', 'Неверный формат Email')
    .trim()
    .normalizeEmail()
    .isEmail(),
  body('password')
    .custom((value, {req}) => {
      if (value.length && value.length < 3) {
        throw new Error('Пароль не менее 3-х символов');
      }
      if (!value) {
        throw new Error('Поле обязательное для заполнения');
      }
      return true;
    })
];