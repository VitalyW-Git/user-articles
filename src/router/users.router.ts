import {Router} from 'express';

import {UserController} from '../controllers/index'
import checkToken from "../middleware/checkToken";

export default (router: Router) => {
    router.post('/user/check-user',
      UserController.actionUser
    );
    router.get('/user/news',
      checkToken,
      UserController.actionGetNewsUser
    );
};