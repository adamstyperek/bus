import { LogRepository } from '../../../src/log/repository/log.repository';
import { Log } from '../../../src/log/dto/log';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeLogRepository extends LogRepository {
  private logs: Log[] = [];
  public constructor() {
    super();
  }
  add(log: Log) {
    this.logs.push(log);
  }

  async count(): Promise<number> {
    return this.logs.length;
  }
}
