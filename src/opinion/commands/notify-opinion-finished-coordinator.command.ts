import { Command, CommandType } from '../../coordinator/command/command';

export class NotifyOpinionFinishedCoordinatorCommand implements Command {
  public constructor(
    private _finishedAt: Date,
    private _reviewerName: string,
    private _year: string,
    private _institute: string,
  ) {}

  public static create(
    finishedAt: Date,
    reviewerName: string,
    year: string,
    institute: string,
  ) {
    return new NotifyOpinionFinishedCoordinatorCommand(
      finishedAt,
      reviewerName,
      year,
      institute,
    );
  }

  get finishedAt(): Date {
    return this._finishedAt;
  }

  get reviewerName(): string {
    return this._reviewerName;
  }

  get year(): string {
    return this._year;
  }

  get institute(): string {
    return this._institute;
  }

  getType(): CommandType {
    return CommandType.NOTIFY_OPINION_FINISHED_COORDINATOR;
  }
}
