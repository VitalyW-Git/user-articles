import {CookieOptionsType} from "../type/cookie-options.type";

const cookieOptions: CookieOptionsType = {
  httpOnly: process.env.NODE_ENV === 'production',
  maxAge: 1000,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  sameSite: 'none',
}

export default cookieOptions