import { ProcessCommandStrategy } from './process.command.strategy';
import { Log } from '../../log/dto/log';
import { Logger } from '../adapters/log/logger';
import { Injectable } from '@nestjs/common';
import { Command } from '../command/command';
import { LogOpinionFinishedCommand } from '../../opinion/commands/log-opinion-finished.command';

@Injectable()
export class LogOpinionFinishedStrategy implements ProcessCommandStrategy {
  public constructor(private logger: Logger) {}

  execute(command: Command) {
    const logOpinionFinishedCommand = <LogOpinionFinishedCommand>command;
    this.logger.log(
      Log.create(
        logOpinionFinishedCommand.finishedAt,
        'opinion finished',
        logOpinionFinishedCommand.opinionId,
        logOpinionFinishedCommand.reviewerId,
      ),
    );
  }
}
