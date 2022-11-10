import {Kafka} from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

export const receive = async () => {
    const consumer = kafka.consumer({groupId: 'apollo-app'});
    await consumer.connect();
    await consumer.subscribe({topics: ['books', 'users'], fromBeginning: true});
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log({
                value: message?.value?.toString(),
            })
        },
    });
};

receive();