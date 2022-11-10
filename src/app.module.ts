import { Module } from '@nestjs/common';
import { LogModule } from './log/log.module';
import { NotificationModule } from './notification/notification.module';
import { OpinionModule } from './opinion/opinion.module';
import { CoordinatorModule } from './coordinator/coordinator.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    LogModule,
    NotificationModule,
    CoordinatorModule,
    OpinionModule,
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
