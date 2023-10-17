import {Router} from 'express';

import {AuthController} from '../controllers/index'
import {loginValidation, registerValidation} from "../validation/auth";
import {handleAuthValidation} from "../middleware/hendlerValidate";

export default (router: Router) => {
    router.post('/auth/registration',
      registerValidation,
      handleAuthValidation,
      AuthController.actionRegistration
    );
    router.post('/auth/login',
      loginValidation,
      handleAuthValidation,
      AuthController.actionLogin
    );
};