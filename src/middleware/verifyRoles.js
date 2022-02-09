const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
    console.log({ roles: req.roles, allowedRoles });
    if (!req?.roles) return res.sendStatus(401);
    const result = req.roles.map((role) => allowedRoles.includes(role)).find((val) => val);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
