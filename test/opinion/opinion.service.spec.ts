import { OpinionService } from '../../src/opinion/service/opinion.service';
import { Test } from '@nestjs/testing';
import { Coordinator } from '../../src/opinion/adapters/coordinator/coordinator';
import { FakeCoordinator } from './fake/fake.coordinator';
import { OpinionsRepository } from '../../src/opinion/repositories/opinions.repository';
import { FakeOpinionRepository } from './fake/fake.opinion.repository';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { EventHandlers } from '../../src/opinion/events/handlers';

describe('Opinion service', () => {
  let opinionService: OpinionService;
  let repository: OpinionsRepository;
  let eventBus: EventBus;

  beforeEach(async () => {
    const CoordinatorProvider = {
      provide: Coordinator,
      useClass: FakeCoordinator,
    };
    const OpinionRepositoryProvider = {
      provide: OpinionsRepository,
      useClass: FakeOpinionRepository,
    };
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CoordinatorProvider,
        OpinionService,
        ...EventHandlers,
        OpinionRepositoryProvider,
      ],
    })
      .overrideProvider(EventBus)
      .useValue({
        setModuleRef: jest.fn(),
        register: jest.fn(),
        publish: jest.fn(),
      })
      .compile();
    opinionService = module.get<OpinionService>(OpinionService);
    eventBus = module.get<EventBus>(EventBus);

    repository = module.get<OpinionsRepository>(OpinionsRepository);
  });
  it('should be defined', () => {
    expect(eventBus).toBeDefined();
  });
  it('when call opinion open then you can find opinion with id in the repository', async () => {
    const opinion = await opinionService.openOpinionBy(
      'someReviewerId',
      'someReviewerName',
    );
    const storedOpinion = await repository.getBy(opinion.id);
    expect(storedOpinion).toBe(opinion);
  });
  it('when call opinion finish then you can find opinion with id in the repository', async () => {
    const opinion = await opinionService.finishOpinionBy(
      'someReviewerId',
      'someReviewerName',
    );
    const storedOpinion = await repository.getBy(opinion.id);
    expect(storedOpinion).toBe(opinion);
  });
  it('when call opinion finished then you can find opinion with id in the repository', async () => {
    eventBus.publish = jest.fn(() => {});
    await opinionService.finishOpinionBy('someReviewerId', 'someReviewerName');
    expect(eventBus.publish).toBeCalledTimes(1);
  });
  it('when call opinion open then you can find opinion with id in the repository', async () => {
    eventBus.publish = jest.fn(() => {});
    await opinionService.openOpinionBy('someReviewerId', 'someReviewerName');
    expect(eventBus.publish).toBeCalledTimes(1);
  });
});
