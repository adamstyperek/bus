import { Injectable } from '@nestjs/common';
import { Command, CommandType } from '../command/command';
import { ModuleRef } from '@nestjs/core';
import { LogOpinionFinishedStrategy } from './log-opinion-finished.strategy';
import { LogOpinionOpenedStrategy } from './log-opinion-opened.strategy';
import { ProcessCommandStrategy } from './process.command.strategy';
import { NotifyOpinionFinishedCoordinatorStrategy } from './notify-opinion-finished-coordinator.strategy';

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
        return this.moduleRef.get(NotifyOpinionFinishedCoordinatorStrategy);
      default:
        throw new Error();
    }
  }
}
