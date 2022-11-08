import { Module } from '@nestjs/common';
import { CoordinatorModule } from '../coordinator/coordinator.module';
import { OpinionService } from './service/opinion.service';

@Module({
  imports: [CoordinatorModule],
  providers: [OpinionService],
  exports: [],
  controllers: [],
})
export class OpinionModule {}
