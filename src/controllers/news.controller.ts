import {Request, Response} from 'express'
import newsModel from "../models/news";
import {ICreateNews} from "../interfaces/news.interfaces";

export const actionGetAllNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(200).json({
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

export const actionCreateArticle = async (req: Request & {userId?: string}, res: Response): Promise<Response> => {
  try {
    const {description, title, date_start} = req.body;
    let propertyNews: ICreateNews = {
      description,
      title,
      user: req?.userId,
    }
    if (date_start && date_start.length) {
      propertyNews = {
        ...propertyNews,
        date_start,
      }
    }
    const news = new newsModel(propertyNews);
    const newNews = await news.save();
    return res.status(200).json({
      news: newNews,
      success: true,
    });
  } catch (error) {
    console.log('error', error.message)
    return res.status(401).json({
      message: 'Ошибка при создании записи',
      error: error.message,
      success: false,
    });
  }
}

export const actionUpdateArticle = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Ошибка при обновлении записи',
      error: error.message,
      success: false,
    });
  }
}

export const actionDeleteArticle = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Ошибка при удалении записи',
      error: error.message,
      success: false,
    });
  }
}