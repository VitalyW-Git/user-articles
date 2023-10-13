import { body } from 'express-validator';

export const registerValidation = [
    body('username')
        .custom((value, { req }) => {
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
        .isEmail(),
        // .custom(async (email) => {
        //     const existingUser =
        //         await repo.getOneBy({ email })
        //
        //     if (existingUser) {
        //         throw new Error('Email already in use')
        //     }
        // }),
    body('password')
        .custom((value, { req }) => {
            if (value.length && value.length < 3) {
                throw new Error('Пароль не менее 3-х символов');
            }
            if (!value) {
                throw new Error('Поле обязательное для заполнения');
            }
            return true;
        })
];