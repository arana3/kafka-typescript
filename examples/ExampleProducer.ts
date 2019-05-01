import {IProducerConfig, ProducerConfig, SimpleProducer} from "../src"

const rdkafka = require("node-rdkafka")
const rdkafkaProducer = rdkafka.Producer

const producers: { [topic: string]: SimpleProducer } = {}

const createTopicProducer = async (topic: string, config: IProducerConfig) => {
  const prod = await new SimpleProducer().create(rdkafkaProducer, config)
                                         .connect()
  prod.setTopic(topic);
  producers[topic] = prod
  return prod
}

console.info('EXECUTING PRODUCER');
createTopicProducer("hello-world", new ProducerConfig("localhost", "29092"))
.then(x => {
  producers["hello-world"].send("1", new Buffer("hello"));
}).catch(err => console.error(err))

