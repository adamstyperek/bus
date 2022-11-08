import { Notification, NotificationType } from './notification';

export class OpinionFinished implements Notification {
  getNotificationType(): NotificationType {
    return NotificationType.OPINION_FINISHED;
  }
}
