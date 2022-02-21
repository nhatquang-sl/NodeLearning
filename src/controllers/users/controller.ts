import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Command from '../../application/users/commands/auth/command';
import handle from '../../application/users/commands/auth/handle';
const handleNewUser = async (req: Request, res: Response) => {
  let command = new Command(req.body.user, req.body.pwd);
  const result = await handle(command);

  res.status(201).json({ success: `New user ${command.user} created!` });
};

export default { handleNewUser };
