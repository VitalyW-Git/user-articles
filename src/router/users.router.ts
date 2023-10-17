import {Router} from 'express';

import {UserController} from '../controllers/index'

export default (router: Router) => {
    router.post('/user/check-user', UserController.actionUser);
};