import express from 'express';

import usersRouter from './users.router';
import authRouter from './auth.router';
import newsRouter from './news.router';

const router = express.Router();

export default (): express.Router => {
  usersRouter(router);
  authRouter(router);
  newsRouter(router);
  return router;
};