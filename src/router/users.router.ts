import {Router} from 'express';

import {UsersController} from '../controllers/index'

export default (router: Router) => {
    router.get('/news', UsersController.actionUser);
};