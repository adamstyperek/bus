import { LogRepository } from './log.repository';
import { Log } from '../dto/log';
import { resolve } from 'path';
import { promises } from 'fs';

export class FileLogRepository extends LogRepository {
  async add(log: Log) {
    const filePath = resolve(__dirname, '../../../data/log.log');
    await promises.appendFile(filePath, '\n' + log.toString());
  }

  async count(): Promise<number> {
    return Promise.resolve(0);
  }
}
