import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

export const send = async (book) => {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
        topic: 'books',
        messages: [
            { key: 'book', value: book }
        ],
    });
    await producer.disconnect();
};

