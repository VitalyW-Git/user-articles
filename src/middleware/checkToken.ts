import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import {verifyToken} from "../helper/token";
import userModel from "../models/user";

const checkToken = async (req: Request & {userId?: string}, res: Response, next: NextFunction): Promise<void | Response> => {
  if (!!req?.cookies && req?.cookies?.hasOwnProperty('jwt')) {
    const {id} = await verifyToken(req.cookies['jwt']);
    const user = await userModel.findById(id);
    if (user) {
      req.userId = id;
      next();
    }
  } else {
    return res.status(401).json({
      success: false,
    });
  }
};

export default checkToken