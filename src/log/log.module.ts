import { Module } from '@nestjs/common';
import { LogService } from './service/log.service';
import { LogRepository } from './repository/log.repository';
import { FileLogRepository } from './repository/file.log.repository';

const LogRepositoryProvider = {
  provide: LogRepository,
  useClass: FileLogRepository,
};

@Module({
  imports: [],
  controllers: [],
  providers: [LogService, LogRepositoryProvider],
  exports: [LogService, LogRepositoryProvider],
})
export class LogModule {}
