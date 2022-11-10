import { Module } from '@nestjs/common';
import { LogModule } from './log/log.module';
import { NotificationModule } from './notification/notification.module';
import { OpinionModule } from './opinion/opinion.module';
import { CoordinatorModule } from './coordinator/coordinator.module';

@Module({
  imports: [LogModule, NotificationModule, CoordinatorModule, OpinionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
