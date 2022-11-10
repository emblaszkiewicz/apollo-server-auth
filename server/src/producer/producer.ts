import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

export const send = async (book) => {
    const test = JSON.stringify(book);
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
        topic: 'books',
        messages: [
            { key: 'key1', value: test }
        ],
    });
    await producer.disconnect();
};

