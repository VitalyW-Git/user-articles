import {Router} from 'express';

import {NewsController} from '../controllers/index'
import {createNewsValidation, deleteNewsValidation, updateNewsValidation} from "../validation/news";
import {handleNewsValidation} from "../middleware/hendlerValidate";
import checkToken from "../middleware/checkToken";

export default (router: Router) => {
  router.get('/news/get-all',
    NewsController.actionGetAllNews
  );
  router.delete('/news/delete/:id',
    checkToken,
    deleteNewsValidation,
    NewsController.actionDeleteArticle
  );
  router.post('/news/create',
    checkToken,
    createNewsValidation,
    handleNewsValidation,
    NewsController.actionCreateArticle
  );
  router.patch('/news/update',
    checkToken,
    updateNewsValidation,
    handleNewsValidation,
    NewsController.actionUpdateArticle
  );
};