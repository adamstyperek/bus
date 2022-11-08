import { Notification } from '../dto/notification';

export class NotificationService {
  notify(notification: Notification) {
    console.log(notification.getNotificationType());
  }
}
