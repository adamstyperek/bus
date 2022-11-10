import { randomUUID } from 'crypto';

export class Opinion {
  private constructor(
    private _openedAt: Date,
    private _id: string,
    private _reviewerId: string,
    private _reviewerName: string,
    private _finishedAt?: Date,
  ) {}

  public static open(reviewerId: string, reviewerName: string) {
    return new Opinion(
      new Date(),
      randomUUID(),
      reviewerId,
      reviewerName,
      null,
    );
  }

  public finish() {
    this._finishedAt = new Date();
  }

  get openedAt(): Date {
    return this._openedAt;
  }

  get id(): string {
    return this._id;
  }

  get reviewerId(): string {
    return this._reviewerId;
  }

  get finishedAt(): Date {
    return this._finishedAt;
  }

  get reviewerName(): string {
    return this._reviewerName;
  }
}
