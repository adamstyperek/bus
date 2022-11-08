import { Notification } from '../../../notification/dto/notification';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class Notifier {
  abstract notify(notification: Notification);
}
