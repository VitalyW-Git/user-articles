import {Request, Response, NextFunction} from "express";
import {validationResult} from 'express-validator';

export const handleAuthValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};

export const handleNewsValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      success: false,
      isAuth: true,
    });
  }
  next();
};