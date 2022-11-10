import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

export const receive = async () => {
    const consumer = kafka.consumer({ groupId: 'books-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'books', fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            })
        },
    });
};

receive();