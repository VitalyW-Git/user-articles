import {Router} from 'express';

import {AuthController} from '../controllers/index'
import {loginValidation, registerValidation} from "../validation";
import handleValidation from "../helper/hendlerValidate";

export default (router: Router) => {
    router.post('/auth/registration', registerValidation, handleValidation, AuthController.actionRegistration);
    router.post('/auth/login', loginValidation, handleValidation, AuthController.actionLogin);
};