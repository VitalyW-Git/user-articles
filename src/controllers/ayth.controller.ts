import {Request, Response} from 'express'
import userModel from "../models/user";

export const actionRegistration = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {username, email, password} = req.body;
    const user = new userModel({
      username, email, password
    })
    user.password = await user.encryptPassword(password);
    await user.save();
    const maxAge = 2 * 60 * 60
    const token = await user.getToken(maxAge);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    return res.status(200).json({
      user,
      message: ["Регистрация успешна"],
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: ['Не удалось зарегистрироваться'],
      error: error.message,
      success: false,
    });
  }
};

export const actionLogin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {email, password} = req.body
    const user = await userModel.findOne({email: email});
    if (!user) {
      return res.status(400).json({
        message: [`Пользователя с email: ${email} не существует`],
        path: "email",
        success: false,
      });
    }
    const isValidPass = await user.validPassword(password);
    if (!isValidPass) {
      return res.status(400).json({
        message: ["Неверный пароль"],
        path: "password",
        success: false,
      });
    }
    const maxAge = 2 * 60 * 60
    const token = await user.getToken(maxAge);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    return res.status(200).json({
      user: {username: user.username, email: user.email},
      message: ["Авторизация успешна"],
      success: true,
    });

  } catch (error) {
    return res.status(401).json({
      message: ['Не удалось авторизоваться'],
      error: error.message,
      success: false,
    });
  }
}