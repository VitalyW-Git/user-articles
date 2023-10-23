import { Request, Response } from 'express'
import {verifyToken} from "../helper/token";
import userModel from "../models/user";
import newsModel from "../models/news";

export const actionUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!!req.cookies && req?.cookies?.hasOwnProperty('jwt')) {
      const property = await verifyToken(req.cookies['jwt']);
      const user = await userModel.findById(property?.id).select('-_id username email -password').lean().exec();
      if (user) {
        return res.status(200).json({
          user,
          success: true,
        });
      }
    }
    return res.status(200).json({
      success: false,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
    });
  }
}

export const actionGetNewsUser = async (req: Request & { userId?: string }, res: Response): Promise<Response> => {
  try {
    const news = await newsModel
      .find({ user_id: req.userId })
      .select('title description date_start status')
      .lean();
    return res.status(200).json({
      news,
      success: true,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
    });
  }
}