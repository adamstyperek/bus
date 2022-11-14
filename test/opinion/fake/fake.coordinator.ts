import { Coordinator } from '../../../src/opinion/adapters/coordinator/coordinator';
import { Command } from '../../../src/coordinator/command/command';

export class FakeCoordinator extends Coordinator {
  push(command: Command) {
    console.log(command.getType() + ' handled by fake');
  }
}
