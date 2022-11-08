import { Notification, NotificationType } from './notification';

export class OpinionOpened implements Notification {
  getNotificationType(): NotificationType {
    return NotificationType.OPINION_OPENED;
  }
}
