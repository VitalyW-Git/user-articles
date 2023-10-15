import {Router} from 'express';

import {NewsController} from '../controllers/index'
import {createPostValidation} from "../validation/news";
import handleValidation from "../middleware/hendlerValidate";
import checkToken from "../middleware/checkToken";

export default (router: Router) => {
  router.get('/news/get-all', NewsController.actionGetAllNews);
  router.delete('/news/delete/:id', NewsController.actionDeleteArticle);
  router.post('/news/create',
    checkToken,
    createPostValidation,
    handleValidation,
    NewsController.actionCreateArticle
  );
  router.patch('/news/update/:id',
    checkToken,
    createPostValidation,
    handleValidation,
    NewsController.actionUpdateArticle
  );
};