const verifyRoles = (allowedRoles: string[]) => {
  return (req: any, res: any, next: any) => {
    console.log({ roles: req.roles, allowedRoles });
    if (!req?.roles) return res.sendStatus(401);
    const result = req.roles
      .map((role: string) => allowedRoles.includes(role))
      .find((val: boolean) => val);
    if (!result) return res.sendStatus(401);
    next();
  };
};

export default verifyRoles;
