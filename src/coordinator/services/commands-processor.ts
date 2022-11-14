import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Coordinator } from './coordinator';
import { Command, CommandType } from '../command/command';
import { LogOpinionFinishedCommand } from '../../opinion/commands/log-opinion-finished.command';
import { LogOpinionOpenedCommand } from '../../opinion/commands/log-opinion.opened.command';
import { NotifyOpinionFinishedCoordinatorCommand } from '../../opinion/commands/notify-opinion-finished-coordinator.command';

@Processor('messages')
export class CommandsProcessor {
  public constructor(private processor: Coordinator) {}

  @Process('*')
  async handle(job: Job) {
    const command = this.getCommand(job);
    await this.processor.process(command);
  }

  private getCommand(job: Job): Command {
    const data = job.data;
    switch (job.name) {
      case CommandType.LOG_OPINION_OPENED:
        return LogOpinionOpenedCommand.create(
          new Date(data._openedAt),
          data._reviewerId,
          data._opinionId,
        );
      case CommandType.LOG_OPINION_FINISHED:
        return LogOpinionFinishedCommand.create(
          new Date(data._finishedAt),
          data._reviewerId,
          data._opinionId,
        );
      case CommandType.NOTIFY_OPINION_FINISHED_COORDINATOR:
        return NotifyOpinionFinishedCoordinatorCommand.create(
          new Date(data._finishedAt),
          data._reviewerName,
          data._year,
          data._institute,
        );
    }
  }
}
