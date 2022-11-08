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
}
