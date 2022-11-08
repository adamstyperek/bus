import { ProcessCommandStrategy } from './process.command.strategy';
import { OpinionFinished } from '../../notification/dto/opinion.finished';
import { Notifier } from '../adapters/notification/notifier';
import { Injectable } from '@nestjs/common';
import { Command } from '../command/command';

@Injectable()
export class NotifyOpinionFinishedCoordinatorStrategy
  implements ProcessCommandStrategy
{
  public constructor(private notifier: Notifier) {}

  execute(command: Command) {
    this.notifier.notify(new OpinionFinished());
  }
}
