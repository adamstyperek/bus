import { Module } from '@nestjs/common';
import { LogModule } from './log/log.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [LogModule, NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
