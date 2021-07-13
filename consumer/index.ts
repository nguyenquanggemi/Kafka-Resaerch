import { Kafka } from 'kafkajs'
require('dotenv').config()

console.log('GROUP ID: ', process.env.GROUP_ID)
const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9093', 'localhost:9092']
})

const consumer = kafka.consumer({ groupId: process.env.GROUP_ID })
const topic = 'fullanimals'
const run = async () => {
  // Producing
  await consumer.connect()
  await consumer.subscribe({ topic, })
  console.log("Connect Success-Give data")
  await consumer.run({
    eachMessage: async ({ topic, partition, message}) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      })
    }
  })
}

run().catch(console.error)