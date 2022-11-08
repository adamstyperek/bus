import { NotificationService } from '../../src/notification/service/notification.service';
import { Test } from '@nestjs/testing';
import { NotificationType } from '../../src/notification/dto/notification';
import { OpinionFinished } from '../../src/notification/dto/opinion.finished';
import { OpinionOpened } from '../../src/notification/dto/opinion.opened';

describe('Notification service', () => {
  let notificationService: NotificationService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NotificationService],
    }).compile();
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('when call notification service with opinion finished the opinion-finished is printed in console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    notificationService.notify(new OpinionFinished());
    expect(consoleSpy).toHaveBeenCalledWith(NotificationType.OPINION_FINISHED);
  });

  it('when call notification service with opinion opened the opinion-finished is printed in console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    notificationService.notify(new OpinionOpened());
    expect(consoleSpy).toHaveBeenCalledWith(NotificationType.OPINION_OPENED);
  });
});
