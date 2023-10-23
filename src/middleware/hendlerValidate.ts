import {Request, Response, NextFunction} from "express";
import {validationResult} from 'express-validator';
import {getListErrors} from "../helper/errorsList";

export const handleAuthValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: getListErrors(errors.array() as any),
      success: false,
    });
  }
  next();
};

export const handleNewsValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
      success: false,
      isAuth: true,
    });
  }
  next();
};