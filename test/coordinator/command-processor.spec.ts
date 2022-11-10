import { Test } from '@nestjs/testing';
import { LogOpinionFinishedCommand } from '../../src/opinion/commands/log-opinion-finished.command';
import { LogOpinionFinishedStrategy } from '../../src/coordinator/strategies/log-opinion-finished.strategy';
import { LogOpinionOpenedCommand } from '../../src/opinion/commands/log-opinion.opened.command';
import { LogOpinionOpenedStrategy } from '../../src/coordinator/strategies/log-opinion-opened.strategy';
import { Logger } from '../../src/coordinator/adapters/log/logger';
import { FakeLogAdapter } from './fakes/fake.log.adapter';
import { Notifier } from '../../src/coordinator/adapters/notification/notifier';
import { FakeNotificationAdapter } from './fakes/fake.notification.adapter';
import { NotifyOpinionFinishedCoordinatorStrategy } from '../../src/coordinator/strategies/notify-opinion-finished-coordinator.strategy';
import { ProcessCommandStrategyFactory } from '../../src/coordinator/strategies/process.command.strategy.factory';
import { NotifyOpinionFinishedCoordinatorCommand } from '../../src/opinion/commands/notify-opinion-finished-coordinator.command';
import { CommandsProcessor } from '../../src/coordinator/services/commands-processor';

describe('command processor service', () => {
  let commandProcessor: CommandsProcessor;
  let logOpinionFinishedStrategy: LogOpinionFinishedStrategy;
  let logOpinionOpenedStrategy: LogOpinionOpenedStrategy;
  let notifyOpinionFinishedCoordinatorStrategy: NotifyOpinionFinishedCoordinatorStrategy;
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
        CommandsProcessor,
      ],
    }).compile();
    commandProcessor = module.get<CommandsProcessor>(CommandsProcessor);
    logOpinionFinishedStrategy = module.get<LogOpinionFinishedStrategy>(
      LogOpinionFinishedStrategy,
    );
    logOpinionOpenedStrategy = module.get<LogOpinionOpenedStrategy>(
      LogOpinionOpenedStrategy,
    );
    notifyOpinionFinishedCoordinatorStrategy =
      module.get<NotifyOpinionFinishedCoordinatorStrategy>(
        NotifyOpinionFinishedCoordinatorStrategy,
      );
  });
  it('when execute log opinion finished command then LogOpinionFinishedStrategy execute is called', () => {
    const command = LogOpinionFinishedCommand.create(
      new Date(),
      'reviewerId',
      'opinionId',
    );
    const strategySpy = jest.spyOn(logOpinionFinishedStrategy, 'execute');
    commandProcessor.process(command);
    expect(strategySpy).toHaveBeenCalledWith(command);
  });
  it('when execute log opinion opened command then LogOpinionOpenedStrategy execute is called', () => {
    const command = LogOpinionOpenedCommand.create(
      new Date(),
      'reviewerId',
      'opinionId',
    );
    const strategySpy = jest.spyOn(logOpinionOpenedStrategy, 'execute');
    commandProcessor.process(command);
    expect(strategySpy).toHaveBeenCalledWith(command);
  });
  it('when execute notify opinion finished coordinator command then NotifyOpinionFinishedCoordinator execute is called', () => {
    const command = NotifyOpinionFinishedCoordinatorCommand.create(
      new Date(),
      'reviewer name',
      '2023',
      'pit',
    );
    const strategySpy = jest.spyOn(
      notifyOpinionFinishedCoordinatorStrategy,
      'execute',
    );
    commandProcessor.process(command);
    expect(strategySpy).toHaveBeenCalledWith(command);
  });
});
