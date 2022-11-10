import { OpinionsRepository } from './opinions.repository';
import { Opinion } from '../dto/opinion';

export class InMemoryOpinionsRepository extends OpinionsRepository {
  private opinions: Opinion[] = [];
  async getBy(id: string): Promise<Opinion> {
    return this.opinions.find((opinion) => opinion.id === id);
  }

  async save(opinion: Opinion): Promise<Opinion> {
    this.opinions.push(opinion);
    return opinion;
  }
}
