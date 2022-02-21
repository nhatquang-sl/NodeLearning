import express from 'express';
import controller from './controller';
import Command from '../../application/users/commands/auth/command';
import validate from '../../application/users/commands/auth/validate';

const router = express.Router();

router.post(
  '/register',
  async (req) => await validate(new Command(req.body?.user, req.body?.pwd)),
  controller.handleNewUser
);

export default router;
