import jwt from 'jsonwebtoken'

export const generateToken = async (id: string, endTime: number): Promise<string> => {
  return jwt.sign(
    { id },
    `${process.env.TOKEN_KEY}`,
    {
      expiresIn: endTime
    }
  )
}

export const verifyToken = async (token: string): Promise<any> => {
  return jwt.verify(token, `${process.env.TOKEN_KEY}`);
}