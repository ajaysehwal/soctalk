import { Kafka, Producer, Consumer } from "kafkajs";
import path from "path";
import fs from "fs";
import {prismaQuery} from "../models";

class KafkaService {
  private static instance: KafkaService;
  private kafka: Kafka;
  public producer: Producer;
  public consumer: Consumer;

  private constructor() {
    this.kafka = new Kafka({
      brokers: ['kafka-f7014c2-ajaysehwal000-0acb.a.aivencloud.com:11616'],
      ssl: {
        ca: [fs.readFileSync(path.resolve('./ca.pem'), 'utf-8')],
      },
      sasl: {
        username: 'avnadmin',
        password: 'AVNS_XP9P7CEeJirruSNr7hN',
        mechanism: "plain",
      },
    });
 
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({
      groupId: "default",
    });
  }

  public static getInstance(): KafkaService {
    if (!KafkaService.instance) {
      KafkaService.instance = new KafkaService();
    }

    return KafkaService.instance;
  }

  private async connectProducer(): Promise<void> {
    await this.producer.connect();
  }

  private async connectConsumer(): Promise<void> {
    await this.consumer.connect();
  }

  public async produceMessage(message: string): Promise<boolean> {
    await this.connectProducer();

    await this.producer.send({
      messages: [{ key: `message-${Date.now()}`, value: message }],
      topic: "MESSAGES",
    });

    return true;
  }

  public async startMessageConsumer(): Promise<void> {
    console.log("Consumer is running.....");
    await this.connectConsumer();

    await this.consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });

    await this.consumer.run({
      autoCommit: true,
      eachMessage: async ({ message, pause }) => {
        console.log(`New Message Received`);
        console.log(message);
        if (!message.value) return;
          
        // try {
        //   await prismaQuery.createMessage(
        //     data: {
        //       text: message.value?.toString(),
        //   });
        // } catch (err) {
        //   console.log("Something is wrong");
        //   pause();
        //   setTimeout(() => {
        //     this.consumer.resume([{ topic: "MESSAGES" }]);
        //   }, 60 * 1000);
        // }
      },
    });
  }
}

export {KafkaService};
