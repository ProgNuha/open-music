import amqp from 'amqplib';

class ProducerService {
  constructor() {
    this._connection = null;
    this._channel = null;
  }

  async connect() {
    if (!this._connection) {
      // eslint-disable-next-line no-undef
      this._connection = await amqp.connect(process.env.RABBITMQ_SERVER);
      this._channel = await this._connection.createChannel();
    }
  }

  async sendMessage(queue, message) {
    await this.connect();
    await this._channel.assertQueue(queue, {
      durable: true,
    });

    // eslint-disable-next-line no-undef
    await this._channel.sendToQueue(queue, Buffer.from(message));
  }
}

export default ProducerService;
