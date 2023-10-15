import {Router} from 'express';

import {AuthController} from '../controllers/index'
import {loginValidation, registerValidation} from "../validation/auth";
import handleValidation from "../middleware/hendlerValidate";

export default (router: Router) => {
    router.post('/auth/registration', registerValidation, handleValidation, AuthController.actionRegistration);
    router.post('/auth/login', loginValidation, handleValidation, AuthController.actionLogin);
};