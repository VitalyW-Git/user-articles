import {Request, Response} from 'express'
import userModel from "../models/user";

export const actionRegistration = async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body)
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
      secure: true,
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    return res.status(200).json({
      user,
      message: "Регистрация успешна",
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Не удалось зарегистрироваться',
      error: error.message,
    });
  }
};

export const actionLogin = async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body)
  try {
    const {email, password} = req.body
    const user = await userModel.findOne({email: email});
    if (!user) {
      return res.status(401).json({
        message: `Пользователя с email: ${email} не существует`,
        path: "email",
      });
    }
    const isValidPass = await user.validPassword(password);
    if (!isValidPass) {
      return res.status(401).json({
        message: "Не верный пароль",
        path: "password",
      });
    }
    const maxAge = 2 * 60 * 60
    const token = await user.getToken(maxAge);
    res.cookie("jwt", token, {
      secure: true,
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    return res.status(200).json({
      message: "Авторизация успешна",
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Не удалось авторизоваться',
      error: error.message,
    });
  }
}