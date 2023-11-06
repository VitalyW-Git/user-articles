type SameSiteType = "strict" | "lax" | "none" | undefined | boolean

export type CookieOptionsType = {
  httpOnly: boolean,
  maxAge?: number,
  secure: boolean,
  path: string,
  sameSite: SameSiteType,
}