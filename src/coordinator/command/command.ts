export enum CommandType {
  LOG_OPINION_OPENED = 'log-opinion-opened',
  LOG_OPINION_FINISHED = 'log-opinion-finished',
  NOTIFY_OPINION_FINISHED_COORDINATOR = 'notify-opinion-finished-coordinator',
}
export interface Command {
  getType(): CommandType;
}
