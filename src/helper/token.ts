const jwt = require('jsonwebtoken')

const generateToken = async (id: string, endTime: number): Promise<string> => {
  return jwt.sign(
    { id },
    process.env.TOKEN_KEY,
    {
      expiresIn: endTime
    }
  )
}

export default generateToken