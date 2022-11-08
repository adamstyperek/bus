import { LogRepository } from '../repository/log.repository';
import { Log } from '../dto/log';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogService {
  public constructor(private repository: LogRepository) {}

  async log(log: Log) {
    this.repository.add(log);
  }
}
