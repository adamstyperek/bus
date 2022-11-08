import { Injectable } from '@nestjs/common';
import { Command, CommandType } from '../command/command';
import { ModuleRef } from '@nestjs/core';
import { LogOpinionFinishedStrategy } from './log-opinion-finished.strategy';
import { LogOpinionOpenedStrategy } from './log-opinion-opened.strategy';
import { NotifyOpinionFinishedCoordinatorCommand } from '../../opinion/commands/notify-opinion-finished-coordinator.command';
import { ProcessCommandStrategy } from './process.command.strategy';

@Injectable()
export class ProcessCommandStrategyFactory {
  public constructor(private moduleRef: ModuleRef) {}

  getStrategy(command: Command): ProcessCommandStrategy {
    switch (command.getType()) {
      case CommandType.LOG_OPINION_FINISHED:
        return this.moduleRef.get(LogOpinionFinishedStrategy);
      case CommandType.LOG_OPINION_OPENED:
        return this.moduleRef.get(LogOpinionOpenedStrategy);
      case CommandType.NOTIFY_OPINION_FINISHED_COORDINATOR:
        return this.moduleRef.get(NotifyOpinionFinishedCoordinatorCommand);
      default:
        throw new Error();
    }
  }
}
