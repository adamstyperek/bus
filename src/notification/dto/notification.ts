export enum NotificationType {
  OPINION_FINISHED = 'opinion-finished',
  OPINION_OPENED = 'opinion-opened',
}
export interface Notification {
  getNotificationType(): NotificationType;
}
