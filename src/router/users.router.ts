import {Router} from 'express';

import {UserController} from '../controllers/index'
import {registerValidation} from "../validation";

export default (router: Router) => {
    router.get('/user', registerValidation, UserController.actionUser);
};