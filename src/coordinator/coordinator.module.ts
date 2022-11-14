import { Module } from '@nestjs/common';
import { CommandHandler } from './services/command.handler';
import { NotificationModule } from '../notification/notification.module';
import { LogModule } from '../log/log.module';
import { Notifier } from './adapters/notification/notifier';
import { NotificationService } from '../notification/service/notification.service';
import { Logger } from './adapters/log/logger';
import { LogService } from '../log/service/log.service';
import { LogOpinionFinishedStrategy } from './strategies/log-opinion-finished.strategy';
import { LogOpinionOpenedStrategy } from './strategies/log-opinion-opened.strategy';
import { NotifyOpinionFinishedCoordinatorStrategy } from './strategies/notify-opinion-finished-coordinator.strategy';
import { ProcessCommandStrategyFactory } from './strategies/process.command.strategy.factory';
import { BullModule } from '@nestjs/bull';
import { Coordinator } from './services/coordinator';
import { CommandsProcessor } from './services/commands-processor';

const NotificationProvider = {
  provide: Notifier,
  useClass: NotificationService,
};

const LogProvider = {
  provide: Logger,
  useClass: LogService,
};

@Module({
  imports: [
    NotificationModule,
    LogModule,
    BullModule.registerQueue({
      name: 'messages',
    }),
  ],
  controllers: [],
  providers: [
    NotificationProvider,
    LogProvider,
    LogOpinionFinishedStrategy,
    LogOpinionOpenedStrategy,
    NotifyOpinionFinishedCoordinatorStrategy,
    ProcessCommandStrategyFactory,
    CommandHandler,
    Coordinator,
    CommandsProcessor,
  ],
  exports: [CommandHandler],
})
export class CoordinatorModule {}
