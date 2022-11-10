import { Opinion } from '../dto/opinion';

export abstract class OpinionsRepository {
  abstract save(opinion: Opinion): Promise<Opinion>;

  abstract getBy(id: string): Promise<Opinion>;
}
