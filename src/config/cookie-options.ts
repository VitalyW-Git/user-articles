import {CookieOptionsType} from "../type/cookie-options.type";

const cookieOptions: CookieOptionsType = {
  httpOnly: true,
  maxAge: 1000,
  secure: true,
  path: '/',
  sameSite: 'none',
}

export default cookieOptions