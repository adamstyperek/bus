export class OpinionOpenedEvent {
  public constructor(private _opinionId: string) {}

  get opinionId(): string {
    return this._opinionId;
  }
}
