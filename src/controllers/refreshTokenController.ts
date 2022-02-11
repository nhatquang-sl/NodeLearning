import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User';

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // Forbidden

  // Evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, decoded: any) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username, roles: foundUser.roles },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: '30s'
      }
    );

    res.json({ accessToken });
  });
};

export default { handleRefreshToken };
