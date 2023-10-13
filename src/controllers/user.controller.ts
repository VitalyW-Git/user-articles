import { Request, Response } from 'express'

export const actionUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        return res.status(200).json('какой-то текст');
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};