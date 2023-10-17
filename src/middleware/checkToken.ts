import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import {verifyToken} from "../helper/token";
import userModel from "../models/user";

const checkToken = async (req: Request & {userId?: string}, res: Response, next: NextFunction): Promise<void | Response> => {
  try{
    const isJwt = Object.prototype.hasOwnProperty.call(req?.cookies, 'jwt')
    if (!!req?.cookies && isJwt) {
      const property = await verifyToken(req.cookies['jwt']);
      const user = await userModel.findById(property?.id);
      if (user) {
        req.userId = property?.id;
        next();
      }
    } else {
      return res.status(401).json({
        success: false,
        isAuth: false,
      });
    }
  } catch (e) {
    return res.status(401).json({
      success: false,
      isAuth: false,
    });
  }
};

export default checkToken