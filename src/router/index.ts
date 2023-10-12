import express from 'express';

import usersRouter from './users.router';

const router = express.Router();

export default (): express.Router => {
    usersRouter(router);
    return router;
};