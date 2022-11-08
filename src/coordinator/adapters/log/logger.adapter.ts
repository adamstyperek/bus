import { Logger } from './logger';
import { Log } from '../../../log/dto/log';
import { LogService } from '../../../log/service/log.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerAdapter extends Logger {
  public constructor(private service: LogService) {
    super();
  }
  log(log: Log) {
    this.service.log(log);
  }
}
