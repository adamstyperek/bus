import { Opinion } from '../dto/opinion';
import { Injectable } from '@nestjs/common';
import { OpinionsRepository } from '../repositories/opinions.repository';
import { EventBus } from '@nestjs/cqrs';
import { OpinionOpenedEvent } from '../events/opinion-opened.event';
import { OpinionFinishedEvent } from '../events/opinion-finished.event';

@Injectable()
export class OpinionService {
  public constructor(
    private repository: OpinionsRepository,
    private eventBus: EventBus,
  ) {}

  async openOpinionBy(
    reviewerId: string,
    reviewerName: string,
  ): Promise<Opinion> {
    const opinion = Opinion.open(reviewerId, reviewerName);
    await this.repository.save(opinion);
    this.eventBus.publish(new OpinionOpenedEvent(opinion.id));
    return opinion;
  }

  async finishOpinionBy(
    reviewerId: string,
    reviewerName: string,
  ): Promise<Opinion> {
    const opinion = Opinion.open(reviewerId, reviewerName);
    await this.repository.save(opinion);
    this.eventBus.publish(new OpinionFinishedEvent(opinion.id));
    return opinion;
  }
}
