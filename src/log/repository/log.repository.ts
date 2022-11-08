import { Log } from '../dto/log';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class LogRepository {
  abstract add(log: Log);

  abstract count(): Promise<number>;
}
