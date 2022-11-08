import { Log } from '../../../log/dto/log';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class Logger {
  abstract log(log: Log);
}
