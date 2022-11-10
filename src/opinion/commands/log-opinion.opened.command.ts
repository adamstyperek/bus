import { Command, CommandType } from '../../coordinator/command/command';

export class LogOpinionOpenedCommand implements Command {
  public constructor(
    private _openedAt: Date,
    private _reviewerId: string,
    private _opinionId: string,
  ) {}

  public static create(openedAt: Date, reviewerId: string, opinionId: string) {
    return new LogOpinionOpenedCommand(openedAt, reviewerId, opinionId);
  }

  get openedAt(): Date {
    return this._openedAt;
  }

  get reviewerId(): string {
    return this._reviewerId;
  }

  get opinionId(): string {
    return this._opinionId;
  }

  getType(): CommandType {
    return CommandType.LOG_OPINION_OPENED;
  }
}
