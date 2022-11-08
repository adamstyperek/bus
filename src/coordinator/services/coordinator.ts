import { Command } from '../command/command';
import { Injectable } from '@nestjs/common';
import { ProcessCommandStrategyFactory } from '../strategies/process.command.strategy.factory';

@Injectable()
export class Coordinator {
  public constructor(private factory: ProcessCommandStrategyFactory) {}

  public push(command: Command) {
    const strategy = this.factory.getStrategy(command);
    strategy.execute(command);
  }
}
