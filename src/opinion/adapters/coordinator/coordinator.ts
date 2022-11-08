import { Command } from '../../../coordinator/command/command';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class Coordinator {
  abstract push(command: Command);
}
