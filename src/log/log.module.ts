import { Module } from '@nestjs/common';
import { LogService } from './service/log.service';
import { LogRepository } from './repository/log.repository';
import { InMemoryLogRepository } from './repository/in-memory.log.repository';

const LogRepositoryProvider = {
  provide: LogRepository,
  useClass: InMemoryLogRepository,
};

@Module({
  imports: [],
  controllers: [],
  providers: [LogService, LogRepositoryProvider],
  exports: [LogService],
})
export class LogModule {}
