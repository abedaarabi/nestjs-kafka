import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerServies } from './consumer.servies';

@Module({
  providers: [ProducerService, ConsumerServies],
  exports: [ProducerService, ConsumerServies],
})
export class KafkaModule {}
