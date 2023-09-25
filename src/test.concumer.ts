import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerServies } from './kafka/consumer.servies';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly cunsumerService: ConsumerServies) {}
  async onModuleInit() {
    await this.cunsumerService.consume({
      topic: { topic: 'test' },
      config: { groupId: 'test-consumer' },
      onMessage: async (message) => {
        console.log({
          value: message.value.toString(),
        });
        throw new Error('Test error!');
      },
    });
  }
}
