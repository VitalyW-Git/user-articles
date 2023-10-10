import express from 'express';

import {UsersController} from '/controllers/index'

export default (router: express.Router) => {
    router.get('/news', UsersController.actionUser);
};