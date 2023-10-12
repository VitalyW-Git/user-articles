import { body } from 'express-validator';

export const registerValidation = [
    body('username', 'Имя не менее 3-х символов').notEmpty().isLength({ min: 3 }),
    body('email', 'Неверный формат почты').notEmpty().isEmail(),
    body('password', 'Пароль не менее 3-х символов').notEmpty().isLength({ min: 3 }),
];