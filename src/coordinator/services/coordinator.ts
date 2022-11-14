import { Command } from '../command/command';
import { ProcessCommandStrategyFactory } from '../strategies/process.command.strategy.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Coordinator {
  public constructor(private factory: ProcessCommandStrategyFactory) {}
  public async process(command: Command) {
    const strategy = this.factory.getStrategy(command);
    await strategy.execute(command);
  }
}
