import { Module } from '@nestjs/common';
import { CoordinatorModule } from '../coordinator/coordinator.module';
import { OpinionService } from './service/opinion.service';
import { OpinionController } from './ui/opinion.controller';
import { OpinionsRepository } from './repositories/opinions.repository';
import { InMemoryOpinionsRepository } from './repositories/in-memory.opinions.repository';
import { EventHandlers } from './events/handlers';
import { CqrsModule } from '@nestjs/cqrs';

const OpinionsRepositoryProvider = {
  provide: OpinionsRepository,
  useClass: InMemoryOpinionsRepository,
};

@Module({
  imports: [CoordinatorModule, CqrsModule],
  providers: [OpinionService, OpinionsRepositoryProvider, ...EventHandlers],
  exports: [],
  controllers: [OpinionController],
})
export class OpinionModule {}
