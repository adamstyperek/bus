import { Notifier } from './notifier';
import { NotificationService } from '../../../notification/service/notification.service';
import { Notification } from '../../../notification/dto/notification';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationAdapter extends Notifier {
  public constructor(private service: NotificationService) {
    super();
  }
  notify(notification: Notification) {
    this.service.notify(notification);
  }
}
