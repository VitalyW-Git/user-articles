import { Request, Response } from 'express'

export const actionRegistration = async (req: Request, res: Response): Promise<Response> => {
    console.log(req.body)
    try {
        return res.status(200).json('какой-то текст');
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};