export class Log {
  private constructor(
    private _createdAt: Date,
    private _type: string,
    private _sourceId: string,
    private _userId: string,
  ) {}

  public static create(
    createdAt: Date,
    type: string,
    sourceId: string,
    userId: string,
  ) {
    return new Log(createdAt, type, sourceId, userId);
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get type(): string {
    return this._type;
  }

  get sourceId(): string {
    return this._sourceId;
  }

  get userId(): string {
    return this._userId;
  }

  toString(): string {
    return (
      'At ' +
      this.createdAt.toISOString() +
      ' user: ' +
      this.userId +
      ' ' +
      this.type +
      ' with Id: ' +
      this.sourceId
    );
  }
}
