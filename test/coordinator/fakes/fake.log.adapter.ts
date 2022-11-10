import { Logger } from '../../../src/coordinator/adapters/log/logger';
import { Log } from '../../../src/log/dto/log';

export class FakeLogAdapter extends Logger {
  log(log: Log) {
    console.log(log.toString());
  }
}
