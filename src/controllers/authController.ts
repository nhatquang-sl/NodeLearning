import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User';

const handleLogin = async (req: Request, res: Response) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: 'Username and password are required.' });
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // Evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // Create JWTs
    const accessToken = jwt.sign(
      {
        username: foundUser.username,
        roles: foundUser.roles
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: '1d' }
    );

    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      // sameSite: 'None',
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

export default { handleLogin };
