import { Coordinator } from './coordinator';
import { Command } from '../../../coordinator/command/command';
import { CommandHandler } from '../../../coordinator/services/command.handler';

export class CoordinatorAdapter extends Coordinator {
  public constructor(private handler: CommandHandler) {
    super();
  }
  push(command: Command) {
    this.handler.push(command);
  }
}
