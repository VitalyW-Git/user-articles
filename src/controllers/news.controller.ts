import {Request, Response} from 'express'
import {ICreateNews} from "../interfaces/news.interfaces";
import newsModel from "../models/news";

export const actionGetAllNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const news = await newsModel.find().select('title description status date_start').lean().exec();
    return res.status(200).json({
      news,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Ошибка при получении списка',
      error: error.message,
      success: false,
    });
  }
}

export const actionCreateArticle = async (req: Request & { userId?: string }, res: Response): Promise<Response> => {
  try {
    const {description, title, date_start} = req.body;
    let propertyNews: ICreateNews = {
      description,
      title,
      user_id: req?.userId,
    }
    if (date_start && date_start.length) {
      propertyNews = {
        ...propertyNews,
        date_start,
      }
    }
    const news = new newsModel(propertyNews);
    const newNews = await news.save();
    const selectedFields = await newsModel.findById(newNews._id).lean().select('title description').lean();
    return res.status(200).json({
      news: selectedFields,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Ошибка при создании записи',
      error: error.message,
      success: false,
      isAuth: true,
    });
  }
}

export const actionUpdateArticle = async (req: Request & { userId?: string }, res: Response): Promise<Response> => {
  try {
    const user_id = req?.userId;
    const {article_id, description, title} = req.body;
    const news = await newsModel.findOneAndUpdate(
      {user_id, _id: article_id},
      {description, title},
      {new: true, select: 'title description'}
    ).lean();
    return res.status(200).json({
      news: news,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Ошибка при обновлении записи',
      error: error.message,
      success: false,
      isAuth: true,
    });
  }
}

export const actionDeleteArticle = async (req: Request & { userId?: string }, res: Response): Promise<Response> => {
  try {
    const user_id = req?.userId;
    const {article_id} = req.body;
    const news = await newsModel.findOneAndUpdate(
      {user_id, _id: article_id},
      {status: false},
      {new: true}
    ).lean();
    if (news) {
      return res.status(200).json({
        success: true,
        isAuth: true,
      });
    }
    return res.status(200).json({
      success: false,
      isAuth: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Ошибка при удалении записи',
      success: false,
      isAuth: true,
    });
  }
}