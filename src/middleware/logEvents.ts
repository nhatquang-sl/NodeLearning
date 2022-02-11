import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';

const fsPromises = require('fs').promises;

const logEvents = async (message: string, logName: string) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    const logPath = path.join(__dirname, '..', 'logs', logName);
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }

    await fsPromises.appendFile(logPath, logItem);
  } catch (err) {
    console.error(err);
  }
};

const reqLogger = (req: any, res: any, next: any) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt ');
  console.log(`${req.method} ${req.path}`);
  next();
};

export { reqLogger, logEvents };
