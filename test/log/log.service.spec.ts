import { Test } from '@nestjs/testing';
import { LogModule } from '../../src/log/log.module';
import { FakeLogRepository } from './fake/fake.log.repository';
import { LogRepository } from '../../src/log/repository/log.repository';
import { LogService } from '../../src/log/service/log.service';
import { Log } from '../../src/log/dto/log';

describe('Log service', () => {
  let logService: LogService;
  let logRepository: LogRepository;
  beforeEach(async () => {
    const LogRepositoryProvider = {
      provide: LogRepository,
      useClass: FakeLogRepository,
    };
    const module = await Test.createTestingModule({
      imports: [LogModule],
      providers: [LogService, LogRepositoryProvider],
    }).compile();
    logService = module.get<LogService>(LogService);
    logRepository = module.get<LogRepository>(LogRepository);
  });

  it('when add log then log counter from repository is increased by one', async () => {
    const beforeCounter = await logRepository.count();
    await logService.log(
      Log.create(new Date(), 'some type', 'someSourceId', 'someAuthorId'),
    );
    const afterCounter = await logRepository.count();
    expect(afterCounter).toBe(beforeCounter + 1);
  });
});
