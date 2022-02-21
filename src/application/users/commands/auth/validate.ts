import Command from './command';
import User from '../../User';
import { BadRequestError, DuplicateError } from '../../../exceptions';

const validate = async (command: Command) => {
  const { user, pwd } = command;
  if (!user || !pwd) throw new BadRequestError('Username and password are required.');

  // Check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) throw new DuplicateError();
};

export default validate;
