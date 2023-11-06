import {CookieOptionsType} from "../type/cookie-options.type";

const cookieOptions: CookieOptionsType = {
  httpOnly: process.env.NODE_ENV === 'development',
  maxAge: 1000,
  secure: process.env.NODE_ENV === 'development',
  path: '/',
  sameSite: 'none',
}

export default cookieOptions