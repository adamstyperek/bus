import { LogRepository } from './log.repository';
import { Log } from '../dto/log';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryLogRepository extends LogRepository {
  private logs: Log[] = [];
  public constructor() {
    super();
  }
  add(log: Log) {
    console.log('Log: ' + log.toString());
    this.logs.push(log);
  }

  async count(): Promise<number> {
    return this.logs.length;
  }
}
