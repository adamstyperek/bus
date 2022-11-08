import { Command } from '../command/command';

export interface ProcessCommandStrategy {
  execute(command: Command);
}
