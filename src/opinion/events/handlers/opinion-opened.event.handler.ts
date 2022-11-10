import { Coordinator } from '../../../coordinator/services/coordinator';
import { OpinionsRepository } from '../../repositories/opinions.repository';
import { LogOpinionOpenedCommand } from '../../commands/log-opinion.opened.command';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OpinionOpenedEvent } from '../opinion-opened.event';

@EventsHandler(OpinionOpenedEvent)
export class OpinionOpenedEventHandler
  implements IEventHandler<OpinionOpenedEvent>
{
  public constructor(
    private coordinator: Coordinator,
    private repository: OpinionsRepository,
  ) {}

  async handle(event: OpinionOpenedEvent): Promise<any> {
    const opinion = await this.repository.getBy(event.opinionId);
    this.coordinator.push(
      LogOpinionOpenedCommand.create(
        opinion.openedAt,
        opinion.reviewerId,
        opinion.id,
      ),
    );
    return true;
  }
}
