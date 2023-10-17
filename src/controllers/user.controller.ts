import { Request, Response } from 'express'
import {verifyToken} from "../helper/token";
import userModel from "../models/user";

export const actionUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!!req.cookies && req?.cookies?.hasOwnProperty('jwt')) {
      const property = await verifyToken(req.cookies['jwt']);
      const user = await userModel.findById(property?.id).select("-_id username email -password").lean();
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