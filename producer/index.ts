import { Kafka } from 'kafkajs'
import Chance from 'chance'
const chance = new Chance()
const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9093', 'localhost:9092']
})

const producer = kafka.producer()
const topic = 'fullanimals'
const produceMessage = async () => {
  try {
    const value = chance.animal()
    console.log(value)
    await producer.send({
      topic,
      messages: [
        { value },
      ],
    })

  }
  catch (err) {
    console.log(err)
  }
}
const run = async () => {
  // Producing
  await producer.connect()
  console.log("Connect Success-Send data")
  setInterval(produceMessage, 1000)

}

run().catch(console.error)