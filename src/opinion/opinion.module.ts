import { Module } from '@nestjs/common';
import { CoordinatorModule } from '../coordinator/coordinator.module';
import { OpinionService } from './service/opinion.service';
import { OpinionController } from './ui/opinion.controller';

@Module({
  imports: [CoordinatorModule],
  providers: [OpinionService],
  exports: [],
  controllers: [OpinionController],
})
export class OpinionModule {}
