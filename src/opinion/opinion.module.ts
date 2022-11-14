import { Module } from '@nestjs/common';
import { CoordinatorModule } from '../coordinator/coordinator.module';
import { OpinionService } from './service/opinion.service';
import { OpinionController } from './ui/opinion.controller';
import { OpinionsRepository } from './repositories/opinions.repository';
import { InMemoryOpinionsRepository } from './repositories/in-memory.opinions.repository';
import { EventHandlers } from './events/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { Coordinator } from './adapters/coordinator/coordinator';
import { CoordinatorAdapter } from './adapters/coordinator/coordinator.adapter';

const OpinionsRepositoryProvider = {
  provide: OpinionsRepository,
  useClass: InMemoryOpinionsRepository,
};

const CoordinatorProvider = {
  provide: Coordinator,
  useClass: CoordinatorAdapter,
};

@Module({
  imports: [CoordinatorModule, CqrsModule],
  providers: [
    OpinionService,
    OpinionsRepositoryProvider,
    ...EventHandlers,
    CoordinatorProvider,
  ],
  exports: [],
  controllers: [OpinionController],
})
export class OpinionModule {}
