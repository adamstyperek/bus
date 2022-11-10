import { Notifier } from '../../../src/coordinator/adapters/notification/notifier';
import { Notification } from '../../../src/notification/dto/notification';

export class FakeNotificationAdapter extends Notifier {
  notify(notification: Notification) {
    console.log('notification', notification.getNotificationType());
  }
}
