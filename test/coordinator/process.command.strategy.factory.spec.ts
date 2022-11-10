import { ProcessCommandStrategyFactory } from '../../src/coordinator/strategies/process.command.strategy.factory';
import { Test } from '@nestjs/testing';
import { LogOpinionOpenedStrategy } from '../../src/coordinator/strategies/log-opinion-opened.strategy';
import { LogOpinionFinishedStrategy } from '../../src/coordinator/strategies/log-opinion-finished.strategy';
import { NotifyOpinionFinishedCoordinatorStrategy } from '../../src/coordinator/strategies/notify-opinion-finished-coordinator.strategy';
import { LogOpinionFinishedCommand } from '../../src/opinion/commands/log-opinion-finished.command';
import { FakeLogAdapter } from './fakes/fake.log.adapter';
import { Logger } from '../../src/coordinator/adapters/log/logger';
import { Notifier } from '../../src/coordinator/adapters/notification/notifier';
import { FakeNotificationAdapter } from './fakes/fake.notification.adapter';
import { LogOpinionOpenedCommand } from '../../src/opinion/commands/log-opinion.opened.command';

describe('Process command strategy factory', () => {
  let factory: ProcessCommandStrategyFactory;
  beforeEach(async () => {
    const LogProvider = {
      provide: Logger,
      useClass: FakeLogAdapter,
    };
    const NotificationProvider = {
      provide: Notifier,
      useClass: FakeNotificationAdapter,
    };
    const module = await Test.createTestingModule({
      providers: [
        LogOpinionFinishedStrategy,
        LogOpinionOpenedStrategy,
        NotifyOpinionFinishedCoordinatorStrategy,
        ProcessCommandStrategyFactory,
        LogProvider,
        NotificationProvider,
      ],
    }).compile();
    factory = module.get<ProcessCommandStrategyFactory>(
      ProcessCommandStrategyFactory,
    );
  });
  it('when log opinion finished command is pass to factory then log opinion finished strategy is returned', () => {
    const strategy = factory.getStrategy(
      LogOpinionFinishedCommand.create(new Date(), 'reviewerId', 'opinionId'),
    );
    expect(strategy).toBeInstanceOf(LogOpinionFinishedStrategy);
  });
  it('when log opinion opened command is pass to factory then log opinion opened strategy is returned', () => {
    const strategy = factory.getStrategy(
      LogOpinionOpenedCommand.create(new Date(), 'reviewerId', 'opinionId'),
    );
    expect(strategy).toBeInstanceOf(LogOpinionOpenedStrategy);
  });
  it('when log notify opinion finished coordinator command is pass to factory then log notify opinion finished coordinator strategy is returned', () => {
    const strategy = factory.getStrategy(
      LogOpinionOpenedCommand.create(new Date(), 'reviewerId', 'opinionId'),
    );
    expect(strategy).toBeInstanceOf(LogOpinionOpenedStrategy);
  });
});
