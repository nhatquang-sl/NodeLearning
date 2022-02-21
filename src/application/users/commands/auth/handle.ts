import bcrypt from 'bcrypt';
import User from '../../User';
import ROLES from '../../../../config/roles';
import Command from './command';

const handle = async (command: Command) => {
  const { user, pwd } = command;

  // encrypt the password
  const hashedPwd = await bcrypt.hash(pwd, 10);

  // Create and store the new user
  const result = await User.create({
    username: user,
    password: hashedPwd,
    roles: [ROLES.USER]
  });

  return result;
};

export default handle;
