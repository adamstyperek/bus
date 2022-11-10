import { Coordinator } from '../../../coordinator/services/coordinator';
import { OpinionFinishedEvent } from '../opinion-finished.event';
import { LogOpinionFinishedCommand } from '../../commands/log-opinion-finished.command';
import { NotifyOpinionFinishedCoordinatorCommand } from '../../commands/notify-opinion-finished-coordinator.command';
import { OpinionsRepository } from '../../repositories/opinions.repository';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(OpinionFinishedEvent)
export class OpinionFinishedEventHandler implements IEventHandler {
  public constructor(
    private coordinator: Coordinator,
    private repository: OpinionsRepository,
  ) {}

  async handle(event: OpinionFinishedEvent): Promise<any> {
    const opinion = await this.repository.getBy(event.opinionId);
    this.coordinator.push(
      LogOpinionFinishedCommand.create(
        opinion.finishedAt,
        opinion.reviewerId,
        opinion.id,
      ),
    );
    this.coordinator.push(
      NotifyOpinionFinishedCoordinatorCommand.create(
        opinion.finishedAt,
        opinion.reviewerName,
        '2023',
        'PIT',
      ),
    );
  }
}
