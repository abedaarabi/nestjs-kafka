import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Kafka,
  Producer,
  Consumer,
  ConsumerSubscribeTopic,
  KafkaMessage,
  ConsumerConfig,
} from 'kafkajs';

interface KafkajsConsumerOptions {
  topic: ConsumerSubscribeTopic;
  config: ConsumerConfig;
  onMessage: (message: KafkaMessage) => Promise<void>;
}

@Injectable()
export class ConsumerServies implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });
  private readonly producer: Producer = this.kafka.producer();
  private readonly consumers: Consumer[] = [];
  async consume({ topic, config, onMessage }: KafkajsConsumerOptions) {
    const consumer = this.kafka.consumer({
      groupId: 'nestjs-kafka',
    });
    await consumer.connect();
    await consumer.subscribe(topic);
    this.consumers.push(consumer);
  }
  async onApplicationShutdown() {
    for (const consumer of this.consumers) await consumer.disconnect();
  }
}
