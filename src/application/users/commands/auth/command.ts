class Command {
  constructor(user: string, pwd: string) {
    this.user = user;
    this.pwd = pwd;
  }
  user: string = '';
  pwd: string = '';
}

export default Command;
