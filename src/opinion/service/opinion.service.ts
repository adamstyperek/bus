import { Opinion } from '../dto/opinion';
import { Injectable } from '@nestjs/common';
import { Coordinator } from '../adapters/coordinator/coordinator';
import { LogOpinionOpenedCommand } from '../commands/log-opinion.opened.command';
import { LogOpinionFinishedCommand } from '../commands/log-opinion-finished.command';
import { NotifyOpinionFinishedCoordinatorCommand } from '../commands/notify-opinion-finished-coordinator.command';

@Injectable()
export class OpinionService {
  public constructor(private coordinator: Coordinator) {}

  openOpinionBy(reviewerId: string, reviewerName: string) {
    const opinion = Opinion.open(reviewerId, reviewerName);
    this.coordinator.push(
      LogOpinionOpenedCommand.create(
        opinion.openedAt,
        opinion.reviewerId,
        opinion.id,
      ),
    );
  }

  finishOpinionBy(reviewerId: string, reviewerName: string) {
    const opinion = Opinion.open(reviewerId, reviewerName);
    opinion.finish();
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
