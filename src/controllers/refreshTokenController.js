const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { USER } = require('../config/roles');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // Forbidden

  // Evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username, roles: foundUser.roles },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '30s',
      }
    );

    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
