import { Command, CommandType } from '../../coordinator/command/command';

export class LogOpinionFinishedCommand implements Command {
  private constructor(
    private _finishedAt: Date,
    private _reviewerId: string,
    private _opinionId: string,
  ) {}

  public static create(openedAt: Date, reviewerId: string, opinionId: string) {
    return new LogOpinionFinishedCommand(openedAt, reviewerId, opinionId);
  }

  get finishedAt(): Date {
    return this._finishedAt;
  }

  get reviewerId(): string {
    return this._reviewerId;
  }

  get opinionId(): string {
    return this._opinionId;
  }

  getType(): CommandType {
    return CommandType.LOG_OPINION_FINISHED;
  }
}
