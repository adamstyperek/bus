import { ProcessCommandStrategy } from './process.command.strategy';
import { Log } from '../../log/dto/log';
import { Logger } from '../adapters/log/logger';
import { Injectable } from '@nestjs/common';
import { Command } from '../command/command';
import { LogOpinionOpenedCommand } from '../../opinion/commands/log-opinion.opened.command';

@Injectable()
export class LogOpinionOpenedStrategy implements ProcessCommandStrategy {
  public constructor(private logger: Logger) {}

  execute(command: Command) {
    const logOpinionOpenedCommand = <LogOpinionOpenedCommand>command;
    this.logger.log(
      Log.create(
        logOpinionOpenedCommand.openedAt,
        'opinion opened',
        logOpinionOpenedCommand.opinionId,
        logOpinionOpenedCommand.reviewerId,
      ),
    );
  }
}
