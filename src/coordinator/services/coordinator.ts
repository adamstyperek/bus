import { Command } from '../command/command';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class Coordinator {
  public constructor(
    @InjectQueue('messages') private readonly messagesQueue: Queue,
  ) {}

  public push(command: Command) {
    this.messagesQueue.add(command.getType(), command).catch((error) => {});
  }
}
