import {Router} from 'express';

import {AuthController} from '../controllers/index'
import {registerValidation} from "../validation";
import handleValidation from "../helper/hendlerValidate";

export default (router: Router) => {
    router.post('/auth/registration', registerValidation, handleValidation, AuthController.actionRegistration);
};